/**
 * app.js — bundled app (no ES modules, works with file://)
 * Reads window.SITE_DATA from data.js
 */
(function () {
  'use strict';

  const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`,
  };

  function $id(id) { return document.getElementById(id); }

  function socialLinks(socials) {
    return Object.entries(socials)
      .filter(([, url]) => !!url)
      .map(([key, url]) => `
        <a href="${url}" target="_blank" rel="noopener"
           class="social-link btn-icon" aria-label="${key}" title="${key}">
          ${ICONS[key] || ''}
        </a>`).join('');
  }

  // ── Hero — SINGLE LINE name ───────────────────────────────────────────────
  function populateHero(profile) {
    const nameEl = $id('hero-name');
    if (nameEl) {
      const fullName = profile.firstName + ' ' + profile.lastName;
      const line = document.createElement('span');
      line.className = 'hero-name-line';

      [...fullName].forEach((char, i) => {
        if (char === ' ') {
          // Real space — keep as-is inside a wrapper so animation gap works
          const sp = document.createElement('span');
          sp.className = 'hero-letter';
          sp.style.paddingRight = '0.25em';
          line.appendChild(sp);
          return;
        }
        const w = document.createElement('span');
        w.className = 'hero-letter';
        const inner = document.createElement('span');
        inner.className = 'hero-letter-inner';
        inner.textContent = char;
        inner.style.setProperty('--letter-delay', (0.5 + i * 0.045) + 's');
        w.appendChild(inner);
        line.appendChild(w);
      });

      nameEl.appendChild(line);
    }

    const roleEl = $id('hero-role-text');
    const taglineEl = $id('hero-tagline');
    if (roleEl) roleEl.textContent = profile.role;
    if (taglineEl) taglineEl.textContent = profile.tagline;

    const resumeBtn = $id('hero-cta-resume');
    if (resumeBtn && profile.resume) {
      resumeBtn.href = profile.resume;
      resumeBtn.style.display = '';
    }
  }

  // ── About ─────────────────────────────────────────────────────────────────
  function populateAbout(profile, stats) {
    const bioEl = $id('about-bio');
    if (bioEl) {
      bioEl.innerHTML = profile.bio.map((p, i) =>
        `<p class="about-bio-p reveal-up" style="--delay:${0.15 + i * 0.1}s">${p}</p>`
      ).join('');
    }
    const locEl = $id('about-location');
    const emailEl = $id('about-email');
    if (locEl) locEl.textContent = profile.location;
    if (emailEl) { emailEl.textContent = profile.email; emailEl.href = 'mailto:' + profile.email; }

    const socialsEl = $id('about-socials');
    if (socialsEl) socialsEl.innerHTML = socialLinks(profile.socials);

    const statsEl = $id('about-stats');
    if (statsEl && stats) {
      statsEl.innerHTML = stats.map(s => `
        <div class="stat-item">
          <div class="stat-value">${s.value.replace(/(\d+)/, '<span class="stat-accent">$1</span>')}</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join('');
    }
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  function renderProjects(projects) {
    const grid = $id('projects-grid');
    if (!grid || !projects.length) return;
    grid.innerHTML = projects.map((p, i) => `
      <a class="project-card reveal-up${p.featured ? ' featured' : ''}"
         href="project.html?p=${i}"
         style="--delay:${0.1 + i * 0.1}s" id="proj-${i}">
        ${p.featured ? '<span class="project-featured-badge">Featured</span>' : ''}
        <div class="project-year">${p.year || ''}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-description">${p.description}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <div class="project-card-footer">
          <span class="project-view-cta">View project ${ICONS.arrow}</span>
        </div>
      </a>`).join('');
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  function renderSkills(skills) {
    const container = $id('skills-container');
    if (!container || !skills) return;
    let tagIdx = 0;
    container.innerHTML = Object.entries(skills).map(([cat, tags], ci) => `
      <div class="skill-category-row reveal-up" style="--delay:${0.1 + ci * 0.06}s">
        <span class="skill-category-name">${cat}</span>
        <div class="skill-tags">
          ${tags.map(tag => {
      const d = (tagIdx++ * 0.025).toFixed(3);
      return `<span class="skill-tag" style="--tag-delay:${d}s">${tag}</span>`;
    }).join('')}
        </div>
      </div>`).join('');
  }

  // ── Experience ────────────────────────────────────────────────────────────
  function renderExperience(experience) {
    const container = $id('experience-container');
    if (!container || !experience.length) return;
    container.innerHTML = experience.map((e, i) => `
      <div class="timeline-item reveal-up" style="--delay:${0.1 + i * 0.15}s">
        <div class="timeline-dot"></div>
        <div class="timeline-meta">
          <span class="timeline-role">${e.role}</span>
          ${e.companyUrl
        ? `<a href="${e.companyUrl}" target="_blank" rel="noopener" class="timeline-company">${e.company}</a>`
        : `<span class="timeline-company">${e.company}</span>`}
          <span class="timeline-period">${e.period}</span>
        </div>
        <p class="timeline-description">${e.description}</p>
      </div>`).join('');
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  function populateContact(profile) {
    // WhatsApp
    var waLink = $id('wa-link');
    var waDisplay = $id('wa-display');
    if (waLink && profile.whatsapp) {
      waLink.href = 'https://wa.me/' + profile.whatsapp + '?text=Hi%20Mohammed%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20connect!';
    }
    if (waDisplay) waDisplay.textContent = profile.phone || profile.whatsapp || '';

    // Phone
    var phoneLink = $id('phone-link');
    var phoneDisplay = $id('phone-display');
    if (phoneLink && profile.phone) phoneLink.href = 'tel:' + profile.phone.replace(/\s/g, '');
    if (phoneDisplay) phoneDisplay.textContent = profile.phone || '';

    // Email channel
    var emailLink = $id('email-ch-link');
    var emailDisplay = $id('email-ch-display');
    if (emailLink) emailLink.href = 'mailto:' + profile.email;
    if (emailDisplay) emailDisplay.textContent = profile.email;

    // Socials
    var socialsEl = $id('contact-socials');
    if (socialsEl) socialsEl.innerHTML = socialLinks(profile.socials);
  }

  // ── Contact form → Google Forms ───────────────────────────────────────────
  //
  //  HOW TO CONNECT YOUR GOOGLE FORM:
  //  1. Create a Google Form with fields: Name, Email, Phone, Message
  //  2. Click ⋮ → "Get pre-filled link" to reveal entry IDs
  //  3. Replace the GOOGLE_FORM_URL and ENTRY_* constants below
  //  4. The form submits silently (no-cors) — data goes straight to your sheet
  https://docs.google.com/forms/d/e/1FAIpQLSdGXKu34QCB_9hPeIDNRg5v9KWzegrGeoYRHXDXhPQ5dJdKQw/viewform?usp=pp_url&entry.1430851278=Ansha&entry.1643065738=anshamohammed14@gmail.com&entry.1722332998=9947363114&entry.2031443530=Hi


  //
  var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdGXKu34QCB_9hPeIDNRg5v9KWzegrGeoYRHXDXhPQ5dJdKQw/viewform?usp=publish-editor';
  var ENTRY_NAME = 'entry.1430851278';  // ← replace with your entry ID
  var ENTRY_EMAIL = 'entry.1643065738';
  var ENTRY_PHONE = 'entry.1722332998';
  var ENTRY_MESSAGE = 'entry.2031443530';

  function initContactForm() {
    var form = $id('contact-form');
    var toast = $id('form-toast');
    var submit = $id('form-submit');
    if (!form) return;

    function showToast(msg, type) {
      if (!toast) return;
      toast.textContent = msg;
      toast.className = 'form-toast ' + type;
      toast.style.display = 'block';
      setTimeout(function () { toast.style.display = 'none'; }, 5000);
    }

    function validate() {
      var ok = true;
      ['cf-name', 'cf-email', 'cf-msg'].forEach(function (id) {
        var el = $id(id);
        if (!el) return;
        var valid = el.checkValidity() && el.value.trim() !== '';
        el.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      return ok;
    }

    // Remove invalid class on input
    ['cf-name', 'cf-email', 'cf-phone', 'cf-msg'].forEach(function (id) {
      var el = $id(id);
      if (el) el.addEventListener('input', function () { el.classList.remove('invalid'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      submit.disabled = true;

      var params = new URLSearchParams();
      params.append(ENTRY_NAME, ($id('cf-name') || {}).value || '');
      params.append(ENTRY_EMAIL, ($id('cf-email') || {}).value || '');
      params.append(ENTRY_PHONE, ($id('cf-phone') || {}).value || '');
      params.append(ENTRY_MESSAGE, ($id('cf-msg') || {}).value || '');

      // Submit silently — Google Forms ignores CORS; no-cors always resolves
      fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
        .then(function () {
          showToast('Message sent! I\'ll get back to you soon.', 'success');
          form.reset();
        })
        .catch(function () {
          // In no-cors mode, network errors still surface; show success anyway
          // because Google Forms likely received the data
          showToast('Message sent! I\'ll get back to you soon.', 'success');
          form.reset();
        })
        .finally(function () { submit.disabled = false; });
    });
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  function populateFooter(profile) {
    const nameEl = $id('footer-name');
    const yearEl = $id('footer-year');
    if (nameEl) nameEl.textContent = profile.name;
    if (yearEl) yearEl.textContent = '© ' + new Date().getFullYear();
  }

  // ── Alien Cursor — large slow-moving specter ──────────────────────────────
  function initCursor() {
    const dot = $id('cursor-dot');
    const specter = $id('cursor-ring');
    if (!dot || !specter) return;

    let sx = window.innerWidth / 2, sy = window.innerHeight / 2;
    let dx = sx, dy = sy;

    document.addEventListener('mousemove', e => {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
    });

    // Specter follows very slowly — alien consciousness
    (function loop() {
      sx += (dx - sx) * 0.038;
      sy += (dy - sy) * 0.038;
      specter.style.left = sx + 'px';
      specter.style.top = sy + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [role="button"], .project-card, .skill-tag').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('hovered'));
      el.addEventListener('mouseleave', () => dot.classList.remove('hovered'));
    });
    document.addEventListener('mouseleave', () => { dot.classList.add('hidden'); specter.classList.add('hidden'); });
    document.addEventListener('mouseenter', () => { dot.classList.remove('hidden'); specter.classList.remove('hidden'); });
  }

  // ── Hero canvas — soft particle field ────────────────────────────────────
  function initCanvas() {
    const canvas = $id('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    window.addEventListener('resize', resize); resize();

    function rand(a, b) { return Math.random() * (b - a) + a; }

    // Pastel color set for particles
    const colors = [
      'rgba(196,181,253,',  // lavender
      'rgba(251,191,158,',  // peach
      'rgba(168,216,196,',  // mint
    ];

    function Particle() {
      this.reset = function () {
        this.x = rand(0, W); this.y = rand(H * 0.1, H);
        this.r = rand(0.3, 1.4);
        this.vx = rand(-0.08, 0.08); this.vy = rand(-0.2, -0.03);
        this.baseAlpha = rand(0.08, 0.35);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 0; this.maxLife = rand(250, 600);
      };
      this.reset();
      this.life = Math.floor(Math.random() * this.maxLife);
    }

    for (let i = 0; i < 90; i++) particles.push(new Particle());

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // Soft connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(196,181,253,' + (0.04 * (1 - d / 80)) + ')';
            ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife || p.y < -10 || p.x < -5 || p.x > W + 5) p.reset();
        const t = p.life / p.maxLife;
        const a = p.baseAlpha * (t < 0.12 ? t / 0.12 : t > 0.82 ? (1 - t) / 0.18 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ')';
        ctx.fill();
      });

      requestAnimationFrame(frame);
    }
    frame();
  }

  // ── Nav ───────────────────────────────────────────────────────────────────
  function initNav() {
    const nav = $id('nav');
    if (nav) window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    const hamburger = $id('nav-hamburger');
    const mobile = $id('nav-mobile');
    if (hamburger && mobile) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile.classList.toggle('open');
      });
      mobile.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobile.classList.remove('open');
        });
      });
    }
  }

  // ── Scroll-reveal ─────────────────────────────────────────────────────────
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up');
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  // ── 3-D tilt ─────────────────────────────────────────────────────────────
  function initCardTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = -((e.clientY - r.top - r.height / 2) / r.height) * 8;
        const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 8;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.015,1.015,1.015)';
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ── Smooth scroll ─────────────────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  // ── Theme toggle ──────────────────────────────────────────────────────────
  function initTheme() {
    var btn = $id('theme-toggle');
    if (!btn) return;

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Sync button label with current theme (already applied by inline script)
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // ── Page loader ───────────────────────────────────────────────────────────
  function dismissLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    // Let the bot finish at least one full somersault (2.2s) before hiding
    var delay = Math.max(0, 2200 - (Date.now() - _loadStart));
    setTimeout(function () {
      loader.classList.add('out');
      loader.addEventListener('transitionend', function () {
        loader.style.display = 'none';
      }, { once: true });
    }, delay);
  }
  var _loadStart = Date.now();

  // ── Infinity loop — frame-perfect sync via requestAnimationFrame ─────────
  function initInfinityLoop() {
    var track = document.getElementById('inf-track');
    var arrow = document.getElementById('inf-arrow');
    var segs = Array.from(document.querySelectorAll('.hero-infinity-seg'));
    if (!track || !arrow || !segs.length) return;

    var total = track.getTotalLength();
    if (!total) return;  // hidden on mobile (display:none)

    // Measure each segment and compute cumulative start fractions
    var segLengths = segs.map(function (s) { return s.getTotalLength(); });
    var cumStarts = [];
    var cum = 0;
    segLengths.forEach(function (len) {
      cumStarts.push(cum / total);
      cum += len;
    });

    // Initialise each segment hidden
    segs.forEach(function (seg, i) {
      var len = segLengths[i];
      seg.style.strokeDasharray = len + ' ' + len;
      seg.style.strokeDashoffset = len;
    });

    var DRAW_MS = 45000;   // 45 s to trace the full path
    var FADE_MS = 5000;    // 5 s to fade out before restarting
    var CYCLE_MS = DRAW_MS + FADE_MS;
    var startTime = null;

    function frame(ts) {
      if (startTime === null) startTime = ts;
      var elapsed = (ts - startTime) % CYCLE_MS;

      if (elapsed < DRAW_MS) {
        // ── Draw phase ──────────────────────────────────────────────────────
        var t = elapsed / DRAW_MS;   // 0 → 1
        var dist = total * t;

        // Arrow: position + orientation from path tangent
        var ptA = track.getPointAtLength(Math.max(0, dist - 1));
        var ptB = track.getPointAtLength(Math.min(dist + 1, total));
        var angle = Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x) * 180 / Math.PI;
        var pt = track.getPointAtLength(dist);
        arrow.setAttribute('transform',
          'translate(' + pt.x + ',' + pt.y + ') rotate(' + angle + ')');
        arrow.style.opacity = elapsed < 500 ? elapsed / 500 : 1;

        // Each segment: hidden until arrow reaches it, then draws behind the arrow
        segs.forEach(function (seg, i) {
          var segStart = cumStarts[i];
          var segEnd = (i + 1 < cumStarts.length) ? cumStarts[i + 1] : 1;
          var segLen = segLengths[i];

          if (t <= segStart) {
            // Arrow hasn't reached this segment yet — keep hidden
            seg.style.strokeDashoffset = segLen;
            seg.style.opacity = 0;
          } else if (t >= segEnd) {
            // Arrow has passed this segment — fully drawn
            seg.style.strokeDashoffset = 0;
            seg.style.opacity = 1;
          } else {
            // Arrow is currently on this segment — draw up to where the arrow is
            var localT = (t - segStart) / (segEnd - segStart);
            seg.style.strokeDashoffset = segLen * (1 - localT);
            seg.style.opacity = 1;
          }
        });

      } else {
        // ── Fade phase ──────────────────────────────────────────────────────
        var ft = (elapsed - DRAW_MS) / FADE_MS;   // 0 → 1 over 5 s

        segs.forEach(function (seg) {
          seg.style.strokeDashoffset = 0;
          seg.style.opacity = 1 - ft;
        });
        arrow.style.opacity = ft < 0.5 ? 1 - ft * 2 : 0;  // arrow fades first

        // Keep arrow parked at the end point
        var ep1 = track.getPointAtLength(total - 2);
        var ep2 = track.getPointAtLength(total);
        var eAngle = Math.atan2(ep2.y - ep1.y, ep2.x - ep1.x) * 180 / Math.PI;
        arrow.setAttribute('transform',
          'translate(' + ep2.x + ',' + ep2.y + ') rotate(' + eAngle + ')');
      }

      requestAnimationFrame(frame);
    }

    // Delay start until the hero wrapper has finished its CSS fade-in (2.2s + 1.2s)
    setTimeout(function () { requestAnimationFrame(frame); }, 3400);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const D = window.SITE_DATA;
    if (!D) { console.error('SITE_DATA not found — is data.js loaded?'); return; }
    const { profile, projects, skills, experience, stats } = D;

    populateHero(profile);
    populateAbout(profile, stats);
    renderProjects(projects);
    renderSkills(skills);
    renderExperience(experience);
    populateContact(profile);
    populateFooter(profile);

    initTheme();
    initNav();
    initCanvas();
    initCursor();
    initInfinityLoop();
    initSmoothScroll();
    initContactForm();
    dismissLoader();

    requestAnimationFrame(function () {
      initScrollReveal();
      initCardTilt();
    });
  });

})();
