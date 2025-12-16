import type { AstPath, Printer } from 'prettier'
import { doc } from 'prettier'
import type * as Mdast from 'mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { directiveToMarkdown } from 'mdast-util-directive'
import type { ASTNode } from './ast'

const { hardline } = doc.builders

export const printer: Printer<ASTNode> = {
  print(path: AstPath<ASTNode>) {
    const node = path.getNode()

    if (!node) {
      return ''
    }

    // For the root node, delegate to mdast-util-to-markdown
    // which handles the full tree serialization
    if (node.type === 'root') {
      const markdown = toMarkdown(node as Mdast.Root, {
        extensions: [directiveToMarkdown()],
      })
      return markdown
    }

    return ''
  },

  embed(path: AstPath<ASTNode>) {
    const node = path.getNode() as any

    // Handle code blocks - delegate to appropriate language formatter
    if (node.type === 'code' && node.lang) {
      const lang = node.lang.toLowerCase()
      const value = node.value || ''

      // Map Quarto language names to Prettier parser names
      const languageMap: Record<string, string> = {
        python: 'python',
        r: 'r',
        julia: 'julia',
        javascript: 'babel',
        js: 'babel',
        typescript: 'typescript',
        ts: 'typescript',
        yaml: 'yaml',
        json: 'json',
        html: 'html',
        css: 'css',
        scss: 'scss',
        bash: 'sh',
        sh: 'sh',
      }

      const parser = languageMap[lang]
      if (parser) {
        return async (textToDoc: any) => {
          try {
            const formatted = await textToDoc(value, { parser })
            return [
              '```',
              node.lang,
              node.meta ? ` ${node.meta}` : '',
              hardline,
              formatted,
              hardline,
              '```',
            ]
          }
          catch {
            // If formatting fails, return undefined to use default
            return undefined
          }
        }
      }
    }

    return null
  },
}
