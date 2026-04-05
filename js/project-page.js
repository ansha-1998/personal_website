/**
 * project-page.js — populates project.html from SITE_DATA.
 * Reads ?p=INDEX from the URL query string.
 */
(function () {
  'use strict';

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    globe:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>',
  };

  function $id(id) { return document.getElementById(id); }

  function getProjectIndex() {
    var params = new URLSearchParams(window.location.search);
    var p = parseInt(params.get('p'), 10);
    return isNaN(p) ? 0 : p;
  }

  function render(project, index, allProjects) {
    // <title>
    document.title = project.title + ' — Mohammed Ansha';

    // Year + featured badge
    var yearEl  = $id('proj-year');
    var badgeEl = $id('proj-badge');
    if (yearEl)  yearEl.textContent = project.year || '';
    if (badgeEl && project.featured) badgeEl.style.display = '';

    // Title
    var titleEl = $id('proj-title');
    if (titleEl) titleEl.textContent = project.title;

    // Tags
    var tagsEl = $id('proj-tags');
    if (tagsEl) {
      tagsEl.innerHTML = project.tags.map(function (t) {
        return '<span class="proj-tag">' + t + '</span>';
      }).join('');
    }

    // Summary paragraphs (use summary[] if present, fall back to description)
    var summaryEl = $id('proj-summary');
    if (summaryEl) {
      var paragraphs = (project.summary && project.summary.length)
        ? project.summary
        : [project.description];
      summaryEl.innerHTML = paragraphs.map(function (p, i) {
        return '<p class="proj-para' + (i === 0 ? ' proj-para-lead' : '') + '">' + p + '</p>';
      }).join('');
    }

    // CTA buttons
    var btnsEl = $id('proj-cta-btns');
    if (btnsEl) {
      var btns = '';
      if (project.github) {
        btns += '<a href="' + project.github + '" target="_blank" rel="noopener" class="proj-btn proj-btn-ghost">'
              + ICONS.github + '<span>View on GitHub</span>'
              + '</a>';
      }
      if (project.website) {
        btns += '<a href="' + project.website + '" target="_blank" rel="noopener" class="proj-btn proj-btn-primary">'
              + ICONS.globe + '<span>Try it live</span>'
              + ICONS.arrow
              + '</a>';
      }
      if (!project.github && !project.website) {
        btns = '<span class="proj-btn-unavailable">Links coming soon</span>';
      }
      btnsEl.innerHTML = btns;
    }

    // Footer
    var nameEl = $id('footer-name');
    var yearFooter = $id('footer-year');
    if (nameEl) nameEl.textContent = window.SITE_DATA.profile.name;
    if (yearFooter) yearFooter.textContent = '© ' + new Date().getFullYear();
  }

  // ── Cursor ────────────────────────────────────────────────────────────────
  function initCursor() {
    var dot     = $id('cursor-dot');
    var specter = $id('cursor-ring');
    if (!dot || !specter) return;
    var sx = window.innerWidth / 2, sy = window.innerHeight / 2;
    var dx = sx, dy = sy;
    document.addEventListener('mousemove', function (e) {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
    });
    (function loop() {
      sx += (dx - sx) * 0.038; sy += (dy - sy) * 0.038;
      specter.style.left = sx + 'px'; specter.style.top = sy + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('hovered'); });
    });
    document.addEventListener('mouseleave', function () { dot.classList.add('hidden'); specter.classList.add('hidden'); });
    document.addEventListener('mouseenter', function () { dot.classList.remove('hidden'); specter.classList.remove('hidden'); });
  }

  // ── Nav scroll ────────────────────────────────────────────────────────────
  function initNav() {
    var nav = $id('nav');
    if (nav) window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── Theme toggle ──────────────────────────────────────────────────────────
  function initTheme() {
    var btn = $id('theme-toggle');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // ── Scroll reveal ─────────────────────────────────────────────────────────
  function initReveal() {
    var els = document.querySelectorAll('.reveal-up');
    var io  = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ── Page loader ───────────────────────────────────────────────────────────
  var _loadStart = Date.now();
  function dismissLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    var delay = Math.max(0, 2200 - (Date.now() - _loadStart));
    setTimeout(function () {
      loader.classList.add('out');
      loader.addEventListener('transitionend', function () {
        loader.style.display = 'none';
      }, { once: true });
    }, delay);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var D = window.SITE_DATA;
    if (!D) { document.body.innerHTML = '<p style="padding:4rem;color:red">SITE_DATA missing.</p>'; return; }

    var idx     = getProjectIndex();
    var project = D.projects[idx];

    if (!project) {
      window.location.replace('index.html#projects');
      return;
    }

    render(project, idx, D.projects);

    initTheme();
    initNav();
    initCursor();
    dismissLoader();
    requestAnimationFrame(initReveal);
  });

})();
