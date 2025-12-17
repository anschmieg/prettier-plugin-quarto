# prettier-plugin-quarto

A [Prettier](https://prettier.io) plugin for formatting [Quarto](https://quarto.org) documents (`.qmd`) and Pandoc Markdown (`.md`).

[![CI](https://github.com/anschmieg/prettier-plugin-quarto/actions/workflows/test.yml/badge.svg)](https://github.com/anschmieg/prettier-plugin-quarto/actions/workflows/test.yml)

## What is Quarto?

[Quarto](https://quarto.org) is an open-source scientific and technical publishing system built on Pandoc. It combines Markdown with executable code blocks (Python, R, Julia, Observable) to create reproducible documents, presentations, websites, and books.

## Features

### Dual Parser Support

- **`quarto` parser** - Full Quarto support for `.qmd` files
  - ✅ Math blocks with labels: `$$ E=mc^2 $$ {#eq-einstein}`
  - ✅ Shortcodes: `{{< meta title >}}`
  - ✅ All Pandoc extensions

- **`pandoc` parser** - Standard Pandoc for `.md` files
  - ✅ Citations: `[@smith2020]`
  - ✅ Definition lists
  - ✅ Divs/Callouts: `::: {.note}`
  - ✅ GFM (tables, task lists, etc.)
  - ❌ No Quarto-specific syntax

### Comprehensive Syntax Support

| Feature | Quarto Parser | Pandoc Parser |
|---------|--------------|---------------|
| Math blocks | ✅ | ✅ |
| Labeled equations | ✅ | ❌ |
| Citations | ✅ | ✅ |
| Definition lists | ✅ | ✅ |
| Fenced divs | ✅ | ✅ |
| Shortcodes | ✅ | ❌ |
| YAML frontmatter | ✅ | ✅ |
| GFM (tables, etc.) | ✅ | ✅ |

### Safety Features

- **Code block protection** - Content inside fenced code blocks is never modified
- **Lossless round-trips** - Formatting preserves all attributes and metadata
- **Tested** - 31 automated tests (18 syntax + 13 render equivalence)

## Installation

```bash
npm install --save-dev prettier prettier-plugin-quarto@alpha
```

## Usage

### Automatic (`.qmd` files)

Prettier automatically uses the `quarto` parser for `.qmd` files:

```bash
npx prettier --write document.qmd
```

### Manual (`.md` files)

To use the `pandoc` parser for `.md` files, configure Prettier:

**.prettierrc**
```json
{
  "plugins": ["prettier-plugin-quarto"],
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "parser": "pandoc"
      }
    }
  ]
}
```

Then format:
```bash
npx prettier --write document.md
```

## Examples

### Quarto Document (`.qmd`)

**Input:**
```markdown
---
title: My Analysis
---

# Introduction

Black-Scholes (@eq-bs) is elegant:

$$
\frac{\partial C}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2} = rC
$$ {#eq-bs}

{{< meta title >}} uses R.
```

**Output:** (formatted, preserves all Quarto syntax)

### Pandoc Markdown (`.md`)

**Input:**
```markdown
# Citations

See @smith2020 for details.

Term
:   Definition
```

**Output:** (formatted, standard Pandoc syntax preserved)

## Configuration

This plugin uses Prettier's standard configuration. No Quarto-specific options yet.

## Compatibility

- **Prettier:** `^3.0.0`
- **Node.js:** `>=18.0.0` (ES modules)
- **Quarto:** Tested with Quarto 1.4+
- **Pandoc:** Tested with Pandoc 3.1+

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

## Testing

```bash
# Run all tests
npm test

# Syntax safety tests only
npm test -- tests/syntax-safety.test.ts

# Render equivalence tests (requires Pandoc/Quarto CLI)
npm test -- tests/render-equivalence.test.ts
```

## Known Limitations

### Alpha Release

This is an **alpha** release. While functional and tested, expect:
- Potential formatting quirks
- Evolving API
- Missing features

### Pandoc Limitations

- Labeled math (`$$ {#eq:label}`) only works with Quarto, not raw Pandoc CLI
- Some advanced Quarto features may not be fully supported yet

## Roadmap

- [ ] Additional Quarto syntax (tabsets, layouts)
- [ ] Formatting options (line width for math, etc.)
- [ ] Better error messages
- [ ] Performance optimizations

## Contributing

Contributions welcome! Please:

1. Open an issue first to discuss changes
2. Follow existing code style (ESLint configured)
3. Add tests for new features
4. Update README for user-facing changes

## License

MIT

## Credits

Built with:
- [Prettier](https://prettier.io)
- [micromark](https://github.com/micromark/micromark) - Markdown parsing
- [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown) - AST utilities
- [@benrbray/micromark-extension-cite](https://github.com/benrbray/micromark-extension-cite) - Citation support

## See Also

- [Quarto Documentation](https://quarto.org)
- [Pandoc Manual](https://pandoc.org/MANUAL.html)
- [Prettier Plugins](https://prettier.io/docs/en/plugins.html)
