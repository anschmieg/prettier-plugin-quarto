import type { Parser } from 'prettier'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown } from 'mdast-util-directive'
import type { ASTNode } from './ast'
import { astFormat } from './ast'

export const parser: Parser<ASTNode> = {
  astFormat,
  locStart(node: any) {
    return node.position?.start.offset ?? 0
  },
  locEnd(node: any) {
    return node.position?.end.offset ?? 0
  },
  async parse(text: string) {
    // Parse markdown with directive support (for ::: divs)
    const tree = fromMarkdown(text, {
      extensions: [directive()],
      mdastExtensions: [directiveFromMarkdown()],
    })

    return tree
  },
}
