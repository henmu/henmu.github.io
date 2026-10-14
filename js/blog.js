/* =========================================================================
   EDIT ME — your blog posts. Add, remove, or edit entries freely.
   - title:   post title
   - date:    "YYYY-MM-DD" (posts are shown newest first)
   - summary: one or two sentences, shown on the card
   - tags:    shown as outlined tags (colours are picked automatically)
   - body:    the full post, one string per paragraph. Shown in the popup when
              the card is clicked. Plain text; HTML such as <em> or
              <a href="..."> works.
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

/* Relies on colorForTag(), TYPE_COLORS, showDialog(), initDialog() and
   bindCardActivation() from app.js, which loads first. */
const sortedPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

function formatPostDate(iso){
  // Parsed as UTC and printed as UTC so the date never shifts by a day with timezone
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  });
}

function buildPostTags(post){
  return (post.tags || []).map(t => {
    const c = colorForTag(t, TYPE_COLORS);
    return `<span class="tag tag-type" style="--tag-color:${c};">${t}</span>`;
  }).join('');
}

function renderPosts(){
  const list = document.getElementById('postList');
  if (!list) return;

  if (!sortedPosts.length) {
    list.innerHTML = '<p class="post-empty">No posts yet. Check back soon.</p>';
    return;
  }

  list.innerHTML = sortedPosts.map((post, i) => `
    <article class="post-card" role="button" tabindex="0" aria-haspopup="dialog"
        aria-label="${post.title} — read post" data-index="${i}">
      <time class="post-date" datetime="${post.date}">${formatPostDate(post.date)}</time>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-summary">${post.summary}</p>
      <div class="post-tags">${buildPostTags(post)}</div>
    </article>
  `).join('');
}

function openPost(index){
  const post = sortedPosts[index];
  const dlg = document.getElementById('postModal');
  if (!post || !dlg) return;

  const date = dlg.querySelector('.modal-date');
  date.textContent = formatPostDate(post.date);
  date.setAttribute('datetime', post.date);
  dlg.querySelector('.modal-title').textContent = post.title;
  dlg.querySelector('.modal-tags').innerHTML = buildPostTags(post);
  dlg.querySelector('.modal-text').innerHTML = post.body.map(p => `<p>${p}</p>`).join('');
  dlg.querySelector('.modal-inner').scrollTop = 0;
  showDialog(dlg);
}

function initPostModal(){
  const dlg = document.getElementById('postModal');
  const list = document.getElementById('postList');
  if (!dlg || !list) return;
  bindCardActivation(list, '.post-card', openPost);
  initDialog(dlg);
}

renderPosts();
initPostModal();