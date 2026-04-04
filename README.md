# ewen.dev Portfolio

Personal portfolio scaffolded with `Astro + React + TypeScript` and designed for static hosting on GitHub Pages.

## Stack

- `Astro` for static routing and page generation
- `React` for interactive UI pieces like the mobile navigation and contact form
- `TypeScript` across Astro and React components

## Routes

- `/`
- `/about`
- `/projects`
- `/blog`
- `/blog/[slug]`
- `/contact`

## Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
```

The static output is generated in `dist/`.

## Notes

- Content is currently placeholder content based on the provided mockups.
- The contact form is set up for layout and validation only. It can be connected to Formspree, Netlify Forms, or another backend later.
- Since this repository is named `eapcochran.github.io`, it is already well-positioned for GitHub Pages user-site hosting at the domain root.
