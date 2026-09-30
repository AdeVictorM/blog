// Parses the YAML-ish front matter block at the top of a Markdown file:
//
//   ---
//   title: My Post
//   date: 2026-01-15
//   excerpt: A short summary.
//   tags: [css, design]
//   ---
//   The rest of the file is the post body...
//
// This is intentionally small — it only supports flat key: value pairs and
// simple [a, b, c] arrays, which covers what a blog post's front matter
// actually needs. It is not a general YAML parser.
function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, yaml, content] = match;
  const data = {};

  yaml.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }

    data[key] = value;
  });

  return { data, content: content.trim() };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString || "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}