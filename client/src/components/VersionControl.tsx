import React, { useState, useEffect } from 'react'
import { GitBranch, GitPullRequest, Plus, Minus, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface GitStatus {
  branch: string
  status: 'clean' | 'modified' | 'staged' | 'conflict'
  changes: {
    modified: string[]
    added: string[]
    deleted: string[]
    untracked: string[]
  }
  commits: {
    hash: string
    message: string
    author: string
    date: string
  }[]
}

const VersionControl: React.FC = () => {
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const loadGitStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/git/status')
      if (response.ok) {
        const status = await response.json()
        setGitStatus(status)
      }
    } catch (error) {
      toast.error('Failed to load git status')
    } finally {
      setIsLoading(false)
    }
  }

  const stageFiles = async (files: string[]) => {
    try {
      const response = await fetch('/api/git/stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files })
      })
      
      if (response.ok) {
        toast.success('Files staged successfully')
        loadGitStatus()
      } else {
        toast.error('Failed to stage files')
      }
    } catch (error) {
      toast.error('Failed to stage files')
    }
  }

  // const commitChanges = async (message: string) => {
  //   try {
  //     const response = await fetch('/api/git/commit', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ message })
  //     })
      
  //     if (response.ok) {
  //       toast.success('Changes committed successfully')
  //       loadGitStatus()
  //     } else {
  //       toast.error('Failed to commit changes')
  //     }
  //   } catch (error) {
  //     toast.error('Failed to commit changes')
  //   }
  // }

  const pullChanges = async () => {
    try {
      const response = await fetch('/api/git/pull', { method: 'POST' })
      
      if (response.ok) {
        toast.success('Changes pulled successfully')
        loadGitStatus()
      } else {
        toast.error('Failed to pull changes')
      }
    } catch (error) {
      toast.error('Failed to pull changes')
    }
  }

  const pushChanges = async () => {
    try {
      const response = await fetch('/api/git/push', { method: 'POST' })
      
      if (response.ok) {
        toast.success('Changes pushed successfully')
        loadGitStatus()
      } else {
        toast.error('Failed to push changes')
      }
    } catch (error) {
      toast.error('Failed to push changes')
    }
  }

  useEffect(() => {
    loadGitStatus()
  }, [])

  if (!gitStatus) {
    return (
      <div className="p-4 text-center text-dark-400">
        <GitBranch size={32} className="mx-auto mb-2 opacity-50" />
        <p>No git repository found</p>
        <p className="text-sm">Initialize a git repository to use version control</p>
      </div>
    )
  }

  const allChangedFiles = [
    ...gitStatus.changes.modified,
    ...gitStatus.changes.added,
    ...gitStatus.changes.deleted,
    ...gitStatus.changes.untracked
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Version Control</h3>
          <button
            onClick={loadGitStatus}
            disabled={isLoading}
            className="p-1 hover:bg-dark-700 rounded"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <GitBranch size={16} />
          <span className="text-sm font-medium">{gitStatus.branch}</span>
          <span className={`text-xs px-2 py-1 rounded ${
            gitStatus.status === 'clean' ? 'bg-green-600' :
            gitStatus.status === 'modified' ? 'bg-yellow-600' :
            gitStatus.status === 'staged' ? 'bg-blue-600' :
            'bg-red-600'
          }`}>
            {gitStatus.status}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={pullChanges}
            className="px-3 py-1 bg-dark-600 hover:bg-dark-500 rounded text-sm flex items-center space-x-1"
          >
            <GitPullRequest size={14} />
            <span>Pull</span>
          </button>
          <button
            onClick={pushChanges}
            className="px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded text-sm"
          >
            Push
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-2">Changes</h4>
            {allChangedFiles.length === 0 ? (
              <p className="text-sm text-dark-400">No changes</p>
            ) : (
              <div className="space-y-1">
                {allChangedFiles.map(file => (
                  <div
                    key={file}
                    className={`flex items-center justify-between p-2 rounded ${
                      selectedFiles.includes(file) ? 'bg-primary-600' : 'bg-dark-700 hover:bg-dark-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {gitStatus.changes.modified.includes(file) && (
                        <Minus size={14} className="text-yellow-400" />
                      )}
                      {gitStatus.changes.added.includes(file) && (
                        <Plus size={14} className="text-green-400" />
                      )}
                      {gitStatus.changes.deleted.includes(file) && (
                        <Minus size={14} className="text-red-400" />
                      )}
                      {gitStatus.changes.untracked.includes(file) && (
                        <Plus size={14} className="text-blue-400" />
                      )}
                      <span className="text-sm">{file}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file])
                        } else {
                          setSelectedFiles(selectedFiles.filter(f => f !== file))
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedFiles.length > 0 && (
            <div>
              <button
                onClick={() => stageFiles(selectedFiles)}
                className="w-full px-3 py-2 bg-dark-600 hover:bg-dark-500 rounded text-sm"
              >
                Stage Selected Files
              </button>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-2">Recent Commits</h4>
            <div className="space-y-2">
              {gitStatus.commits.slice(0, 5).map(commit => (
                <div key={commit.hash} className="p-2 bg-dark-700 rounded">
                  <div className="text-sm font-medium">{commit.message}</div>
                  <div className="text-xs text-dark-400">
                    {commit.author} • {new Date(commit.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VersionControl
