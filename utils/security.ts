/**
 * Security utility functions for the Intel AI Modeller
 */

/**
 * Generates a cryptographically secure random ID
 * Falls back to less secure method if crypto API is not available
 */
export function generateSecureId(): string {
  try {
    const array = new Uint32Array(2)
    crypto.getRandomValues(array)
    return `id-${array[0]}-${array[1]}`
  } catch (e) {
    // Fallback for environments where crypto is not available
    console.warn("Crypto API not available, using less secure ID generation")
    return `id-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
  }
}

/**
 * Sanitizes text to prevent XSS attacks when rendering to canvas or DOM
 */
export function sanitizeText(text: string): string {
  if (typeof text !== "string") return ""

  return text.replace(/[<>&"']/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case '"':
        return "&quot;"
      case "'":
        return "&#39;"
      default:
        return match
    }
  })
}

/**
 * Safely logs errors without exposing sensitive information
 */
export function safeErrorLog(error: unknown, context = "application"): void {
  // Log a generic message for users
  console.error(`An error occurred in the ${context}`)

  // Only log details in development
  if (process.env.NODE_ENV === "development") {
    const sanitizedError = error instanceof Error ? error.message : "Unknown error"
    console.debug(`Debug info (${context}):`, sanitizedError)

    if (error instanceof Error && error.stack) {
      console.debug(`Stack trace (${context}):`, error.stack)
    }
  }
}

/**
 * Validates and sanitizes numeric input within specified bounds
 */
export function validateNumericInput(value: number, min: number, max: number, defaultValue: number = min): number {
  if (typeof value !== "number" || isNaN(value)) {
    return defaultValue
  }
  return Math.max(min, Math.min(max, value))
}

/**
 * Rate limiter function to prevent excessive calls
 */
export class RateLimiter {
  private lastCallTime: Record<string, number> = {}

  /**
   * Checks if an action can be performed based on cooldown
   * @param actionKey - Unique identifier for the action
   * @param cooldownMs - Cooldown period in milliseconds
   * @returns boolean - True if action can be performed, false if rate limited
   */
  canPerformAction(actionKey: string, cooldownMs: number): boolean {
    const now = Date.now()
    const lastTime = this.lastCallTime[actionKey] || 0

    if (now - lastTime < cooldownMs) {
      return false
    }

    this.lastCallTime[actionKey] = now
    return true
  }

  /**
   * Resets the rate limiter for a specific action
   */
  reset(actionKey: string): void {
    delete this.lastCallTime[actionKey]
  }
}
