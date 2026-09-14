/* =========================================================================
   EDIT ME — all personal info lives here. Update this block and everything
   on the page (nav, hero, contact) updates with it.
   ========================================================================= */
const SITE_CONFIG = {
  name: "Henri M",
  role: "Software Developer",
  heroHeadline: "Hi, I'm Henri M.",
  heroIntro: "I build web and mobile products end to end — from the first sketch of an idea to the backend that keeps it running at 2am. I like clean interfaces, fast APIs, and code that's still easy to read in a year.",
  contactIntro: "Open to new roles and interesting problems. The fastest way to reach me is email — I try to reply within a day or two.",
  email: "hello@example.com",
  linkedinUrl: "https://linkedin.com/in/your-handle",
  linkedinDisplay: "linkedin.com/in/your-handle",
  githubUrl: "https://github.com/your-handle",
  githubDisplay: "github.com/your-handle"
};

/* =========================================================================
   EDIT ME — your projects. Add, remove, or edit entries freely.
   - languages: shown as solid color tags
   - types: shown as outlined tags (e.g. "Web App", "Mobile App", "API",
     "CLI Tool", "Game", "Library")
   - image: optional. Leave blank to use the generated abstract cover, or
     set to a real screenshot path/URL, e.g. "images/project1.png"
   ========================================================================= */
const PROJECTS = [
  {
    title: "Fleet Tracker",
    description: "Real-time dashboard for tracking delivery vehicles across a city, with live ETAs and route replay.",
    languages: ["TypeScript", "React"],
    types: ["Web App"],
    image: ""
  },
  {
    title: "Recipe Radar",
    description: "Point your camera at your fridge and get recipe suggestions from what's actually in it, on-device.",
    languages: ["Swift"],
    types: ["Mobile App"],
    image: ""
  },
  {
    title: "Pixel Forge",
    description: "A fast command-line image pipeline for batch resizing, compression, and format conversion.",
    languages: ["Rust"],
    types: ["CLI Tool"],
    image: ""
  },
  {
    title: "Marketplace API",
    description: "The backend powering a two-sided marketplace: auth, payments, search, and webhooks for 40k+ users.",
    languages: ["Python"],
    types: ["API"],
    image: ""
  },
  {
    title: "Study Buddy",
    description: "Collaborative study rooms with shared notes, flashcards, and a spaced-repetition scheduler.",
    languages: ["TypeScript", "React"],
    types: ["Web App"],
    image: ""
  },
  {
    title: "Terrain Gen",
    description: "A procedural terrain generator with erosion simulation, rendered in real time.",
    languages: ["C++"],
    types: ["Game"],
    image: ""
  }
];

/* ---------- Tag colors (extend freely — anything unlisted gets a
   consistent auto-generated color, so new tags never look broken) ---------- */
