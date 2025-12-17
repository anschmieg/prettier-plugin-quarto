/**
 * Pandoc Frontmatter
 * Handles YAML metadata blocks (--- ... ---)
 */

import { frontmatter } from 'micromark-extension-frontmatter'
import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter'

/**
 * Micromark extension for frontmatter syntax
 */
export const frontmatterExtension = frontmatter(['yaml'])

/**
 * MDAST extension for parsing frontmatter
 */
export const frontmatterFromMarkdownExtension = frontmatterFromMarkdown(['yaml'])

/**
 * MDAST extension for serializing frontmatter
 */
export const frontmatterToMarkdownExtension = frontmatterToMarkdown(['yaml'])
