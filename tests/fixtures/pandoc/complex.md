---
title: Complex Pandoc Test Document
author: Test Author
---

# Introduction

This document tests **all** Pandoc markdown features supported by the plugin.

## Math Blocks

Display math with label:

$$
E = mc^2
$$ {#eq:einstein}

Display math with multiple attributes:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$ {#eq:gaussian .important}

Inline math: $a^2 + b^2 = c^2$ works too.

## Citations

According to @smith2020, this is important.

Multiple citations work: [@smith2020; @jones2021].

With locator: [@smith2020, pp. 33-35].

Suppressed author: [-@smith2020].

## Definition Lists

Term 1
:   Definition of term 1.

Term 2
:   Definition of term 2.

    Can have multiple paragraphs.

## Divs and Callouts

::: {.note}
This is a note callout.
:::

::: {#custom-id .warning}
This div has both an ID and a class.
:::

### Nested Divs

::: {.outer}
Outer content.

::: {.inner}
Inner content.
:::

More outer content.
:::

## Tables (GFM)

| Column A | Column B | Column C |
|----------|----------|----------|
| A1       | B1       | C1       |
| A2       | B2       | C2       |

## Code Blocks

```python
def hello():
    print("Hello, World!")
```

### Math Examples in Code (Should NOT be transformed)

```markdown
$$
This is an example of math syntax.
$$ {#eq:example}
```

```latex
$$
\frac{1}{2}
$$
```

## Footnotes

Here is a footnote reference[^1].

[^1]: This is the footnote content.

## Cross-References

See @eq:einstein for the famous equation.

## Block Quotes

> This is a block quote.
> It can span multiple lines.
>
> And have multiple paragraphs.

## Lists

1. First item
2. Second item
   - Nested bullet
   - Another nested
3. Third item

## Horizontal Rule

---

## Emphasis and Formatting

This is *italic*, **bold**, and ***bold italic***.

This is ~~strikethrough~~ and `inline code`.

## Links and Images

[Link text](https://example.com)

![Alt text](image.png){#fig:example .figure width=50%}

## Raw Content

```{=html}
<div class="custom">Raw HTML</div>
```
