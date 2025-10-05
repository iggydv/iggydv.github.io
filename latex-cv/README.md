# 📄 LaTeX CV

This directory contains the traditional academic CV in LaTeX format.

## Files

- **template.tex** - LaTeX source file for the CV
- **friggeri-cv.cls** - Custom LaTeX class file (Friggeri CV style)
- **bibliography.bib** - Bibliography references
- **publications.bib** - Publications list
- **template.pdf** - Compiled PDF output

## Compiling

To compile the LaTeX CV to PDF:

```bash
# Using pdflatex
pdflatex template.tex
biber template
pdflatex template.tex
pdflatex template.tex

# Or using latexmk (recommended)
latexmk -pdf template.tex

# Or using XeLaTeX (if fonts require it)
xelatex template.tex
biber template
xelatex template.tex
```

## Requirements

You'll need a LaTeX distribution installed:
- **macOS**: MacTeX (`brew install --cask mactex`)
- **Linux**: TeX Live (`sudo apt-get install texlive-full`)
- **Windows**: MiKTeX or TeX Live

## Customization

Edit `template.tex` to update:
- Personal information
- Work experience
- Education
- Skills
- Publications

## Note

This is an alternative format to the modern web portfolio. Both showcase the same professional experience but are suitable for different contexts:
- **Web portfolio**: Interactive, online presence
- **LaTeX CV**: Traditional, printable format for academic/formal applications

---

For the modern web version, see the [web/](../web/) directory.
