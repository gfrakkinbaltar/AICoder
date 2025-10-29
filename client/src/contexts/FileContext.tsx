import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface File {
  id: string
  name: string
  content: string
  language: string
  path: string
  isModified: boolean
}

interface FileContextType {
  files: File[]
  activeFileId: string | null
  openFile: (file: File) => void
  closeFile: (fileId: string) => void
  updateFile: (fileId: string, content: string) => void
  createFile: (name: string, language: string, path: string) => void
  deleteFile: (fileId: string) => void
  setActiveFile: (fileId: string) => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export const useFiles = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider')
  }
  return context
}

interface FileProviderProps {
  children: ReactNode
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)

  const openFile = (file: File) => {
    setFiles(prev => {
      const existingFile = prev.find(f => f.id === file.id)
      if (existingFile) {
        setActiveFileId(file.id)
        return prev
      }
      return [...prev, file]
    })
    setActiveFileId(file.id)
  }

  const closeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId)
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : null)
    }
  }

  const updateFile = (fileId: string, content: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, content, isModified: true } : f
    ))
  }

  const createFile = (name: string, language: string, path: string) => {
    const newFile: File = {
      id: Date.now().toString(),
      name,
      content: '',
      language,
      path,
      isModified: false
    }
    openFile(newFile)
  }

  const deleteFile = (fileId: string) => {
    closeFile(fileId)
  }

  const setActiveFile = (fileId: string) => {
    setActiveFileId(fileId)
  }

  return (
    <FileContext.Provider value={{
      files,
      activeFileId,
      openFile,
      closeFile,
      updateFile,
      createFile,
      deleteFile,
      setActiveFile
    }}>
      {children}
    </FileContext.Provider>
  )
}
