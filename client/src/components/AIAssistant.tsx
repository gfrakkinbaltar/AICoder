import React, { useState } from 'react'
import { useAI, AIRequest } from '../contexts/AIContext'
import { useFiles } from '../contexts/FileContext'
import { X, Send, Wand2, Bug, Lightbulb, Code, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'

const AIAssistant: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { sendRequest, requests, cascadeFlows, createCascadeFlow, executeCascadeFlow, isProcessing } = useAI()
  const { } = useFiles()
  const [input, setInput] = useState('')
  const [selectedType, setSelectedType] = useState<AIRequest['type']>('completion')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    try {
      await sendRequest(selectedType, input)
      setInput('')
      toast.success('Request sent successfully')
    } catch (error) {
      toast.error('Failed to send request')
    }
  }

  const quickActions = [
    {
      icon: <Code size={16} />,
      label: 'Generate Code',
      action: () => {
        setSelectedType('generate')
        setInput('Generate a function that...')
      }
    },
    {
      icon: <Wand2 size={16} />,
      label: 'Refactor',
      action: () => {
        setSelectedType('refactor')
        setInput('Refactor the selected code to...')
      }
    },
    {
      icon: <Bug size={16} />,
      label: 'Debug',
      action: () => {
        setSelectedType('debug')
        setInput('Debug this code and fix any issues...')
      }
    },
    {
      icon: <Lightbulb size={16} />,
      label: 'Explain',
      action: () => {
        setSelectedType('explain')
        setInput('Explain how this code works...')
      }
    }
  ]

  const createSampleCascadeFlow = () => {
    createCascadeFlow('Setup React Project', [
      'Create a new React component with TypeScript',
      'Add Tailwind CSS styling',
      'Implement state management with hooks',
      'Add error handling and loading states',
      'Write unit tests for the component'
    ])
  }

  return (
    <div className="h-full flex flex-col bg-dark-800">
      <div className="p-4 border-b border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-dark-700 rounded"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-dark-300">Request Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as AIRequest['type'])}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-sm"
          >
            <option value="completion">Code Completion</option>
            <option value="refactor">Refactor</option>
            <option value="debug">Debug</option>
            <option value="explain">Explain</option>
            <option value="generate">Generate</option>
            <option value="cascade">Cascade Flow</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want the AI to do..."
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-sm resize-none"
            rows={3}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="w-full mt-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm flex items-center justify-center space-x-2"
          >
            <Send size={16} />
            <span>{isProcessing ? 'Processing...' : 'Send Request'}</span>
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-dark-300 mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-2 bg-dark-700 hover:bg-dark-600 rounded text-sm flex items-center space-x-2"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-300 mb-2">Cascade Flows</h3>
            <button
              onClick={createSampleCascadeFlow}
              className="w-full p-2 bg-dark-700 hover:bg-dark-600 rounded text-sm flex items-center space-x-2"
            >
              <Zap size={16} />
              <span>Create Sample Flow</span>
            </button>
            
            {cascadeFlows.length > 0 && (
              <div className="mt-2 space-y-2">
                {cascadeFlows.map(flow => (
                  <div key={flow.id} className="p-2 bg-dark-700 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{flow.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        flow.status === 'completed' ? 'bg-green-600' :
                        flow.status === 'running' ? 'bg-yellow-600' :
                        flow.status === 'error' ? 'bg-red-600' :
                        'bg-dark-600'
                      }`}>
                        {flow.status}
                      </span>
                    </div>
                    <div className="text-xs text-dark-400">
                      Step {flow.currentStep} of {flow.steps.length}
                    </div>
                    <button
                      onClick={() => executeCascadeFlow(flow.id)}
                      disabled={flow.status === 'running'}
                      className="mt-2 w-full px-2 py-1 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded text-xs"
                    >
                      {flow.status === 'running' ? 'Running...' : 'Execute'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-300 mb-2">Recent Requests</h3>
            {requests.length === 0 ? (
              <p className="text-sm text-dark-400">No requests yet</p>
            ) : (
              <div className="space-y-2">
                {requests.slice(0, 5).map(request => (
                  <div key={request.id} className="p-2 bg-dark-700 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-dark-400">{request.type}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        request.status === 'completed' ? 'bg-green-600' :
                        request.status === 'error' ? 'bg-red-600' :
                        'bg-yellow-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-dark-300 truncate">{request.prompt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
