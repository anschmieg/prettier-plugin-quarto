import type { Plugin } from 'prettier'
import { astFormat } from './ast'
import { parser } from './parser'
import { printer } from './printer'

export default {
  languages: [
    {
      name: 'Quarto',
      parsers: ['quarto'],
      extensions: ['.qmd'],
      vscodeLanguageIds: ['quarto'],
    },
  ],
  parsers: {
    quarto: parser,
  },
  printers: {
    [astFormat]: printer,
  },
} as Plugin
