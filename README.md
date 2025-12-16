# prettier-plugin-quarto

**Status: Under Development**

A standalone Prettier plugin to provide robust formatting for [Quarto](https://quarto.org) (`.qmd`) documents.

## Mission
To extend Prettier's Markdown parser to safely handle Quarto-specific syntax, preventing "ghost" formatting errors (such as the insertion of `$$`) and ensuring consistent style across Quarto projects.

## Usage (Coming Soon)
```bash
npm install --save-dev prettier prettier-plugin-quarto
```

Configure your `.prettierrc`:
```json
{
  "plugins": ["prettier-plugin-quarto"],
  "overrides": [
    { "files": "*.qmd", "options": { "parser": "quarto" } }
  ]
}
```

## Developer Usage
See `DEVELOPER_CONTEXT.md` for architectural details and implementation verification steps.
