import type * as Mdast from 'mdast'

export const astFormat = 'quarto-ast'

// Re-export mdast types and extend as needed for Quarto
export type ASTNode = Mdast.Root
