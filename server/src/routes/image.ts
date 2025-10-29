import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import Tesseract from 'tesseract.js'
import OpenAI from 'openai'
import { logger } from '../utils/logger'

const router = express.Router()

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Image to code conversion
router.post('/to-code', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    // Process image with Sharp
    const processedImage = await sharp(req.file.buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer()

    // Use OpenAI Vision API for image analysis
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and generate the corresponding HTML, CSS, and JavaScript code. Provide a complete, functional implementation that matches the design shown in the image.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${processedImage.toString('base64')}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000
    })

    const code = response.choices[0]?.message?.content || ''

    // Extract HTML, CSS, and JS from the response
    const htmlMatch = code.match(/```html\n([\s\S]*?)\n```/)
    const cssMatch = code.match(/```css\n([\s\S]*?)\n```/)
    const jsMatch = code.match(/```javascript\n([\s\S]*?)\n```/)

    const result = {
      html: htmlMatch ? htmlMatch[1] : '',
      css: cssMatch ? cssMatch[1] : '',
      javascript: jsMatch ? jsMatch[1] : '',
      fullCode: code
    }

    logger.info('Image to code conversion completed')

    res.json(result)
  } catch (error) {
    logger.error('Image to code conversion failed:', error)
    res.status(500).json({ error: 'Failed to convert image to code' })
  }
})

// OCR text extraction
router.post('/ocr', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    // Process image for better OCR
    const processedImage = await sharp(req.file.buffer)
      .greyscale()
      .normalize()
      .sharpen()
      .png()
      .toBuffer()

    // Extract text using Tesseract.js
    const { data: { text } } = await Tesseract.recognize(
      processedImage,
      'eng',
      {
        logger: m => logger.info('OCR progress:', m)
      }
    )

    res.json({ text: text.trim() })
  } catch (error) {
    logger.error('OCR failed:', error)
    res.status(500).json({ error: 'Failed to extract text from image' })
  }
})

// Image analysis for code suggestions
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    const processedImage = await sharp(req.file.buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer()

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and provide suggestions for code improvements, potential bugs, or optimizations. Focus on code quality, performance, and best practices.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${processedImage.toString('base64')}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    })

    const analysis = response.choices[0]?.message?.content || ''

    res.json({ analysis })
  } catch (error) {
    logger.error('Image analysis failed:', error)
    res.status(500).json({ error: 'Failed to analyze image' })
  }
})

export { router as imageRoutes }
