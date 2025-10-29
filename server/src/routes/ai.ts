import express from 'express'
import OpenAI from 'openai'
import { logger } from '../utils/logger'

const router = express.Router()

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// AI request handler
router.post('/request', async (req, res) => {
  try {
    const { type, prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    let systemPrompt = ''
    let userPrompt = prompt

    // Customize system prompt based on request type
    switch (type) {
      case 'completion':
        systemPrompt = 'You are an expert code completion assistant. Provide accurate, efficient code completions that follow best practices.'
        break
      case 'refactor':
        systemPrompt = 'You are an expert code refactoring assistant. Refactor the provided code to improve readability, performance, and maintainability while preserving functionality.'
        break
      case 'debug':
        systemPrompt = 'You are an expert debugging assistant. Identify and fix bugs in the provided code, explain the issues, and provide improved code.'
        break
      case 'explain':
        systemPrompt = 'You are an expert code explanation assistant. Explain the provided code in detail, including how it works, its purpose, and any important concepts.'
        break
      case 'generate':
        systemPrompt = 'You are an expert code generation assistant. Generate clean, efficient, and well-documented code based on the requirements.'
        break
      case 'cascade':
        systemPrompt = 'You are an expert multi-step coding assistant. Execute the requested coding task as part of a larger workflow.'
        break
      default:
        systemPrompt = 'You are an expert coding assistant. Help with any coding-related tasks.'
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })

    const response = completion.choices[0]?.message?.content || 'No response generated'

    logger.info(`AI request completed: ${type}`)

    res.json({ response })
  } catch (error) {
    logger.error('AI request failed:', error)
    res.status(500).json({ error: 'Failed to process AI request' })
  }
})

// Code completion endpoint
router.post('/completion', async (req, res) => {
  try {
    const { code, language, position } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} code completion assistant. Provide accurate, efficient code completions that follow best practices. Only return the code completion, no explanations.`
        },
        {
          role: 'user',
          content: `Complete this ${language} code at position ${position}:\n\n${code}`
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    })

    const response = completion.choices[0]?.message?.content || ''

    res.json({ completion: response })
  } catch (error) {
    logger.error('Code completion failed:', error)
    res.status(500).json({ error: 'Failed to generate code completion' })
  }
})

// Cascade flow execution
router.post('/cascade', async (req, res) => {
  try {
    const { steps, context } = req.body

    if (!steps || !Array.isArray(steps)) {
      return res.status(400).json({ error: 'Steps array is required' })
    }

    const results = []
    let currentContext = context || ''

    for (const step of steps) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert coding assistant executing a step in a multi-step workflow. Provide the code or solution for this specific step.'
          },
          {
            role: 'user',
            content: `Step: ${step}\n\nCurrent context: ${currentContext}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })

      const result = completion.choices[0]?.message?.content || ''
      results.push(result)
      currentContext += `\n\nStep result: ${result}`
    }

    res.json({ results, finalContext: currentContext })
  } catch (error) {
    logger.error('Cascade execution failed:', error)
    res.status(500).json({ error: 'Failed to execute cascade flow' })
  }
})

export { router as aiRoutes }
