import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import { logger } from '../utils/logger'

// Rate limiting for AI requests
export const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many AI requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Rate limiting for image uploads
export const imageRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 image uploads per windowMs
  message: 'Too many image uploads from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Strict Transport Security
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.openai.com; " +
    "frame-ancestors 'none';"
  )
  
  next()
}

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      duration
    })
  })
  
  next()
}

// API key validation middleware
export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' })
  }
  
  // In production, validate against a database or secure store
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' })
  }
  
  next()
}

// Data sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Sanitize string inputs
  const sanitizeString = (str: string): string => {
    return str
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  }
  
  // Recursively sanitize object
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj)
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject)
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {}
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key])
      }
      return sanitized
    }
    return obj
  }
  
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query)
  }
  
  next()
}

// Privacy controls middleware
export const privacyControls = (req: Request, res: Response, next: NextFunction) => {
  // Add privacy headers
  res.setHeader('X-Privacy-Policy', 'no-data-retention')
  res.setHeader('X-Data-Usage', 'processing-only')
  
  // Log privacy compliance
  logger.info('Privacy controls applied', {
    ip: req.ip,
    endpoint: req.path,
    timestamp: new Date().toISOString()
  })
  
  next()
}
