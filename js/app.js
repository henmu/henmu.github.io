/* =========================================================================
   EDIT ME — all personal info lives here. Update this block and everything
   on the page (nav, hero, contact) updates with it.
   ========================================================================= */
const SITE_CONFIG = {
  name: "Henri Mursu",
  role: "Software Developer",
  heroHeadline: "Hi, I'm Henri Mursu.",
  heroIntro: "I build web and mobile products end to end — from the first sketch of an idea to the backend that keeps it running at 2am. I like clean interfaces, fast APIs, and code that's still easy to read in a year. I build web, mobile, and game products end to end. From the first nugget of an idea to the backend that keeps it running. I like to think of the end users experience and build products that are easy to use, fast, and reliable.",
  contactIntro: "Open to new roles and interesting problems. The fastest way to reach me is email. I try to reply within a day or two.",
  email: "henri.mursu@gmail.com",
  linkedinUrl: "https://linkedin.com/in/henmu",
  linkedinDisplay: "linkedin.com/in/henmu",
  githubUrl: "https://github.com/henmu",
  githubDisplay: "github.com/henmu"
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
    title: "Slipmark",
    description: "Mozilla Firefox extension for saving and organizing bookmarks, where the url is not the only thing that matters.",
    languages: ["Javascript", "React"],
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

/* =========================================================================
   EDIT ME — short "how I think / how I work" blocks shown on the home
   page below the hero. Add, remove, or rewrite freely — each one just
   needs a title and a body paragraph.
   ========================================================================= */
const ABOUT_ITEMS = [
  {
    title: "How I Approach Problems",
    body: "Replace this with a short paragraph about another part of how you think or work — how you debug, how you learn new tools, how you like to collaborate, or anything else worth knowing before someone reads your projects. Add as many of these blocks as you want; each just needs a title and a paragraph."
  }
];

/* =========================================================================
   EDIT ME — same idea as ABOUT_ITEMS above, but split by "hat": one set
   of cards for how you talk about yourself as a software developer, one
   for game development. Add, remove, or rewrite freely.
   ========================================================================= */
const ABOUT_SOFTWARE = [
  {
    title: "What I Build",
    body: "Replace with the kind of software you like building — web apps, backend systems, dev tools, whatever's true for you."
  },
  {
    title: "How I Work",
    body: "Replace with your working style as a software developer — architecture-first, test-driven, iterative, whatever actually fits."
  }
];
const ABOUT_GAME = [
  {
    title: "What I Make",
    body: "Replace with the kind of games, genres, or engines you work with — Unity, Godot, game jams, solo projects, whatever's true for you."
  }
];

/* =========================================================================
   EDIT ME — the two "How I Experience Imagination" essays, one per hat.
   Shape: { intro: [paragraphs with no heading], chapters: [{ heading,
   paragraphs }] }. Everything renders fully visible and in order — intro
   first, then each chapter with its own subheading — so a reader can
   skim the headings without anything being hidden or collapsed.
   FEATURE_GAME's text is yours, unedited, just split into chapters.
   FEATURE_SOFTWARE is a short first draft — rewrite it in your own voice
   whenever you're ready.
   ========================================================================= */
const FEATURE_SOFTWARE = {
  intro: [
    "On the software side, aphantasia shows up differently — less as a source of joy and more as a practical constraint I've had to design around. When I'm reasoning through an architecture or a data flow, there's no mental picture to check it against, so I have to make the system visible some other way — diagrams, written specs, small runnable prototypes — before I trust it.",
    "This has pushed me toward a fairly deliberate, externalize-everything style of working. I sketch things out early rather than holding a design in my head, and I lean on tests and small, verifiable steps instead of trying to picture the whole system running before I've built it. Software rewards this in a way: the real source of truth is the code itself, not what's in anyone's head, so the habit of writing things down early has mostly worked in my favor.",
    "Where it's harder is anything visual — UI work, layout, design decisions — for reasons similar to what I describe on the game development side. I can know what I want something to accomplish without being able to picture what it should look like, so I lean more on iteration, references, and feedback than on getting it right from imagination alone."
  ],
  chapters: []
};

const FEATURE_GAME = {
  intro: [
    "In recent years, I discovered that I have aphantasia — I don't form visual images in my mind. I understand now that this may be part of why I've always been so drawn to games, films, and other visual media. They allow me to experience thoughts and ideas brought to life in a way that I can actually see.",
    "I think this is also part of why I get so easily absorbed into games and films. When I'm playing a story-driven game, I tend to immerse myself in what is happening and enjoy the moment rather than think ahead about what might happen next. I often put myself into the character and make choices based on what I would personally do. In Baldur's Gate 3, for example, I've always played as the good guy, saving the Grove and never allying with the goblins. I generally follow my own moral code rather than choosing whatever would be most advantageous in the game.",
    "That doesn't mean I approach every type of game this way. In more systems-driven games such as Shapez and Cities: Skylines, I can become just as absorbed, but in a different way. I enjoy figuring out how the systems work and trying to optimize them. Survival crafting games such as Minecraft and Valheim are a little different again. I enjoy them, but not being able to visualize what I want to build can be frustrating. I've sometimes found myself envying people who can seemingly picture a building or structure in their head and then simply build it. And perhaps unsurprisingly, all this immersion also means I can get scared surprisingly easily by things like jump scares."
  ],
  chapters: [
    {
      heading: "Me as a Storyteller",
      paragraphs: [
        "I also wonder if aphantasia is connected to how much I enjoy coming up with stories and game ideas. I have a lot of little premises, mechanics, characters, and situations that I keep turning over in my head. I enjoy thinking about where an idea could go, what might happen next, or what kind of game could be built around it. I've also played TTRPGs, and I've found that I enjoy being the DM more than being a player. I like coming up with the situations and stories for other people to experience and seeing what they do with them.",
        "I've always wanted to be a storyteller, and games feel like the medium that makes the most sense for me. If a story is written as black on white, other people can enjoy it through the words, but I don't experience it in quite the same way. Games give me a way to turn those ideas into something I can actually see and experience. Making games lets me take that one step further and try to create those experiences for other people too."
      ]
    },
    {
      heading: "Me as a Game Developer",
      paragraphs: [
        "At the same time, aphantasia has been a significant challenge in my own game projects. I can have an idea of what something should be or how it should feel without being able to picture exactly what it looks like. This can make things like coming up with visuals and UI particularly difficult, as well as describing what I have in mind to others. I'm still learning how to work with these challenges and find the approaches and tools that work best for me. It's an ongoing process, and experimentation is a big part of figuring it out.",
        "What makes game development feel like such a natural creative outlet for me is that visuals are only one part of making a game. There is programming, gameplay, interactions, systems, storytelling, sound, and many other parts of the process. I don't need to be able to picture the entire finished game to be part of bringing it to life.",
        "For me, games have been a way to experience worlds and ideas visually for years, and now I get to try creating them myself."
      ]
    }
  ]
};

function renderAboutGrid(containerId, items){
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="about-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </div>
  `).join('');
}

function renderFeature(containerId, feature){
  const el = document.getElementById(containerId);
  if (!el) return;
  const introHtml = feature.intro.map(p => `<p>${p}</p>`).join('');
  const chaptersHtml = feature.chapters.map(ch => `
    <h4 class="feature-chapter-heading">${ch.heading}</h4>
    ${ch.paragraphs.map(p => `<p>${p}</p>`).join('')}
  `).join('');
  el.innerHTML = introHtml + chaptersHtml;
}

function renderAbout(){
  renderAboutGrid('aboutGrid', ABOUT_ITEMS);
  renderAboutGrid('aboutGridSoftware', ABOUT_SOFTWARE);
  renderAboutGrid('aboutGridGame', ABOUT_GAME);
  renderFeature('featureSoftwareBody', FEATURE_SOFTWARE);
  renderFeature('featureGameBody', FEATURE_GAME);
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

function scrollToggleUnderHeader(){
  const header = document.querySelector('.site-nav');
  const toggle = document.querySelector('.persona-toggle-wrap');
  if (!header || !toggle) return;
  const headerHeight = header.getBoundingClientRect().height;
  const targetTop = toggle.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: Math.max(targetTop, 0), behavior: reduceMotion ? 'auto' : 'smooth' });
}

function initPersonaToggle(){
  const buttons = document.querySelectorAll('.persona-toggle-btn');
  const panels = document.querySelectorAll('.persona-panel');
  if (!buttons.length || !panels.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const persona = btn.dataset.persona;
      buttons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      panels.forEach(p => { p.hidden = p.dataset.persona !== persona; });
      scrollToggleUnderHeader();
    });
  });
}

(async function init(){
  await loadSections();
  applyConfig();
  renderAbout();
  renderProjects();
  initPersonaToggle();
})();

