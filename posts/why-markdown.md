---
title: Why Markdown for a Blog
date: 2026-09-25
excerpt: Plain text files instead of a database — the trade-offs, honestly.
tags: [markdown, tooling]
---

Most blogging tutorials reach for a database and an admin panel pretty
quickly. This one doesn't, on purpose.

## The trade-off

**What you get:**

1. Posts are just files — easy to version-control, back up, or move anywhere
2. No server-side language or database to set up or pay for
3. Writing happens in any text editor, no login screen required

**What you give up:**

- No comments system out of the box
- No built-in admin UI for non-technical editors
- Every new post needs a matching line in `manifest.json`

For a personal or portfolio blog, that trade mostly favors simplicity. If
this ever needs multiple authors or a comments section, that's the point
where reaching for a proper CMS starts to make more sense.

## What's next

A few natural additions from here:

- A tag filter on the home page
- Search across post titles
- An RSS feed generated from the same Markdown files

None of those need a backend either — just more JavaScript.