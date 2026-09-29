# Blog

A minimal blog built from plain Markdown files — no CMS, no database,
no build step. Posts are just `.md` files with a small front-matter header.

## File structure

```
blog/
├── index.html            # home page — lists all posts
├── post.html               # single-post template (reads ?slug=... from the URL)
├── css/
│   └── styles.css           # typography-focused styling
├── js/
│   ├── markdown.js           # tiny front-matter parser + date formatter (shared)
│   ├── list.js                 # fetches manifest + post front matter, renders the home list
│   └── post.js                  # fetches one post, renders it with marked.js
└── posts/
    ├── manifest.json          # list of post slugs the site knows about
    ├── hello-world.md
    └── why-markdown.md
```

## How it works

1. `index.html` fetches `posts/manifest.json`, then fetches each listed
   post's `.md` file just to read its front matter (title, date, excerpt,
   tags) — enough to build the home page cards without loading full post
   bodies.
2. Clicking a post goes to `post.html?slug=hello-world`. That page reads
   the `slug` from the URL, fetches `posts/hello-world.md`, and renders
   the full body using [marked.js](https://marked.js.org/) (loaded from a
   CDN) for Markdown → HTML.

## Adding a new post

1. Create a new file in `posts/`, e.g. `posts/my-new-post.md`:
   ```markdown
   ---
   title: My New Post
   date: 2026-10-01
   excerpt: A one-line summary shown on the home page.
   tags: [example, notes]
   ---

   Write the post in **Markdown** here.
   ```
2. Add the filename (without `.md`) to `posts/manifest.json`:
   ```json
   ["hello-world", "why-markdown", "my-new-post"]
   ```
3. That's it — no build step. The home page picks it up automatically,
   newest first (sorted by the `date` field).

## Running it locally

Because the pages `fetch()` local files, opening `index.html` directly
(`file://...`) won't work in most browsers. Serve it over HTTP instead:

```
npx serve .
```

or

```
python3 -m http.server
```

## Deploying it

Unlike the weather app, this needs **no API key and no serverless
functions** — it's entirely static files. Any static host works:
GitHub Pages, Netlify (drag-and-drop the folder, or `netlify deploy`),
or Vercel.

## Front matter format

The parser in `js/markdown.js` is intentionally small — it supports flat
`key: value` pairs and simple `[a, b, c]` arrays, which covers what a blog
post needs (title, date, excerpt, tags). It's not a full YAML parser, so
keep front matter simple.

## Ideas to extend it

- A tag filter on the home page (click a tag to see only matching posts)
- A search box that filters post titles/excerpts client-side
- An RSS feed generated from the same Markdown files
- Pagination once there are enough posts
- Syntax highlighting for code blocks (e.g. highlight.js from the same
  CDN pattern used for marked.js)