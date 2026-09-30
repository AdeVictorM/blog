const els = {
  loading: document.getElementById("loadingState"),
  error: document.getElementById("errorState"),
  errorMessage: document.getElementById("errorMessage"),
  article: document.getElementById("postArticle"),
  title: document.getElementById("postTitle"),
  date: document.getElementById("postDate"),
  tags: document.getElementById("postTags"),
  body: document.getElementById("postBody"),
  pageTitle: document.getElementById("pageTitle"),
};

function showState(state) {
  els.loading.hidden = state !== "loading";
  els.error.hidden = state !== "error";
  els.article.hidden = state !== "article";
}

function showError(message) {
  els.errorMessage.textContent = message;
  showState("error");
}

function getSlugFromUrl() {
  return new URLSearchParams(window.location.search).get("slug");
}

async function init() {
  const slug = getSlugFromUrl();
  if (!slug) {
    showError("No post specified.");
    return;
  }

  showState("loading");
  try {
    const res = await fetch(`posts/${slug}.md`);
    if (!res.ok) {
      showError("That post doesn't exist.");
      return;
    }
    const raw = await res.text();
    const { data, content } = parseFrontMatter(raw);

    els.pageTitle.textContent = `${data.title || slug} — The Blog`;
    els.title.textContent = data.title || slug;
    els.date.textContent = formatDate(data.date);

    const tags = Array.isArray(data.tags) ? data.tags : [];
    els.tags.innerHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    els.body.innerHTML = marked.parse(content);

    showState("article");
  } catch (err) {
    console.error(err);
    showError("Something went wrong loading this post.");
  }
}

init();