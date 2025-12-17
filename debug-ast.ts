/* eslint-disable no-console */
import { fromMarkdown } from 'mdast-util-from-markdown'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown } from 'mdast-util-directive'
import { math } from 'micromark-extension-math'
import { mathFromMarkdown } from 'mdast-util-math'
import { frontmatter } from 'micromark-extension-frontmatter'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown } from 'mdast-util-gfm'

const content = `---
title: Test
---

$$
math
$$

::: {.class}
content
:::

| Col1 | Col2 |
|------|------|
| A    | B    |
`

// Pre-process Pandoc fenced div syntax
const preprocessed = content
  .replace(/^:::(\s+)\{/gm, ':::div{')
  .replace(/^:::([\w-]+)\s+\{/gm, ':::$1{')

console.log('=== Preprocessed content ===')
console.log(preprocessed)
console.log('\n=== AST ===')

const tree = fromMarkdown(preprocessed, {
  extensions: [
    directive(),
    math(),
    frontmatter(['yaml']),
    gfm(),
  ],
  mdastExtensions: [
    directiveFromMarkdown(),
    mathFromMarkdown(),
    frontmatterFromMarkdown(['yaml']),
    gfmFromMarkdown(),
  ],
})

console.log(JSON.stringify(tree, null, 2))
