# Developer Context: prettier-plugin-quarto implementation

## Mission (Production Ready)
Implement a **complete, production-grade** Prettier plugin for Quarto (`.qmd`). It must extend the Markdown parser to natively understand and format ALL Quarto syntax elements. This is NOT a hacky experiment; it is the foundation for a published NPM package.

### 1. Scope of Syntax Support (Full Spec)
The plugin must parse, AST-node-ify, and safely format:
*   **Equation Labels**: `$$ ... $$ {#eq-label}` (Parse as Math+Attributes)
*   **Fenced Divs**: `::: {.class}` or shorthand `::: class` or `:::class` (Parse as Container Directives)
*   **Callouts**: Special handling for callout-type divs, respecting their specific attributes.
*   **Figures/Tables**: `![...](...){#fig-id}` (Parse as Image+Attributes)
*   **Inline Spans**: `[text]{.class}`
*   **Computation Blocks**: ````{python}` etc. (See strategy below).
*   **Any other Quarto-specific syntax**: Everything that is not covered by the included base Markdown parser must be covered by this plugin.

### 2. Strategy: AST Extension + Embedded Languages
1.  **Parser Extension**: Use `micromark-extension-directive` and custom `micromark` extensions to parse Quarto syntax into proper `mdast` nodes (directives, spans, attributes).
2.  **Printers**: Implement printers that nicely format these nodes (e.g., aligning attribute keys).
3.  **Embedded Languages**:
    *   Implement the `embed()` function in the printer.
    *   Identify code blocks (`python`, `r`, `julia`).
    *   **Delegate**: Use `textToDoc` to hand these blocks off to installed Prettier plugins (e.g. `prettier-plugin-python`, `prettier-plugin-sh`).
    *   **Do not bundle** formatters; rely on the user's installed plugins.

### 3. Architecture
*   **Plugin Name**: `prettier-plugin-quarto`
*   **Base Language**: Markdown (Extends `remark-parse`)
*   **Technique**: Use `micromark` extensions for parsing, standard Prettier `embed` API for code blocks.
*   **Reference**: [`prettier-plugin-slidev`](https://github.com/slidevjs/prettier-plugin) (Use for project structure ONLY).

## Next Steps for Implementation Agent
1.  Run `bun install` to get base dependencies (ensure `prettier` v3+).
2.  Clean up `src/` files:
    *   REMOVE Slidev parsers.
    *   IMPLEMENT Quarto parser extension.
3.  Implement the AST extension logic.
4.  Write a test case in `test/` that reproduces the `$$` bug and asserts it is fixed. Also write tests for other relevant examples.
5.  **Verify**: Ensure `bun run test` passes and formatting is idempotent (running twice changes nothing).
