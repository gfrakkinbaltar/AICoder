import crypto from 'crypto'

const algorithm = 'aes-256-gcm'
const keyLength = 32
const ivLength = 16
const tagLength = 16

// Generate encryption key
export const generateKey = (): string => {
  return crypto.randomBytes(keyLength).toString('hex')
}

// Encrypt data
export const encrypt = (text: string, key: string): string => {
  const keyBuffer = Buffer.from(key, 'hex')
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipher(algorithm, keyBuffer)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const tag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted
}

// Decrypt data
export const decrypt = (encryptedData: string, key: string): string => {
  const keyBuffer = Buffer.from(key, 'hex')
  const parts = encryptedData.split(':')
  
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format')
  }
  
  const iv = Buffer.from(parts[0], 'hex')
  const tag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const decipher = crypto.createDecipher(algorithm, keyBuffer)
  decipher.setAuthTag(tag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

// Hash data (one-way)
export const hash = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Generate secure random string
export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex')
}

// Verify data integrity
export const verifyIntegrity = (data: string, hash: string): boolean => {
  return hash === crypto.createHash('sha256').update(data).digest('hex')
}
