import type { AstPath, Printer } from 'prettier'
import type * as Mdast from 'mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import type { ASTNode } from './ast'

// Import toMarkdown extensions
import {
  directiveToMarkdownExtension,
  frontmatterToMarkdownExtension,
  gfmToMarkdownExtension,
  mathToMarkdownExtension,
} from './pandoc'

export const printer: Printer<ASTNode> = {
  print(path: AstPath<ASTNode>) {
    const node = path.getNode()

    if (!node) {
      return ''
    }

    // For the root node, convert to markdown with all extensions
    if (node.type === 'root') {
      // Get the base directive extension
      const directiveExt = directiveToMarkdownExtension()

      // Wrap the containerDirective handler to output Pandoc syntax
      const customDirectiveExt = {
        ...directiveExt,
        handlers: {
          ...directiveExt.handlers,
          containerDirective(node: any, _parent: any, state: any, info: any) {
            const original = directiveExt.handlers?.containerDirective

            // If the directive name is 'div', output Pandoc fenced div syntax
            if (node.name === 'div') {
              // Build attribute string
              const attrs: string[] = []
              if (node.attributes) {
                if (node.attributes.class) {
                  attrs.push(`.${node.attributes.class}`)
                }
                if (node.attributes.id) {
                  attrs.push(`#${node.attributes.id}`)
                }
                // Add other attributes
                for (const [key, value] of Object.entries(node.attributes)) {
                  if (key !== 'class' && key !== 'id') {
                    attrs.push(`${key}="${value}"`)
                  }
                }
              }

              // Format children
              const content = state.containerFlow(node, info)
              const attrString = attrs.length > 0 ? ` {${attrs.join(' ')}}` : ''

              // Ensure content ends with newline before closing fence
              const trimmedContent = content.trim()
              return `:::${attrString}\n${trimmedContent}\n:::`
            }

            // Otherwise use the original handler
            if (original) {
              return original.call(this, node, _parent, state, info)
            }
            return ''
          },
        },
      }

      const markdown = toMarkdown(node as Mdast.Root, {
        extensions: [
          customDirectiveExt,
          mathToMarkdownExtension(),
          frontmatterToMarkdownExtension,
          gfmToMarkdownExtension(),
        ],
      })
      return markdown
    }

    return ''
  },

  embed() {
    // No embed support for now - keep it simple
    return null
  },
}
