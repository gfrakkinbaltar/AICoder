import React, { useRef } from 'react'
import { Editor as MonacoEditor } from '@monaco-editor/react'
import { useFiles } from '../contexts/FileContext'
import { useAI } from '../contexts/AIContext'
import { toast } from 'react-hot-toast'
import * as monaco from 'monaco-editor'

const Editor: React.FC = () => {
  const { files, activeFileId, updateFile } = useFiles()
  const { sendRequest, isProcessing } = useAI()
  const editorRef = useRef<any>(null)

  const activeFile = files.find(f => f.id === activeFileId)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () => {
      handleInlineAI()
    })
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      handleRefactor()
    })
  }

  const handleInlineAI = async () => {
    if (!activeFile || !editorRef.current) return
    
    const selection = editorRef.current.getSelection()
    const selectedText = editorRef.current.getModel().getValueInRange(selection)
    
    if (!selectedText) {
      toast.error('Please select some code first')
      return
    }

    try {
      const response = await sendRequest('refactor', `Refactor this code: ${selectedText}`)
      editorRef.current.executeEdits('ai-refactor', [{
        range: selection,
        text: response
      }])
      toast.success('Code refactored successfully')
    } catch (error) {
      toast.error('Failed to refactor code')
    }
  }

  const handleRefactor = async () => {
    if (!activeFile || !editorRef.current) return
    
    const selection = editorRef.current.getSelection()
    const selectedText = editorRef.current.getModel().getValueInRange(selection)
    
    if (!selectedText) {
      toast.error('Please select some code first')
      return
    }

    try {
      const response = await sendRequest('debug', `Debug and improve this code: ${selectedText}`)
      editorRef.current.executeEdits('ai-debug', [{
        range: selection,
        text: response
      }])
      toast.success('Code improved successfully')
    } catch (error) {
      toast.error('Failed to improve code')
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile.id, value)
    }
  }

  const getLanguageFromExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'cpp',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown'
    }
    return languageMap[ext || ''] || 'plaintext'
  }

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-900">
        <div className="text-center text-dark-400">
          <h2 className="text-xl font-semibold mb-2">Welcome to AICoder</h2>
          <p>Create a new file or open an existing one to start coding</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="editor-tabs">
        <div className="tab active">
          {activeFile.name}
          {activeFile.isModified && <span className="ml-2 text-yellow-400">●</span>}
        </div>
      </div>
      
      <div className="flex-1 editor-container">
        <MonacoEditor
          height="100%"
          language={getLanguageFromExtension(activeFile.name)}
          value={activeFile.content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showConstructors: true,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showIssues: true,
              showUsers: true,
              showWords: true
            }
          }}
        />
      </div>
      
      {isProcessing && (
        <div className="absolute bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded shadow-lg">
          AI is processing...
        </div>
      )}
    </div>
  )
}

export default Editor
