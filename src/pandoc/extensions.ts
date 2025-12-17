import {
  defList,
} from 'micromark-extension-definition-list'
import {
  defListFromMarkdown,
  defListToMarkdown,
} from 'mdast-util-definition-list'
import {
  citeSyntax,
} from '@benrbray/micromark-extension-cite'
import {
  citeFromMarkdown,
  citeToMarkdown,
} from '@benrbray/mdast-util-cite'

// Re-export definition list
export const definitionListExtension = defList
export const definitionListFromMarkdownExtension = defListFromMarkdown
export const definitionListToMarkdownExtension = defListToMarkdown

// Re-export citation
export const citationExtension = citeSyntax
export const citationFromMarkdownExtension = citeFromMarkdown
export const citationToMarkdownExtension = citeToMarkdown
