import type { Parser } from 'prettier'
import { fromMarkdown } from 'mdast-util-from-markdown'
import type { ASTNode } from './ast'
import { astFormat } from './ast'

// Pandoc extensions
import {
  directiveExtension,
  directiveFromMarkdownExtension,
  frontmatterExtension,
  frontmatterFromMarkdownExtension,
  gfmExtension,
  gfmFromMarkdownExtension,
  mathExtension,
  mathFromMarkdownExtension,
} from './pandoc'

export const parser: Parser<ASTNode> = {
  astFormat,
  locStart(node: any) {
    return node.position?.start.offset ?? 0
  },
  locEnd(node: any) {
    return node.position?.end.offset ?? 0
  },
  async parse(text: string) {
    // Pre-process Pandoc fenced div syntax to be compatible with micromark-extension-directive
    // Pandoc allows: ::: {.class} or ::: name {.class}
    // micromark-extension-directive requires: :::name{.class}
    // We convert: ::: {.class} -> :::div{.class}
    const preprocessed = text
      // Match ::: followed by optional whitespace and then attributes in braces
      // Convert to :::div{attributes}
      .replace(/^:::(\s+)\{/gm, ':::div{')
      // Match ::: followed by a name, whitespace, and attributes
      // Convert to :::name{attributes}
      .replace(/^:::([\w-]+)\s+\{/gm, ':::$1{')

    // Parse markdown with all Pandoc and Quarto extensions
    // This enables True AST parsing for divs, math, frontmatter, tables, etc.
    const tree = fromMarkdown(preprocessed, {
      extensions: [
        directiveExtension(),
        mathExtension(),
        frontmatterExtension,
        gfmExtension(),
      ],
      mdastExtensions: [
        directiveFromMarkdownExtension(),
        mathFromMarkdownExtension(),
        frontmatterFromMarkdownExtension,
        gfmFromMarkdownExtension(),
      ],
    })

    return tree
  },
}
