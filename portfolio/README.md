# Munsif Khan — Portfolio

A production-ready personal developer portfolio built with **React 18 + Vite + Tailwind CSS + Framer Motion**. Dark glassmorphism theme, glowing gradients, a custom cursor, scroll-driven reveal animations, and a fully data-driven content layer so you never have to touch component code to update what's on the page.

## Tech stack

- **React 18** + **Vite** — fast dev server and build
- **Tailwind CSS** — utility-first styling, custom design tokens (colors, shadows, animations) in `tailwind.config.js`
- **Framer Motion** — scroll-reveal and micro-interaction animations
- **react-icons** — `Fi` (Feather) icons for UI, `Si` (Simple Icons) for tech-stack logos

## Getting started

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the local dev server (with hot reload)
npm run dev
```

This opens the site at `http://localhost:5173`. Any change you save is reflected instantly.

### Building for production

```bash
npm run build      # outputs an optimized build to /dist
npm run preview    # serve the production build locally to sanity-check it
```

The contents of `/dist` after `npm run build` are what you deploy — to Vercel, Netlify, GitHub Pages, or any static host.

## How the project is organized

```
portfolio/
├── index.html                  # HTML shell, meta tags, font loading
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Page layout — composes every section
│   ├── index.css                # Global styles, glass/cursor/utility classes
│   ├── data/
│   │   └── portfolioData.js     # ⭐ ALL editable content lives here
│   ├── lib/
│   │   └── scroll.js            # Shared "scroll to section" helper
│   └── components/
│       ├── Navbar.jsx
│       ├── CustomCursor.jsx
│       ├── Hero.jsx
│       ├── About.jsx            # Bento-grid bio section
│       ├── Projects.jsx
│       ├── Timeline.jsx         # Experience & education
│       ├── Skills.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       └── SectionHeading.jsx   # Shared section title component
└── public/
    └── favicon.svg
```

## Updating your content (the important part)

**You will almost never need to edit a component file.** Everything visible on the page — your name, bio, projects, skills, timeline, and social links — comes from one file:

```
src/data/portfolioData.js
```

Open it and edit the plain JavaScript objects/arrays inside. The page updates automatically.

### Adding your photos (auto-rotating)

The About section's identity card rotates through your photos automatically, crossfading every few seconds. To use it:

1. Drop your image files into `public/photos/` — e.g. `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`.
2. In `src/data/portfolioData.js`, list their paths in `profile.photos`, in the order you want them to cycle:

```js
photos: ['/photos/photo-1.jpg', '/photos/photo-2.jpg', '/photos/photo-3.jpg'],
```

You can use just one photo (no rotation, it just displays) or several (auto-rotates every 3.5s). To change the rotation speed, edit `ROTATE_INTERVAL` (in milliseconds) near the top of `src/components/About.jsx`. Leave `photos: []` empty, or point to files that don't exist yet, and it falls back to your initials on a gradient — the site never shows a broken image.

### Adding a new project

Copy an existing object inside the `projects` array and fill in your own values:

```js
{
  id: 'my-new-project',                 // unique, no spaces — used internally
  name: 'My New Project',
  description: 'One or two sentences shown on the card itself.',
  longDescription: 'A slightly longer sentence shown on hover over the cover image.',
  tags: ['React', 'Node.js', 'MongoDB'],
  github: 'https://github.com/you/repo', // leave as '' to hide the GitHub icon
  live: 'https://your-live-demo.com',    // leave as '' to hide the live-demo icon/link
  image: '',                             // leave empty to use the generated gradient card,
                                          // or put a path like '/projects/my-project.png'
                                          // (place the image file in /public/projects/)
  featured: true,                        // featured projects render as a larger card
}
```

### Updating your bio, stack, or stats

Edit the `profile` and `bento` objects at the top of the file — `profile.bio` is an array of paragraphs, `bento.stack` / `bento.currentlyLearning` / `bento.hobbies` are simple string arrays, and `bento.stats` is a small list of label/value pairs shown in the About bento grid.

### Adding a timeline entry (education / experience / internship)

Add an object to the `timeline` array:

```js
{
  id: 'unique-id',
  type: 'experience',      // one of: 'education' | 'experience' | 'milestone'
  title: 'Software Engineer Intern',
  org: 'Company Name',
  period: 'Jun 2026 — Aug 2026',
  description: 'One or two sentences about what you did there.',
}
```

Entries render in the order they appear in the array.

### Adding/removing a skill

Each key in the `skills` object is a category (`Languages`, `Frameworks & Libraries`, `Databases`, `Tools & Platforms`) whose value is an array of skill names. Add or remove strings freely — add a new category by adding a new key, and it will render as its own card automatically. A handful of well-known technologies (React, Node.js, MongoDB, Docker, etc.) get a matching icon automatically via `ICON_MAP` in `src/components/Skills.jsx`; anything not in that list falls back to a generic icon, which is purely cosmetic.

### Changing socials

Edit the `socials` array — each entry needs a `label`, a `url`, and an `icon` (`'github'`, `'linkedin'`, or `'mail'`). To add a new platform (e.g. Twitter/X), add its icon import in `Hero.jsx` and `Contact.jsx`'s `ICONS` map and add the entry here.

### Adding a resume download button

Set `profile.resumeUrl` to a path (e.g. `/resume.pdf` after placing the file in `/public`), then add a link/button referencing it wherever you'd like — a "Download Resume" button in `Hero.jsx` is the natural spot.

## Deploying

The fastest path is [Vercel](https://vercel.com):

1. Push this folder to a GitHub repository.
2. Import the repo on Vercel — it auto-detects Vite and needs no configuration.
3. Deploy. Every future push to `main` redeploys automatically.

GitHub Pages and Netlify work the same way — just point them at `npm run build` and the `dist` output folder.

## Notes on the design system

- Colors, fonts, shadows, and animation keyframes are all defined once in `tailwind.config.js` — change a value there (e.g. `colors.accent`) and it updates everywhere it's used.
- The `.glass` utility class (in `src/index.css`) is the frosted-glass panel look used throughout — reuse it on any new element by adding `className="glass"`.
- Add `className="cursor-hover"` to any new interactive element so the custom cursor recognizes it and grows on hover.
