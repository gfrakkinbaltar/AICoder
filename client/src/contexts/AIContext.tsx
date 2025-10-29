import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface AIRequest {
  id: string
  type: 'completion' | 'refactor' | 'debug' | 'explain' | 'generate' | 'cascade'
  prompt: string
  response?: string
  status: 'pending' | 'completed' | 'error'
  timestamp: Date
}

export interface CascadeFlow {
  id: string
  name: string
  steps: string[]
  currentStep: number
  status: 'pending' | 'running' | 'completed' | 'error'
}

interface AIContextType {
  requests: AIRequest[]
  cascadeFlows: CascadeFlow[]
  isProcessing: boolean
  sendRequest: (type: AIRequest['type'], prompt: string) => Promise<string>
  createCascadeFlow: (name: string, steps: string[]) => void
  executeCascadeFlow: (flowId: string) => Promise<void>
  clearHistory: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

interface AIProviderProps {
  children: ReactNode
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [requests, setRequests] = useState<AIRequest[]>([])
  const [cascadeFlows, setCascadeFlows] = useState<CascadeFlow[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const sendRequest = async (type: AIRequest['type'], prompt: string): Promise<string> => {
    const request: AIRequest = {
      id: Date.now().toString(),
      type,
      prompt,
      status: 'pending',
      timestamp: new Date()
    }

    setRequests(prev => [request, ...prev])
    setIsProcessing(true)

    try {
      const response = await fetch('/api/ai/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, prompt })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      setRequests(prev => prev.map(r => 
        r.id === request.id 
          ? { ...r, response: data.response, status: 'completed' }
          : r
      ))

      return data.response
    } catch (error) {
      setRequests(prev => prev.map(r => 
        r.id === request.id 
          ? { ...r, status: 'error' }
          : r
      ))
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const createCascadeFlow = (name: string, steps: string[]) => {
    const flow: CascadeFlow = {
      id: Date.now().toString(),
      name,
      steps,
      currentStep: 0,
      status: 'pending'
    }
    setCascadeFlows(prev => [flow, ...prev])
  }

  const executeCascadeFlow = async (flowId: string) => {
    const flow = cascadeFlows.find(f => f.id === flowId)
    if (!flow) return

    setCascadeFlows(prev => prev.map(f => 
      f.id === flowId ? { ...f, status: 'running' } : f
    ))

    try {
      for (let i = 0; i < flow.steps.length; i++) {
        await sendRequest('cascade', flow.steps[i])
        setCascadeFlows(prev => prev.map(f => 
          f.id === flowId ? { ...f, currentStep: i + 1 } : f
        ))
      }
      
      setCascadeFlows(prev => prev.map(f => 
        f.id === flowId ? { ...f, status: 'completed' } : f
      ))
    } catch (error) {
      setCascadeFlows(prev => prev.map(f => 
        f.id === flowId ? { ...f, status: 'error' } : f
      ))
    }
  }

  const clearHistory = () => {
    setRequests([])
    setCascadeFlows([])
  }

  return (
    <AIContext.Provider value={{
      requests,
      cascadeFlows,
      isProcessing,
      sendRequest,
      createCascadeFlow,
      executeCascadeFlow,
      clearHistory
    }}>
      {children}
    </AIContext.Provider>
  )
}
