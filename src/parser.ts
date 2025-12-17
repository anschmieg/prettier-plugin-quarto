import type { Parser } from 'prettier'
import { fromMarkdown } from 'mdast-util-from-markdown'
import type { ASTNode } from './ast'
import { astFormat } from './ast'

// Pandoc extensions
import {
  citationExtension,
  citationFromMarkdownExtension,
  definitionListExtension,
  definitionListFromMarkdownExtension,
  directiveExtension,
  directiveFromMarkdownExtension,
  frontmatterExtension,
  frontmatterFromMarkdownExtension,
  gfmExtension,
  gfmFromMarkdownExtension,
  mathExtension,
  mathFromMarkdownExtension,
} from './pandoc'
import { preprocessPandocSyntax } from './pandoc/preprocess'

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
    // This handles nested divs by using different colon counts for different nesting levels
    const preprocessed = preprocessPandocSyntax(text)

    // Parse markdown with all Pandoc and Quarto extensions
    // This enables True AST parsing for divs, math, frontmatter, tables, etc.
    const tree = fromMarkdown(preprocessed, {
      extensions: [
        directiveExtension(),
        mathExtension(),
        frontmatterExtension,
        gfmExtension(),
        definitionListExtension, // Definition Lists
        citationExtension({}), // Citations
      ],
      mdastExtensions: [
        directiveFromMarkdownExtension(),
        mathFromMarkdownExtension(),
        frontmatterFromMarkdownExtension,
        gfmFromMarkdownExtension(),
        definitionListFromMarkdownExtension,
        citationFromMarkdownExtension,
      ],
    })

    return tree
  },
}
