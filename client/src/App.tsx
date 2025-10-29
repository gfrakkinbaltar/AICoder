import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import AIAssistant from './components/AIAssistant'
import { FileProvider } from './contexts/FileContext'
import { AIProvider } from './contexts/AIContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)

  return (
    <FileProvider>
      <AIProvider>
        <div className="h-screen bg-dark-900 text-white flex">
          <Toaster position="top-right" />
          
          {sidebarOpen && (
            <div className="w-64 sidebar">
              <Sidebar onToggle={() => setSidebarOpen(false)} />
            </div>
          )}
          
          <div className="flex-1 flex flex-col">
            <div className="h-12 bg-dark-800 border-b border-dark-700 flex items-center px-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 p-2 hover:bg-dark-700 rounded"
              >
                ☰
              </button>
              <h1 className="text-xl font-bold">AICoder</h1>
              <div className="ml-auto flex items-center space-x-4">
                <button
                  onClick={() => setAiPanelOpen(!aiPanelOpen)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded text-sm"
                >
                  AI Assistant
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex">
              <div className="flex-1 main-content">
                <Editor />
              </div>
              
              {aiPanelOpen && (
                <div className="w-80 border-l border-dark-700">
                  <AIAssistant onClose={() => setAiPanelOpen(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </AIProvider>
    </FileProvider>
  )
}

export default App
