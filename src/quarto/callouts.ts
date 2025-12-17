/**
 * Quarto Callouts
 * Special handling for ::: {.callout-*} divs
 */

// Callouts are special divs, so they're handled by the directive extension
// This module can provide additional formatting logic if needed
export function isCallout(className?: string): boolean {
  return className?.startsWith('callout-') ?? false
}
