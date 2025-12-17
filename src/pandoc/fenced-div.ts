/**
 * Custom micromark extension for Pandoc fenced divs
 * Handles ::: {.class #id key=val} syntax
 *
 * This is a simplified implementation that wraps micromark-extension-directive
 * and pre-processes Pandoc syntax to CommonMark directive syntax.
 */

import type { Extension as MicromarkExtension } from 'micromark-util-types'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown as originalDirectiveFromMarkdown, directiveToMarkdown as originalDirectiveToMarkdown } from 'mdast-util-directive'

/**
 * Pre-process Pandoc fenced div syntax to CommonMark directive syntax
 * Converts: ::: {.class #id key=val} -> :::div{.class #id key=val}
 * Also converts: ::: {.class} -> :::div{.class}
 */
export function preprocessPandocDivs(text: string): string {
  // Match ::: followed by attributes in curly braces
  // Pandoc allows: ::: {.class #id key=val}
  // We convert to: :::div{.class #id key=val}
  return text.replace(/^:::(\s*)\{([^}]+)\}/gm, (_match, space, attrs) => {
    // If there's a space before the braces, we need to add a placeholder name
    return `:::div{${attrs}}`
  })
}

/**
 * Post-process CommonMark directive syntax back to Pandoc fenced div syntax
 * Converts: :::div{.class} -> ::: {.class}
 */
export function postprocessPandocDivs(text: string): string {
  // Convert :::div{attrs} back to ::: {attrs}
  return text.replace(/^:::div\{([^}]+)\}/gm, (_match, attrs) => {
    return `::: {${attrs}}`
  })
}

/**
 * Create a micromark extension for Pandoc fenced divs
 */
export function pandocFencedDiv(): MicromarkExtension {
  // Use the standard directive extension
  // The pre/post processing handles the syntax conversion
  return directive()
}

/**
 * MDAST extension for parsing Pandoc fenced divs
 */
export function pandocFencedDivFromMarkdown() {
  return originalDirectiveFromMarkdown()
}

/**
 * MDAST extension for serializing Pandoc fenced divs
 */
export function pandocFencedDivToMarkdown() {
  const handlers = originalDirectiveToMarkdown()

  // Wrap the containerDirective handler to convert div name
  if (handlers && handlers.handlers) {
    const originalHandler = handlers.handlers.containerDirective
    if (originalHandler) {
      handlers.handlers.containerDirective = function (node: any, parent: any, state: any, info: any) {
        // If the directive name is 'div' and it has class/id attributes,
        // we want to output Pandoc syntax: ::: {.class #id}
        if (node.name === 'div' && (node.attributes?.class || node.attributes?.id)) {
          // Build attribute string
          const attrs: string[] = []
          if (node.attributes.class) {
            attrs.push(`.${node.attributes.class}`)
          }
          if (node.attributes.id) {
            attrs.push(`#${node.attributes.id}`)
          }
          // Add other attributes
          for (const [key, value] of Object.entries(node.attributes || {})) {
            if (key !== 'class' && key !== 'id') {
              attrs.push(`${key}="${value}"`)
            }
          }

          // Format children
          const content = state.containerFlow(node, info)

          return `::: {${attrs.join(' ')}}\n${content}:::`
        }

        // Otherwise use the original handler
        return originalHandler.call(this, node, parent, state, info)
      }
    }
  }

  return handlers
}
