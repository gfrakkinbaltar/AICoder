import React, { useState } from 'react'
import { useFiles } from '../contexts/FileContext'
import { File, Plus, X } from 'lucide-react'

const Sidebar: React.FC<{ onToggle: () => void }> = ({ }) => {
  const { files, createFile, deleteFile, setActiveFile, activeFileId } = useFiles()
  const [showNewFile, setShowNewFile] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [newFileLanguage, setNewFileLanguage] = useState('javascript')

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      createFile(newFileName, newFileLanguage, `/src/${newFileName}`)
      setNewFileName('')
      setShowNewFile(false)
    }
  }

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' }
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Files</h2>
          <button
            onClick={() => setShowNewFile(!showNewFile)}
            className="p-1 hover:bg-dark-700 rounded"
          >
            <Plus size={16} />
          </button>
        </div>
        
        {showNewFile && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="File name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-sm"
            />
            <select
              value={newFileLanguage}
              onChange={(e) => setNewFileLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-sm"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleCreateFile}
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded text-sm"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewFile(false)}
                className="px-3 py-1 bg-dark-600 hover:bg-dark-500 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {files.length === 0 ? (
          <div className="text-center text-dark-400 py-8">
            <File size={32} className="mx-auto mb-2 opacity-50" />
            <p>No files open</p>
            <p className="text-sm">Create a new file to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {files.map(file => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer group ${
                  activeFileId === file.id ? 'bg-primary-600' : 'hover:bg-dark-700'
                }`}
                onClick={() => setActiveFile(file.id)}
              >
                <div className="flex items-center space-x-2">
                  <File size={16} />
                  <span className="text-sm">{file.name}</span>
                  {file.isModified && <span className="text-xs text-yellow-400">●</span>}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(file.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-dark-600 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
