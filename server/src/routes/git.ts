import express from 'express'
import { exec } from 'child_process'
import { promisify } from 'util'
import { logger } from '../utils/logger'

const router = express.Router()
const execAsync = promisify(exec)

// Get git status
router.get('/status', async (req, res) => {
  try {
    // Check if we're in a git repository
    try {
      await execAsync('git rev-parse --git-dir')
    } catch {
      return res.status(404).json({ error: 'Not a git repository' })
    }

    // Get current branch
    const { stdout: branch } = await execAsync('git branch --show-current')
    
    // Get git status
    const { stdout: statusOutput } = await execAsync('git status --porcelain')
    
    // Parse status output
    const changes = {
      modified: [] as string[],
      added: [] as string[],
      deleted: [] as string[],
      untracked: [] as string[]
    }

    statusOutput.split('\n').forEach(line => {
      if (line.trim()) {
        const status = line.substring(0, 2)
        const file = line.substring(3)
        
        if (status.includes('M')) changes.modified.push(file)
        if (status.includes('A')) changes.added.push(file)
        if (status.includes('D')) changes.deleted.push(file)
        if (status.includes('??')) changes.untracked.push(file)
      }
    })

    // Determine overall status
    const hasChanges = Object.values(changes).some(arr => arr.length > 0)
    const status = hasChanges ? 'modified' : 'clean'

    // Get recent commits
    const { stdout: commitsOutput } = await execAsync('git log --oneline -10 --pretty=format:"%h|%s|%an|%ad" --date=short')
    const commits = commitsOutput.split('\n').map(line => {
      const [hash, message, author, date] = line.split('|')
      return { hash, message, author, date }
    }).filter(commit => commit.hash)

    res.json({
      branch: branch.trim(),
      status,
      changes,
      commits
    })
  } catch (error) {
    logger.error('Git status failed:', error)
    res.status(500).json({ error: 'Failed to get git status' })
  }
})

// Stage files
router.post('/stage', async (req, res) => {
  try {
    const { files } = req.body
    
    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'Files array is required' })
    }

    for (const file of files) {
      await execAsync(`git add "${file}"`)
    }

    logger.info(`Staged files: ${files.join(', ')}`)
    res.json({ message: 'Files staged successfully' })
  } catch (error) {
    logger.error('Git stage failed:', error)
    res.status(500).json({ error: 'Failed to stage files' })
  }
})

// Commit changes
router.post('/commit', async (req, res) => {
  try {
    const { message } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Commit message is required' })
    }

    await execAsync(`git commit -m "${message}"`)

    logger.info(`Committed with message: ${message}`)
    res.json({ message: 'Changes committed successfully' })
  } catch (error) {
    logger.error('Git commit failed:', error)
    res.status(500).json({ error: 'Failed to commit changes' })
  }
})

// Pull changes
router.post('/pull', async (req, res) => {
  try {
    const { stdout } = await execAsync('git pull')
    
    logger.info('Git pull completed')
    res.json({ message: 'Changes pulled successfully', output: stdout })
  } catch (error) {
    logger.error('Git pull failed:', error)
    res.status(500).json({ error: 'Failed to pull changes' })
  }
})

// Push changes
router.post('/push', async (req, res) => {
  try {
    const { stdout } = await execAsync('git push')
    
    logger.info('Git push completed')
    res.json({ message: 'Changes pushed successfully', output: stdout })
  } catch (error) {
    logger.error('Git push failed:', error)
    res.status(500).json({ error: 'Failed to push changes' })
  }
})

// Get diff
router.get('/diff/:file', async (req, res) => {
  try {
    const { file } = req.params
    const { stdout } = await execAsync(`git diff "${file}"`)
    
    res.json({ diff: stdout })
  } catch (error) {
    logger.error('Git diff failed:', error)
    res.status(500).json({ error: 'Failed to get diff' })
  }
})

// Initialize git repository
router.post('/init', async (req, res) => {
  try {
    await execAsync('git init')
    
    logger.info('Git repository initialized')
    res.json({ message: 'Git repository initialized successfully' })
  } catch (error) {
    logger.error('Git init failed:', error)
    res.status(500).json({ error: 'Failed to initialize git repository' })
  }
})

export { router as gitRoutes }
