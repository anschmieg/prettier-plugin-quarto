/**
 * Quarto Code Block Options
 * Handles #| key: value directives inside code blocks
 *
 * Note: These are typically preserved as-is within code blocks
 */

// Hash-pipe options are part of the code block content
// They should be preserved exactly as written
// This module can provide additional formatting logic if needed
export function isHashPipeOption(line: string): boolean {
  return line.trim().startsWith('#|')
}
