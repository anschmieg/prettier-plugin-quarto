/**
 * Pandoc Math
 * Handles inline $ ... $ and block $$ ... $$ math with optional labels
 */

import { math } from 'micromark-extension-math'
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math'

/**
 * Micromark extension for math syntax
 */
export const mathExtension = math

/**
 * MDAST extension for parsing math
 */
export const mathFromMarkdownExtension = mathFromMarkdown

/**
 * MDAST extension for serializing math
 */
export const mathToMarkdownExtension = mathToMarkdown
