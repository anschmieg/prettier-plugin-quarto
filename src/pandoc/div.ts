/**
 * Pandoc Divs and Spans
 * Handles ::: {.class} blocks and [text]{.class} spans
 */

import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown, directiveToMarkdown } from 'mdast-util-directive'

/**
 * Micromark extension for directive syntax (divs/spans)
 */
export const directiveExtension = directive

/**
 * MDAST extension for parsing directives
 */
export const directiveFromMarkdownExtension = directiveFromMarkdown

/**
 * MDAST extension for serializing directives
 */
export const directiveToMarkdownExtension = directiveToMarkdown
