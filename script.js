/* ═══════════════════════════════════════════════════════════════
   Richard Feynman Showcase — script.js
   Three.js · GSAP · Chart.js · CountUp · Custom interactions
═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── Register GSAP Plugins ───────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── DATA ────────────────────────────────────────────────────────

const TIMELINE_EVENTS = [
  { year: '1918', title: 'Born in Far Rockaway', desc: 'Richard Phillips Feynman born on May 11 in Far Rockaway, Queens, New York, to Melville and Lucille Feynman.', icon: '🍼', color: '#22d3ee' },
  { year: '1935', title: 'MIT Undergraduate', desc: 'Enrolled at MIT to study mathematics, then switched to physics. His exceptional mathematical ability was immediately apparent.', icon: '🎓', color: '#a855f7' },
  { year: '1939', title: 'MIT Graduate', desc: 'Graduated from MIT with a perfect score on the Princeton entrance exam for physics and mathematics — a rare feat.', icon: '📜', color: '#3b82f6' },
  { year: '1942', title: 'Princeton PhD', desc: 'Completed his doctoral dissertation "The Principle of Least Action in Quantum Mechanics" under John Archibald Wheeler.', icon: '⚡', color: '#f59e0b' },
  { year: '1943', title: 'Manhattan Project', desc: 'Joined the theoretical division at Los Alamos under Hans Bethe. Became famous for cracking safes and bypassing security just to prove it could be done.', icon: '☢', color: '#ef4444' },
  { year: '1948', title: 'Path Integral Formulation', desc: 'Developed a revolutionary new approach to quantum mechanics using path integrals, fundamentally changing how physicists understood quantum systems.', icon: '∫', color: '#22d3ee' },
  { year: '1950', title: 'Caltech Professor', desc: 'Joined the California Institute of Technology as a full professor, where he would remain for the rest of his career.', icon: '🏛', color: '#10b981' },
  { year: '1965', title: 'Nobel Prize in Physics', desc: 'Awarded the Nobel Prize in Physics jointly with Julian Schwinger and Sin-Itiro Tomonaga for work in quantum electrodynamics (QED).', icon: '🏆', color: '#f59e0b' },
  { year: '1968', title: 'Feynman Lectures Published', desc: 'The Feynman Lectures on Physics, based on his undergraduate courses, published in collected form — still considered the finest physics textbook ever written.', icon: '📚', color: '#a855f7' },
  { year: '1986', title: 'Challenger Investigation', desc: 'Appointed to the Rogers Commission investigating the Space Shuttle Challenger disaster. His famous O-ring demonstration became one of science\'s most memorable moments.', icon: '🚀', color: '#f43f5e' },
  { year: '1988', title: 'Passed Away', desc: 'Richard Feynman died on February 15, 1988, in Los Angeles, of kidney cancer. His final words: "I\'d hate to die twice. It\'s so boring."', icon: '⭐', color: '#94a3b8' },
];

const CONTRIBUTIONS = [
  {
    title: 'Quantum Electrodynamics (QED)',
    icon: '⚡',
    color: '#22d3ee',
    desc: 'Developed the most precisely tested theory in physics, describing how light and matter interact with unprecedented accuracy.',
    detail: 'QED predicts the anomalous magnetic moment of the electron to 12 decimal places — confirmed experimentally. The theory earned Feynman, Schwinger, and Tomonaga the 1965 Nobel Prize.',
    impact: 98,
    significance: 'Foundational to modern particle physics and all of quantum field theory.',
  },
  {
    title: 'Feynman Diagrams',
    icon: '🔀',
    color: '#a855f7',
    desc: 'Invented a visual language for calculating quantum interactions — transforming intractable equations into intuitive pictures.',
    detail: 'Every particle physics paper uses Feynman diagrams. They show how particles exchange forces via virtual particles, making quantum calculations tractable and understandable.',
    impact: 96,
    significance: 'Used in every modern particle physics calculation.',
  },
  {
    title: 'Path Integral Formulation',
    icon: '∫',
    color: '#3b82f6',
    desc: 'Created an alternative formulation of quantum mechanics where particles travel all possible paths simultaneously.',
    detail: 'The path integral (sum over histories) reformulates quantum mechanics in terms of the principle of least action. It unified quantum mechanics with special relativity and became essential in quantum gravity research.',
    impact: 94,
    significance: 'Enables quantum field theory and quantum gravity research.',
  },
  {
    title: 'Superfluid Helium Research',
    icon: '💧',
    color: '#10b981',
    desc: 'Explained the quantum mechanical origin of superfluidity in helium-4, clarifying a mysterious macroscopic quantum phenomenon.',
    detail: 'Feynman used quantum mechanics to explain why helium flows without viscosity below 2.17K. He showed superfluidity is a macroscopic quantum coherence effect — a precursor to our understanding of Bose-Einstein condensates.',
    impact: 85,
    significance: 'Foundation for understanding quantum matter and BEC.',
  },
  {
    title: 'Quantum Computing Foundations',
    icon: '💻',
    color: '#f59e0b',
    desc: 'Proposed (1981) that quantum computers could simulate nature in ways classical computers fundamentally cannot.',
    detail: '"Nature isn\'t classical, dammit, and if you want to make a simulation of nature, you\'d better make it quantum mechanical." This 1981 lecture at MIT essentially founded the field of quantum computing.',
    impact: 92,
    significance: 'Inspired the entire field of quantum computing.',
  },
  {
    title: 'Parton Model',
    icon: '🔬',
    color: '#f43f5e',
    desc: 'Proposed that protons and neutrons are made of point-like constituents called partons — later identified as quarks and gluons.',
    detail: 'In 1969, Feynman\'s parton model explained deep inelastic scattering experiments at SLAC. His partons were later identified as quarks, providing critical evidence for quantum chromodynamics (QCD).',
    impact: 89,
    significance: 'Led to the discovery of quarks and the Standard Model.',
  },
];

const QUOTES = [
  { text: 'What I cannot create, I do not understand.', context: 'Written on his Caltech blackboard, found after his death in 1988.' },
  { text: 'The pleasure of finding things out.', context: 'Title of a 1981 BBC Horizon documentary — his personal philosophy of science.' },
  { text: 'I would rather have questions that can\'t be answered than answers that can\'t be questioned.', context: 'Reflecting his deep commitment to scientific skepticism.' },
  { text: 'Physics is like sex: sure, it may give some practical results, but that\'s not why we do it.', context: 'Characteristic Feynman humor about the joy of pure science.' },
  { text: 'Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.', context: 'Advice to young scientists — the Feynman method.' },
  { text: 'I learned very early the difference between knowing the name of something and knowing something.', context: 'From "Surely You\'re Joking, Mr. Feynman!" — on real understanding vs rote learning.' },
];

const BOOKS = [
  { title: 'Surely You\'re Joking, Mr. Feynman!', year: 1985, color: '#f59e0b', desc: 'A collection of adventures and anecdotes revealing Feynman\'s irrepressible curiosity — safe-cracking, bongo drumming, and Nobel prizes.', emoji: '😄', genre: 'Memoir/Anecdotes' },
  { title: 'The Feynman Lectures on Physics', year: 1964, color: '#22d3ee', desc: 'Three volumes capturing Feynman\'s legendary undergraduate physics course at Caltech. Widely regarded as the finest physics textbook ever written.', emoji: '⚛', genre: 'Physics Textbook' },
  { title: 'QED: The Strange Theory of Light and Matter', year: 1985, color: '#a855f7', desc: 'A masterwork of science communication — quantum electrodynamics explained without a single equation, just arrows and pictures.', emoji: '✦', genre: 'Popular Science' },
  { title: 'What Do You Care What Other People Think?', year: 1988, color: '#f43f5e', desc: 'Stories including his relationship with his first wife Arline, his time on the Challenger commission, and meditations on science and society.', emoji: '❤', genre: 'Memoir/Science' },
];

const FUN_FACTS = [
  { emoji: '🥁', title: 'Bongo Drummer', desc: 'Feynman was a skilled bongo and frigideira player, regularly performing at clubs in Pasadena. He loved Brazilian music after spending time in Rio de Janeiro.' },
  { emoji: '🔓', title: 'Safe Cracker', desc: 'At Los Alamos, he cracked safes containing nuclear secrets — not to steal them, but to demonstrate that security was inadequate. He left notes inside to prove it.' },
  { emoji: '🎨', title: 'Visual Artist', desc: 'Published drawings under the pseudonym "Ofey." His sketches and portraits were exhibited in galleries. He said drawing helped him see physics differently.' },
  { emoji: '🧩', title: 'Puzzle Master', desc: 'Feynman loved puzzles of every kind — from mathematical challenges to cracking codes, working combination locks, and devising visual proofs of complex theorems.' },
  { emoji: '🌎', title: 'Language Learner', desc: 'Learned Portuguese while visiting Brazil and gave entire physics lectures in Portuguese within months. He had a gift for seeing patterns in any system.' },
  { emoji: '🤔', title: '"Feynman Technique"', desc: 'His teaching philosophy: explain any concept as if to a 12-year-old. If you can\'t do it simply, you don\'t truly understand it. Now used in education worldwide.' },
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Nobel Laureate', desc: 'Physics, 1965', color: '#f59e0b' },
  { icon: '⚡', title: 'QED Pioneer', desc: 'Founded quantum electrodynamics', color: '#22d3ee' },
  { icon: '📊', title: 'Diagram Inventor', desc: 'Created Feynman diagrams', color: '#a855f7' },
  { icon: '💻', title: 'Quantum Computing', desc: 'Proposed quantum computers', color: '#3b82f6' },
  { icon: '📚', title: 'Master Educator', desc: 'Legendary Caltech lectures', color: '#10b981' },
  { icon: '🔓', title: 'Safe Cracker', desc: 'Los Alamos security bypass', color: '#f59e0b' },
  { icon: '🎨', title: 'Artist & Musician', desc: 'Bongos, drawing, creativity', color: '#f43f5e' },
  { icon: '🚀', title: 'Challenger Hero', desc: 'O-ring demonstration', color: '#ef4444' },
];

// ─── LOADER ──────────────────────────────────────────────────────

function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      delay: 2,
      onComplete: () => {
        loader.style.display = 'none';
        initHeroAnimations();
        initAchievements();
      }
    });
  }, 100);
}

// ─── CURSOR ──────────────────────────────────────────────────────

function initCursor() {
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const follower = document.createElement('div');
  follower.id = 'cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale on hover
  document.querySelectorAll('a, button, .timeline-card, .contribution-card, .book-card-wrapper').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3 });
      gsap.to(follower, { scale: 0.5, opacity: 0.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });
}

// ─── THREE.JS PARTICLE BACKGROUND ────────────────────────────────

function initThreeBackground() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // Stars (small white dots)
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1200;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 300;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(starGeo, starMat));

  // Quantum particles (cyan/purple/blue)
  const particleColors = [0x22d3ee, 0xa855f7, 0x3b82f6, 0x10b981];
  const particleGroups = [];

  particleColors.forEach((color, ci) => {
    const geo = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.8, transparent: true, opacity: 0.7 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    particleGroups.push({ points, velocities, positions });
  });

  // Mouse interaction
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Gentle camera sway following mouse
    camera.position.x += (mx * 5 - camera.position.x) * 0.02;
    camera.position.y += (my * 3 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Move particles
    particleGroups.forEach(({ points, velocities, positions }) => {
      const pos = points.geometry.attributes.position.array;
      for (let i = 0; i < velocities.length; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;
        // Wrap around
        if (Math.abs(pos[i * 3]) > 60) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 40) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 30) velocities[i].z *= -1;
      }
      points.geometry.attributes.position.needsUpdate = true;
      // Slow rotation
      points.rotation.y += 0.0003;
      points.rotation.x += 0.0001;
    });

    renderer.render(scene, camera);
  }
  animate();
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  const nav = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / maxScroll) * 100;
    bar.style.width = pct + '%';

    // Navbar style
    if (scrolled > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Back to top
    if (scrolled > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── TYPEWRITER ───────────────────────────────────────────────────

function initTypewriter() {
  const el = document.getElementById('typewriter');
  const texts = [
    'Nobel Laureate',
    'Quantum Electrodynamics Pioneer',
    'Extraordinary Educator',
    'Author & Storyteller',
    'Challenger Disaster Investigator',
    'Bongo Drummer',
    'Safe Cracker',
    'The Great Explainer',
  ];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  type();
}

// ─── HERO ANIMATIONS ─────────────────────────────────────────────

function initHeroAnimations() {
  const tl = gsap.timeline();
  tl.fromTo('.hero-sub-appear', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 })
    .fromTo('.hero-name', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-portrait-wrapper', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }, '-=0.6')
    .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '+=0.3');

  initTypewriter();
}

// ─── SCROLL ANIMATIONS (GSAP ScrollTrigger) ───────────────────────

function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Stat cards
  gsap.utils.toArray('.stat-card').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 30, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.08,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '#stats', start: 'top 80%', onEnter: () => initCounters() }
    });
  });

  // Contribution cards
  gsap.utils.toArray('.contribution-card').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#contributions', start: 'top 75%' }
    });
  });

  // Fun facts
  gsap.utils.toArray('.funfact-card').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, scale: 0.8 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: i * 0.08,
      scrollTrigger: { trigger: '#funfacts', start: 'top 80%' }
    });
  });

  // Nobel section
  gsap.fromTo('.nobel-medal-wrapper', { opacity: 0, scale: 0.5, rotation: -30 }, {
    opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)',
    scrollTrigger: { trigger: '#nobel', start: 'top 75%' }
  });

  // Charts
  ScrollTrigger.create({
    trigger: '#charts',
    start: 'top 80%',
    onEnter: () => initCharts(),
    once: true
  });

  // Map markers
  ScrollTrigger.create({
    trigger: '#legacy',
    start: 'top 80%',
    onEnter: () => animateMapMarkers(),
    once: true
  });
}

// ─── COUNTUP ANIMATIONS ───────────────────────────────────────────

let countersInit = false;
function initCounters() {
  if (countersInit) return;
  countersInit = true;

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const countUp = new countUp.CountUp(el, target, {
      duration: 2.5,
      suffix,
      useGrouping: false,
    });
    if (!countUp.error) countUp.start();
  });
}

// ─── TIMELINE ────────────────────────────────────────────────────

function buildTimeline() {
  const track = document.getElementById('timeline-track');
  track.innerHTML = '';

  TIMELINE_EVENTS.forEach((ev, i) => {
    const card = document.createElement('div');
    card.className = 'timeline-card glass-card rounded-2xl p-5 border border-white/5';
    card.style.cssText = `min-width:200px; max-width:230px;`;
    card.innerHTML = `
      <div class="text-3xl mb-3">${ev.icon}</div>
      <div class="text-xs font-mono mb-1" style="color:${ev.color}">${ev.year}</div>
      <h4 class="font-bold text-white text-sm mb-2" style="font-family:'Syne',sans-serif;">${ev.title}</h4>
      <div class="card-expand">
        <p class="text-gray-400 text-xs leading-relaxed mt-2">${ev.desc}</p>
      </div>
      <div class="timeline-dot" style="background:${ev.color}; box-shadow:0 0 10px ${ev.color}"></div>
    `;

    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('active'));
      if (!wasActive) card.classList.add('active');
    });

    track.appendChild(card);
  });

  // Draggable scroll
  const container = document.getElementById('timeline-scroll');
  let isDown = false, startX, scrollLeft;
  container.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener('mouseleave', () => isDown = false);
  container.addEventListener('mouseup', () => isDown = false);
  container.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX);
  });
}

// ─── CONTRIBUTIONS SECTION ────────────────────────────────────────

function buildContributions() {
  const grid = document.getElementById('contributions-grid');
  grid.innerHTML = '';

  CONTRIBUTIONS.forEach(c => {
    const card = document.createElement('div');
    card.className = 'contribution-card glass-card rounded-2xl p-6 border border-white/5';
    card.innerHTML = `
      <div class="text-3xl mb-4">${c.icon}</div>
      <h3 class="font-bold text-white mb-2" style="font-family:'Syne',sans-serif;">${c.title}</h3>
      <p class="text-gray-400 text-sm leading-relaxed mb-4">${c.desc}</p>
      <div class="card-hover-info">
        <p class="text-gray-300 text-xs leading-relaxed mb-3">${c.detail}</p>
        <div class="text-xs text-gray-500 font-mono mb-2">Impact Score: ${c.impact}/100</div>
        <div class="h-1 rounded bg-white/10 mb-3">
          <div class="impact-bar-fill h-full" style="width:${c.impact}%"></div>
        </div>
        <div class="text-xs text-gray-500 italic">${c.significance}</div>
      </div>
    `;
    card.style.borderLeft = `3px solid ${c.color}`;
    grid.appendChild(card);
  });
}

// ─── FEYNMAN DIAGRAM VISUALIZER ───────────────────────────────────

function initFeynmanVisualizer() {
  const canvas = document.getElementById('feynman-canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();

  const diagrams = {
    electron: {
      title: 'Electron-Electron Scattering',
      desc: 'Two electrons approach each other, exchange a virtual photon (the wavy line), and repel. This is the fundamental electromagnetic interaction described by QED. Feynman diagrams turned complex quantum calculations into intuitive visual tools.',
      draw: drawElectronScattering,
    },
    photon: {
      title: 'Photon-Electron Scattering (Compton)',
      desc: 'A photon collides with an electron, transferring momentum and energy. The electron absorbs and re-emits the photon at a different angle. This Compton scattering demonstrates the particle nature of light.',
      draw: drawPhotonExchange,
    },
    pair: {
      title: 'Electron-Positron Pair Production',
      desc: 'A high-energy photon spontaneously produces an electron-positron pair. This stunning process converts pure energy (E=mc²) into matter and antimatter — a direct consequence of quantum field theory.',
      draw: drawPairProduction,
    },
  };

  let animFrame = null;
  let currentDiagram = 'electron';
  let t = 0;

  function drawElectronScattering(w, h) {
    const cx = w / 2;
    const progress = (Math.sin(t * 0.02) + 1) / 2;

    // Left incoming electron
    const e1x = 60 + progress * (cx - 60 - 30);
    const e1y = h * 0.3;
    // Right incoming electron
    const e2x = w - 60 - progress * (w - 60 - cx - 30);
    const e2y = h * 0.7;

    // Vertex positions
    const v1x = cx - 30, v1y = h * 0.35;
    const v2x = cx + 30, v2y = h * 0.65;

    // Outgoing
    const o1x = cx - 30 + progress * 100, o1y = h * 0.15;
    const o2x = cx + 30 - progress * 100, o2y = h * 0.85;

    // Draw incoming electrons (solid lines with arrows)
    ctx.clearRect(0, 0, w, h);

    // Grid background
    ctx.strokeStyle = 'rgba(34,211,238,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Left e- path
    drawFermionLine(ctx, 60, e1y, e1x, e1y, '#22d3ee', 'e⁻', true);
    // Right e- path
    drawFermionLine(ctx, w - 60, e2y, e2x, e2y, '#22d3ee', 'e⁻', false);

    if (progress > 0.6) {
      // Outgoing lines
      drawFermionLine(ctx, v1x, v1y, o1x, o1y, '#10b981', 'e⁻', true);
      drawFermionLine(ctx, v2x, v2y, o2x, o2y, '#10b981', 'e⁻', true);
    }

    // Vertex markers
    drawVertex(ctx, v1x, v1y, '#22d3ee');
    drawVertex(ctx, v2x, v2y, '#22d3ee');

    // Photon exchange (wavy)
    drawPhotonLine(ctx, v1x, v1y, v2x, v2y, '#f59e0b', 'γ');

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Space Mono, monospace';
    ctx.fillText('Incoming', 60, h * 0.3 - 14);
    ctx.fillText('Electrons', 60, h * 0.3 - 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Virtual Photon', cx - 40, h / 2 - 12);
  }

  function drawPhotonExchange(w, h) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const p = (Math.sin(t * 0.02) + 1) / 2;

    // Grid
    ctx.strokeStyle = 'rgba(34,211,238,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    const vx = cx, vy = h / 2;
    const phEnd = 60 + p * (cx - 60);
    const eStart = w - 60 - p * (w - 60 - cx);

    drawPhotonLine(ctx, 60, h * 0.3, phEnd, vy, '#f59e0b', 'γ (incoming)');
    drawFermionLine(ctx, eStart, h * 0.7, vx, vy, '#22d3ee', 'e⁻', false);

    if (p > 0.7) {
      drawPhotonLine(ctx, vx, vy, w - 60, h * 0.3, '#a855f7', 'γ (scattered)');
      drawFermionLine(ctx, vx, vy, w - 60, h * 0.8, '#10b981', 'e⁻ (recoil)', true);
    }

    drawVertex(ctx, vx, vy, '#f59e0b');
    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px Space Mono, monospace';
    ctx.fillText('Compton Scattering', cx - 70, 20);
  }

  function drawPairProduction(w, h) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const p = (Math.sin(t * 0.02) + 1) / 2;

    // Grid
    ctx.strokeStyle = 'rgba(34,211,238,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    const vx = cx, vy = h / 2;
    const phEnd = 60 + p * (cx - 60);

    drawPhotonLine(ctx, 60, vy, phEnd, vy, '#f59e0b', 'γ (high energy)');
    drawVertex(ctx, vx, vy, '#f59e0b');

    if (p > 0.5) {
      const spread = (p - 0.5) * 2;
      drawFermionLine(ctx, vx, vy, vx + spread * 120, vy - spread * 80, '#22d3ee', 'e⁻', true);
      drawFermionLine(ctx, vx, vy, vx + spread * 120, vy + spread * 80, '#f43f5e', 'e⁺ (positron)', true);
    }

    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px Space Mono, monospace';
    ctx.fillText('Pair Production: γ → e⁻ + e⁺', cx - 120, 20);
    ctx.fillStyle = '#666';
    ctx.font = '10px monospace';
    ctx.fillText('E = mc²', cx - 20, 35);
  }

  function drawFermionLine(ctx, x1, y1, x2, y2, color, label, arrowAtEnd) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.stroke();

    // Arrow
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const ax = arrowAtEnd ? x2 : mx;
    const ay = arrowAtEnd ? y2 : my;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - 10 * Math.cos(angle - 0.4), ay - 10 * Math.sin(angle - 0.4));
    ctx.lineTo(ax - 10 * Math.cos(angle + 0.4), ay - 10 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    if (label) {
      ctx.fillStyle = color;
      ctx.font = '11px Space Mono, monospace';
      ctx.fillText(label, mx + 6, my - 6);
    }
  }

  function drawPhotonLine(ctx, x1, y1, x2, y2, color, label) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len, ny = dx / len;
    const waves = Math.floor(len / 16);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 0; i <= waves * 10; i++) {
      const tt = i / (waves * 10);
      const px = x1 + dx * tt;
      const py = y1 + dy * tt;
      const amp = 8 * Math.sin(i * Math.PI / 5);
      ctx.lineTo(px + nx * amp, py + ny * amp);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.stroke();

    if (label) {
      const mx = (x1 + x2) / 2 + nx * 16;
      const my = (y1 + y2) / 2 + ny * 16;
      ctx.fillStyle = color;
      ctx.font = '11px Space Mono, monospace';
      ctx.fillText(label, mx - 10, my);
    }
  }

  function drawVertex(ctx, x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function loop() {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    diagrams[currentDiagram].draw(w, h);
    t++;
    animFrame = requestAnimationFrame(loop);
  }

  if (animFrame) cancelAnimationFrame(animFrame);
  loop();

  // Button controls
  document.querySelectorAll('.diagram-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diagram-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDiagram = btn.dataset.diagram;
      const d = diagrams[currentDiagram];
      document.getElementById('diagram-title').textContent = d.title;
      document.getElementById('diagram-desc').textContent = d.desc;
      t = 0;
    });
  });
}

// ─── CHART.JS VISUALIZATIONS ──────────────────────────────────────

let chartsInit = false;
function initCharts() {
  if (chartsInit) return;
  chartsInit = true;

  Chart.defaults.color = '#6b7280';
  Chart.defaults.font.family = "'Space Mono', monospace";
  Chart.defaults.font.size = 11;

  // ── Bar: Publications by Decade
  new Chart(document.getElementById('chart-publications'), {
    type: 'bar',
    data: {
      labels: ["'40s", "'50s", "'60s", "'70s", "'80s"],
      datasets: [{
        label: 'Publications',
        data: [12, 28, 35, 18, 14],
        backgroundColor: [
          'rgba(34,211,238,0.7)', 'rgba(34,211,238,0.8)',
          'rgba(34,211,238,1)',   'rgba(34,211,238,0.6)',
          'rgba(34,211,238,0.5)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }
      },
      animation: { duration: 1500, easing: 'easeOutBounce' }
    }
  });

  // ── Radar: Influence Across Fields
  new Chart(document.getElementById('chart-radar'), {
    type: 'radar',
    data: {
      labels: ['Quantum Physics', 'Education', 'Computing', 'Mathematics', 'Engineering', 'Pop. Science'],
      datasets: [{
        label: 'Feynman Impact',
        data: [100, 95, 85, 90, 78, 92],
        backgroundColor: 'rgba(168,85,247,0.2)',
        borderColor: '#a855f7',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: { display: false },
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#9ca3af', font: { size: 10 } },
          min: 0, max: 100,
        }
      },
      animation: { duration: 1500 }
    }
  });

  // ── Doughnut: Scientific Impact
  new Chart(document.getElementById('chart-doughnut'), {
    type: 'doughnut',
    data: {
      labels: ['QED', 'Diagrams', 'Path Integrals', 'Education', 'Other'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: ['#22d3ee', '#a855f7', '#3b82f6', '#10b981', '#374151'],
        borderColor: '#000',
        borderWidth: 3,
        hoverOffset: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#6b7280', padding: 12, font: { size: 10 } } }
      },
      animation: { duration: 1500 }
    }
  });

  // ── Gauge: Legacy Score (custom via doughnut)
  new Chart(document.getElementById('chart-gauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [98.7, 1.3],
        backgroundColor: ['rgba(34,211,238,1)', 'rgba(255,255,255,0.05)'],
        borderWidth: 0,
        borderRadius: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      circumference: 180,
      rotation: -90,
      cutout: '75%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { duration: 2000, easing: 'easeOutCubic' }
    }
  });
}

// ─── QUOTES CAROUSEL ──────────────────────────────────────────────

function buildQuotes() {
  const container = document.getElementById('quotes-container');
  const dotsEl = document.getElementById('quote-dots');
  let current = 0;
  let autoTimer = null;

  // Set container height
  container.style.position = 'relative';
  container.style.minHeight = '280px';

  QUOTES.forEach((q, i) => {
    const slide = document.createElement('div');
    slide.className = `quote-slide glass-card rounded-3xl ${i === 0 ? 'active' : ''}`;
    slide.innerHTML = `
      <div class="text-center max-w-2xl mx-auto">
        <div class="text-6xl text-cyan-400/30 mb-4" style="font-family:'Playfair Display',serif;">"</div>
        <blockquote class="text-xl md:text-2xl text-white font-light leading-relaxed mb-6" style="font-family:'Playfair Display',serif; font-style:italic;">${q.text}</blockquote>
        <p class="text-gray-500 text-sm font-mono">${q.context}</p>
      </div>
    `;
    container.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = `quote-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(n) {
    const slides = container.querySelectorAll('.quote-slide');
    const dots = dotsEl.querySelectorAll('.quote-dot');
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + QUOTES.length) % QUOTES.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  document.getElementById('prev-quote').addEventListener('click', () => goTo(current - 1));
  document.getElementById('next-quote').addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  autoTimer = setInterval(() => goTo(current + 1), 5000);
  container.addEventListener('mouseenter', () => clearInterval(autoTimer));
  container.addEventListener('mouseleave', () => { autoTimer = setInterval(() => goTo(current + 1), 5000); });
}

// ─── BOOKS SECTION ────────────────────────────────────────────────

function buildBooks() {
  const grid = document.getElementById('books-grid');
  grid.innerHTML = '';

  const bookColors = [
    { bg: '#1a1000', accent: '#f59e0b' },
    { bg: '#001820', accent: '#22d3ee' },
    { bg: '#120020', accent: '#a855f7' },
    { bg: '#200010', accent: '#f43f5e' },
  ];

  BOOKS.forEach((book, i) => {
    const col = bookColors[i];
    const wrapper = document.createElement('div');
    wrapper.className = 'book-card-wrapper';
    wrapper.innerHTML = `
      <div class="book-card-inner">
        <div class="book-face" style="background:${col.bg}; border:1px solid ${col.accent}40;">
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div class="text-5xl mb-4">${book.emoji}</div>
            <div class="text-xs font-mono mb-2" style="color:${col.accent}">${book.year}</div>
            <h3 class="text-white font-bold text-sm leading-tight" style="font-family:'Playfair Display',serif;">${book.title}</h3>
            <div class="mt-3 text-xs font-mono text-gray-600">${book.genre}</div>
          </div>
        </div>
        <div class="book-back">
          <div class="text-2xl mb-3">${book.emoji}</div>
          <h4 class="text-white text-xs font-bold mb-2" style="font-family:'Syne',sans-serif;">${book.title}</h4>
          <p class="text-gray-400 text-xs leading-relaxed">${book.desc}</p>
          <div class="mt-3 text-xs font-mono" style="color:${col.accent}">${book.year} · ${book.genre}</div>
        </div>
      </div>
    `;
    grid.appendChild(wrapper);
  });
}

// ─── CHALLENGER SIMULATION ────────────────────────────────────────

function initChallengerSim() {
  const oringLeft  = document.getElementById('oring-left');
  const oringRight = document.getElementById('oring-right');
  const tempBar    = document.getElementById('temp-bar');
  const tempLabel  = document.getElementById('temp-label');
  const leftExhaust  = document.getElementById('left-exhaust');
  const rightExhaust = document.getElementById('right-exhaust');

  document.getElementById('sim-cold').addEventListener('click', () => {
    // Cold: O-rings turn red/cracked
    gsap.to([oringLeft, oringRight], {
      duration: 1.5,
      attr: { fill: '#ef4444', stroke: '#991b1b', r: 9 },
      ease: 'power2.inOut',
    });
    gsap.to(tempBar, { attr: { width: 16 }, fill: '#ef4444', duration: 1 });
    tempLabel.textContent = '28°F ❄';
    tempLabel.setAttribute('fill', '#ef4444');
    // Exhaust becomes erratic
    gsap.to([leftExhaust, rightExhaust], { attr: { rx: 12, ry: 22 }, fill: '#ff2200', duration: 0.5, yoyo: true, repeat: -1, ease: 'power1.inOut' });
  });

  document.getElementById('sim-warm').addEventListener('click', () => {
    // Normal: green O-rings
    gsap.to([oringLeft, oringRight], {
      duration: 1, attr: { fill: '#22c55e', stroke: '#16a34a', r: 7 },
    });
    gsap.to(tempBar, { attr: { width: 70 }, fill: '#22c55e', duration: 1 });
    tempLabel.textContent = '75°F ☀';
    tempLabel.setAttribute('fill', '#22c55e');
    gsap.killTweensOf([leftExhaust, rightExhaust]);
    gsap.to([leftExhaust, rightExhaust], { attr: { rx: 7, ry: 15 }, fill: '#ff9900', duration: 0.5 });
  });

  document.getElementById('sim-reset').addEventListener('click', () => {
    gsap.killTweensOf([leftExhaust, rightExhaust, oringLeft, oringRight]);
    gsap.to([oringLeft, oringRight], { duration: 0.5, attr: { fill: '#22c55e', stroke: '#16a34a', r: 7 } });
    gsap.to(tempBar, { attr: { width: 16 }, fill: '#ef4444', duration: 0.5 });
    tempLabel.textContent = '28°F';
    tempLabel.setAttribute('fill', '#ef4444');
    gsap.to([leftExhaust, rightExhaust], { attr: { rx: 7, ry: 15 }, fill: '#ff9900', duration: 0.5 });
  });
}

// ─── MAP MARKERS ──────────────────────────────────────────────────

function animateMapMarkers() {
  const markers = document.querySelectorAll('.map-marker');
  gsap.fromTo(markers,
    { scale: 0, opacity: 0, transformOrigin: 'center center' },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.3, ease: 'back.out(1.5)' }
  );
}

// ─── FUN FACTS ────────────────────────────────────────────────────

function buildFunFacts() {
  const grid = document.getElementById('funfacts-grid');
  grid.innerHTML = '';

  FUN_FACTS.forEach(fact => {
    const card = document.createElement('div');
    card.className = 'funfact-card glass-card rounded-2xl p-6 border border-white/5';
    card.innerHTML = `
      <span class="funfact-emoji">${fact.emoji}</span>
      <h4 class="font-bold text-white mt-3 mb-2" style="font-family:'Syne',sans-serif;">${fact.title}</h4>
      <p class="text-gray-400 text-sm leading-relaxed">${fact.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────

function initAchievements() {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';

  ACHIEVEMENTS.forEach((ach, i) => {
    const card = document.createElement('div');
    card.className = 'achievement-card glass-card rounded-2xl p-4 text-center border border-white/5';
    card.innerHTML = `
      <div class="text-3xl mb-2">${ach.icon}</div>
      <div class="text-white text-xs font-bold mb-1" style="font-family:'Syne',sans-serif;">${ach.title}</div>
      <div class="text-gray-500 text-xs font-mono">${ach.desc}</div>
    `;
    card.style.transition = 'all 0.4s ease';

    // Unlock on scroll
    ScrollTrigger.create({
      trigger: '#achievements',
      start: 'top 70%',
      onEnter: () => {
        setTimeout(() => {
          card.classList.add('unlocked');
          card.style.borderColor = ach.color + '66';
          card.style.boxShadow = `0 0 20px ${ach.color}33`;
        }, i * 200);
      },
      once: true
    });

    card.addEventListener('click', () => {
      gsap.fromTo(card, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
    });

    grid.appendChild(card);
  });
}

// ─── FOOTER STARS ─────────────────────────────────────────────────

function initFooterStars() {
  const canvas = document.getElementById('footer-stars');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();

  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1,
    opacity: Math.random(),
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.opacity += s.speed * 0.01;
      if (s.opacity > 1) { s.opacity = 0; s.x = Math.random() * canvas.width; s.y = Math.random() * canvas.height; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    btn.textContent = document.body.classList.contains('light-mode') ? '◑ MODE' : '◐ MODE';
  });
}

// ─── SMOOTH SCROLL ────────────────────────────────────────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ─── PARALLAX ────────────────────────────────────────────────────

function initParallax() {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const orb = document.querySelector('.hero-orb');
    if (orb) orb.style.transform = `translate(-50%, calc(-50% + ${y * 0.3}px))`;
  });
}

// ─── INIT ─────────────────────────────────────────────────────────

function init() {
  // Build DOM sections
  buildTimeline();
  buildContributions();
  buildQuotes();
  buildBooks();
  buildFunFacts();

  // Init systems
  initLoader();
  initCursor();
  initThreeBackground();
  initScrollProgress();
  initScrollAnimations();
  initFeynmanVisualizer();
  initChallengerSim();
  initFooterStars();
  initThemeToggle();
  initSmoothScroll();
  initParallax();
}

document.addEventListener('DOMContentLoaded', init);
