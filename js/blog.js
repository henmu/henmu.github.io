/* =========================================================================
   EDIT ME — your blog posts. Add, remove, or edit entries freely.
   - title:   post title
   - date:    "YYYY-MM-DD" (posts are shown newest first)
   - summary: one or two sentences, shown on the closed card
   - tags:    shown as outlined tags (colours are picked automatically)
   - body:    the full post, one string per paragraph. Shown when the card is
              opened. Plain text; HTML such as <em> or <a href="..."> works.
   Delete both placeholder posts and leave the list empty, and the page
   shows a "No posts yet" message instead.
   ========================================================================= */
const POSTS = [
  {
    title: "Placeholder: your first post",
    date: "2026-10-14",
    summary: "A one- or two-sentence teaser for the post goes here, so people can decide whether to open it.",
    tags: ["Game Dev"],
    body: [
      "Placeholder: the first paragraph of the post. Write it as plain text here, one string per paragraph.",
      "Placeholder: a second paragraph. Add as many as you need."
    ]
  },
  {
    title: "Placeholder: a second post",
    date: "2026-10-01",
    summary: "Another teaser. Posts are sorted newest first, so the order you list them in doesn't matter.",
    tags: ["Software", "Notes"],
    body: [
      "Placeholder: the body of the second post."
    ]
  }
];

/* Relies on colorForTag() and TYPE_COLORS from app.js, which loads first. */
function formatPostDate(iso){
  // Parsed as UTC and printed as UTC so the date never shifts by a day with timezone
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  });
}

function renderPosts(){
  const list = document.getElementById('postList');
  if (!list) return;

  if (!POSTS.length) {
    list.innerHTML = '<p class="post-empty">No posts yet. Check back soon.</p>';
    return;
  }

  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted.map(post => {
    const tags = (post.tags || []).map(t => {
      const c = colorForTag(t, TYPE_COLORS);
      return `<span class="tag tag-type" style="--tag-color:${c};">${t}</span>`;
    }).join('');

    return `<details class="post-card">
      <summary>
        <time class="post-date" datetime="${post.date}">${formatPostDate(post.date)}</time>
        <h2 class="post-title">${post.title}</h2>
        <span class="post-summary">${post.summary}</span>
        <span class="post-footer">
          <span class="post-tags">${tags}</span>
          <span class="post-toggle" aria-hidden="true"></span>
        </span>
      </summary>
      <div class="post-body">${post.body.map(p => `<p>${p}</p>`).join('')}</div>
    </details>`;
  }).join('');
}

renderPosts();