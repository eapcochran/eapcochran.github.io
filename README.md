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

To enable contact form submissions with Formspree, create a `.env` file and add:

```sh
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

## Production Build

```sh
npm run build
```

The static output is generated in `dist/`.

## Notes

- Content is currently placeholder content based on the provided mockups.
- The contact form is wired for Formspree AJAX submission when `PUBLIC_FORMSPREE_ENDPOINT` is configured.
- Since this repository is named `eapcochran.github.io`, it is already well-positioned for GitHub Pages user-site hosting at the domain root.