const LANG_COLORS = {
  "JavaScript": "#E8C34E",
  "TypeScript": "#6C8EBF",
  "Python": "#4FB3A9",
  "Swift": "#E8845D",
  "Rust": "#C97B63",
  "C++": "#9B87C4",
  "Go": "#5BAF8C",
  "Java": "#D98E5A"
};
const TYPE_COLORS = {
  "Web App": "#7FB3B0",
  "Mobile App": "#C98BA6",
  "API": "#8AA6C9",
  "CLI Tool": "#C9A46A",
  "Game": "#A98BC9",
  "Library": "#8AC98F"
};
function colorForTag(tag, map){
  if (map[tag]) return map[tag];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 42%, 58%)`;
}

const TYPE_ICONS = {
  "Web App": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18"/><circle cx="6" cy="6" r=".5" fill="currentColor"/><circle cx="8.5" cy="6" r=".5" fill="currentColor"/></svg>',
  "Mobile App": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  "CLI Tool": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3"/><path d="M12 15h5"/></svg>',
  "API": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="4" rx="1"/><rect x="4" y="10" width="16" height="4" rx="1"/><rect x="4" y="16" width="16" height="4" rx="1"/></svg>',
  "Game": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 10h4M8 8v4"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="18.5" cy="11.5" r="1" fill="currentColor" stroke="none"/><rect x="2" y="7" width="20" height="10" rx="5"/></svg>',
  "Library": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/></svg>'
};
const DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 4L4 12l4 8M16 4l4 8-4 8"/></svg>';

/* ---------- Load each section's HTML fragment into its <section> shell ----------
   NOTE: fetch() of local files is blocked by the browser under file:// (CORS).
   Run this through a local server (e.g. `python3 -m http.server`) or a real
   host (GitHub Pages, Netlify, etc.) — see README.md. ---------- */
const SECTION_FILES = {
  home: "sections/home.html",
  work: "sections/work.html",
  contact: "sections/contact.html"
};

async function loadSections(){
  await Promise.all(Object.entries(SECTION_FILES).map(async ([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(`Failed to load ${url}:`, err);
      el.innerHTML = `<div class="wrap"><p style="color:var(--text-muted)">
        Couldn't load <code>${url}</code>. If you're opening index.html directly from disk,
        the browser blocks this — run a local server instead (see README.md).
      </p></div>`;
    }
  }));
}

function renderProjects(){
  const list = document.getElementById('projectList');
  if (!list) return;
  list.innerHTML = PROJECTS.map(p => {
    const primaryColor = colorForTag(p.languages[0] || p.types[0] || "?", LANG_COLORS);
    const iconMarkup = TYPE_ICONS[p.types[0]] || DEFAULT_ICON;
    const thumb = p.image
      ? `<div class="project-thumb project-thumb-img"><img src="${p.image}" alt="${p.title} screenshot"></div>`
      : `<div class="project-thumb project-thumb-generated" style="background: linear-gradient(150deg, ${primaryColor}55, #1B242C 75%); color:${primaryColor};">${iconMarkup}</div>`;

    const langTags = p.languages.map(l => {
      const c = colorForTag(l, LANG_COLORS);
      return `<span class="tag tag-lang" style="background:${c};">${l}</span>`;
    }).join('');
    const typeTags = p.types.map(t => {
      const c = colorForTag(t, TYPE_COLORS);
      return `<span class="tag tag-type" style="--tag-color:${c};">${t}</span>`;
    }).join('');

    return `<article class="project-card">
      ${thumb}
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">${langTags}${typeTags}</div>
      </div>
    </article>`;
  }).join('');
}

function applyConfig(){
  document.title = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };

  set('navName', el => el.innerHTML = SITE_CONFIG.name.replace(' ', '<span>.</span>'));
  set('heroRole', el => el.textContent = SITE_CONFIG.role);
  set('heroName', el => el.textContent = SITE_CONFIG.heroHeadline);
  set('heroIntro', el => el.textContent = SITE_CONFIG.heroIntro);
  set('contactIntro', el => el.textContent = SITE_CONFIG.contactIntro);
  set('footerName', el => el.textContent = SITE_CONFIG.name);
  set('footerYear', el => el.textContent = '© ' + new Date().getFullYear());

  set('emailRow', el => el.href = `mailto:${SITE_CONFIG.email}`);
  set('emailValue', el => el.textContent = SITE_CONFIG.email);
  set('linkedinRow', el => el.href = SITE_CONFIG.linkedinUrl);
  set('linkedinValue', el => el.textContent = SITE_CONFIG.linkedinDisplay);
  set('githubRow', el => el.href = SITE_CONFIG.githubUrl);
  set('githubValue', el => el.textContent = SITE_CONFIG.githubDisplay);
}

function initSceneSwitcher(){
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) document.body.setAttribute('data-scene', entry.target.id);
    });
  }, { root: null, threshold: 0, rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => observer.observe(s));
}

(async function init(){
  await loadSections();
  applyConfig();
  renderProjects();
  initSceneSwitcher();
})();