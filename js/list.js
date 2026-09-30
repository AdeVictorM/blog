const els = {
  loading: document.getElementById("loadingState"),
  error: document.getElementById("errorState"),
  empty: document.getElementById("emptyState"),
  list: document.getElementById("postList"),
};

function showState(state) {
  els.loading.hidden = state !== "loading";
  els.error.hidden = state !== "error";
  els.empty.hidden = state !== "empty";
  els.list.hidden = state !== "list";
}

async function loadManifest() {
  const res = await fetch("posts/manifest.json");
  if (!res.ok) throw new Error("Couldn't load manifest.json");
  return res.json();
}

async function loadPostMeta(slug) {
  const res = await fetch(`posts/${slug}.md`);
  if (!res.ok) throw new Error(`Couldn't load posts/${slug}.md`);
  const raw = await res.text();
  const { data } = parseFrontMatter(raw);
  return { slug, ...data };
}

function renderList(posts) {
  els.list.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    li.className = "post-card";

    const tags = Array.isArray(post.tags) ? post.tags : [];
    const tagsHtml = tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    li.innerHTML = `
      <a class="post-card__link" href="post.html?slug=${encodeURIComponent(post.slug)}">
        <h2 class="post-card__title">${post.title || post.slug}</h2>
        <div class="post-card__meta">
          <time>${formatDate(post.date)}</time>
          ${tagsHtml ? `<span class="post-card__tags">${tagsHtml}</span>` : ""}
        </div>
        <p class="post-card__excerpt">${post.excerpt || ""}</p>
      </a>
    `;
    els.list.appendChild(li);
  });

  els.list.hidden = false;
  showState("list");
}

async function init() {
  showState("loading");
  try {
    const slugs = await loadManifest();
    if (slugs.length === 0) {
      showState("empty");
      return;
    }
    const posts = await Promise.all(slugs.map(loadPostMeta));
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderList(posts);
  } catch (err) {
    console.error(err);
    showState("error");
  }
}

init();