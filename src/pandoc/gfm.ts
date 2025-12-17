/**
 * GFM (GitHub Flavored Markdown)
 * Handles tables, task lists, autolinks, etc.
 */

import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'

/**
 * Micromark extension for GFM syntax
 */
export const gfmExtension = gfm

/**
 * MDAST extension for parsing GFM
 */
export const gfmFromMarkdownExtension = gfmFromMarkdown

/**
 * MDAST extension for serializing GFM
 */
export const gfmToMarkdownExtension = gfmToMarkdown
