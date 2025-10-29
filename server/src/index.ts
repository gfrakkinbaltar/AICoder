import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { aiRoutes } from './routes/ai'
import { imageRoutes } from './routes/image'
import { gitRoutes } from './routes/git'
import { logger } from './utils/logger'
import { securityHeaders, requestLogger, privacyControls } from './middleware/security'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(securityHeaders)
app.use(requestLogger)
app.use(privacyControls)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/ai', aiRoutes)
app.use('/api/image', imageRoutes)
app.use('/api/git', gitRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  console.log(`🚀 AICoder server running on http://localhost:${PORT}`)
})
