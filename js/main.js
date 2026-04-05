/**
 * main.js — Bootstrap: reads data.js, populates DOM, initialises all modules.
 */

import { profile, projects, skills, experience, stats } from '../data.js';
import { renderProjects } from './projects.js';
import { initCursor }     from './cursor.js';
import {
  initHeroCanvas, initNav, initScrollReveal,
  initCardTilt, animateHeroText
} from './animations.js';

// ── SVG social icons ──────────────────────────────────────────────────────────
const SOCIAL_ICONS = {
  github:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  twitter:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>`,
};

function el(id) { return document.getElementById(id); }

function buildSocialLinks(socials) {
  return Object.entries(socials)
    .filter(([, url]) => !!url)
    .map(([key, url]) => `
      <a href="${url}" target="_blank" rel="noopener"
         class="social-link btn-icon" aria-label="${key}"
         title="${key.charAt(0).toUpperCase() + key.slice(1)}">
        ${SOCIAL_ICONS[key] || ''}
      </a>`
    ).join('');
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function populateHero() {
  // Availability badge
  const dot   = el('hero-badge-dot');
  const label = el('hero-availability-label');
  if (dot)   { if (!profile.isAvailable) dot.classList.add('unavailable'); }
  if (label) label.textContent = profile.availabilityLabel;

  // Animated name
  animateHeroText(profile.firstName, profile.lastName);

  // Role + tagline
  const roleEl    = el('hero-role-text');
  const taglineEl = el('hero-tagline');
  if (roleEl)    roleEl.textContent    = profile.role;
  if (taglineEl) taglineEl.textContent = profile.tagline;

  // Resume button
  const resumeBtn = el('hero-cta-resume');
  if (resumeBtn && profile.resume) {
    resumeBtn.href = profile.resume;
    resumeBtn.style.display = '';
    resumeBtn.setAttribute('target', '_blank');
  }
}

// ── About ─────────────────────────────────────────────────────────────────────
function populateAbout() {
  // Bio paragraphs
  const bioContainer = el('about-bio');
  if (bioContainer) {
    bioContainer.innerHTML = profile.bio.map((p, i) =>
      `<p class="about-bio-p reveal-up" style="--delay:${0.15 + i * 0.1}s">${p}</p>`
    ).join('');
  }

  // Meta
  const locEl   = el('about-location');
  const emailEl = el('about-email');
  if (locEl)   locEl.textContent = profile.location;
  if (emailEl) { emailEl.textContent = profile.email; emailEl.href = `mailto:${profile.email}`; }

  // Socials
  const socialsEl = el('about-socials');
  if (socialsEl) socialsEl.innerHTML = buildSocialLinks(profile.socials);

  // Stats card
  const statsEl = el('about-stats');
  if (statsEl && stats?.length) {
    statsEl.innerHTML = stats.map(s => `
      <div class="stat-item">
        <div class="stat-value">${s.value.replace(/(\d+)/, '<span class="stat-accent">$1</span>')}</div>
        <div class="stat-label">${s.label}</div>
      </div>`
    ).join('');
  }
}

// ── Skills ────────────────────────────────────────────────────────────────────
function populateSkills() {
  const container = el('skills-container');
  if (!container || !skills) return;

  let globalTagIndex = 0;
  container.innerHTML = Object.entries(skills).map(([category, tags]) => `
    <div class="skill-category-row reveal-up" style="--delay:${0.1 + Object.keys(skills).indexOf(category) * 0.07}s">
      <span class="skill-category-name">${category}</span>
      <div class="skill-tags">
        ${tags.map(tag => {
          const delay = (globalTagIndex++ * 0.03).toFixed(2);
          return `<span class="skill-tag" style="--tag-delay:${delay}s">${tag}</span>`;
        }).join('')}
      </div>
    </div>`
  ).join('');
}

// ── Experience ────────────────────────────────────────────────────────────────
function populateExperience() {
  const container = el('experience-container');
  if (!container || !experience?.length) return;

  container.innerHTML = experience.map((e, i) => `
    <div class="timeline-item reveal-up" style="--delay:${0.1 + i * 0.15}s">
      <div class="timeline-dot"></div>
      <div class="timeline-meta">
        <span class="timeline-role">${e.role}</span>
        ${e.companyUrl
          ? `<a href="${e.companyUrl}" target="_blank" rel="noopener" class="timeline-company">${e.company}</a>`
          : `<span class="timeline-company" style="pointer-events:none">${e.company}</span>`
        }
        <span class="timeline-period">${e.period}</span>
      </div>
      <p class="timeline-description">${e.description}</p>
    </div>`
  ).join('');
}

// ── Contact ───────────────────────────────────────────────────────────────────
function populateContact() {
  const emailLink    = el('contact-email-link');
  const emailDisplay = el('contact-email-display');
  if (emailLink)    emailLink.href = `mailto:${profile.email}`;
  if (emailDisplay) emailDisplay.textContent = profile.email;

  const socialsEl = el('contact-socials');
  if (socialsEl) socialsEl.innerHTML = buildSocialLinks(profile.socials);
}

// ── Footer ────────────────────────────────────────────────────────────────────
function populateFooter() {
  const nameEl = el('footer-name');
  const yearEl = el('footer-year');
  if (nameEl) nameEl.textContent = profile.name;
  if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()}`;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateHero();
  populateAbout();
  renderProjects(projects);
  populateSkills();
  populateExperience();
  populateContact();
  populateFooter();

  // Init modules (order matters: canvas first, then reveal after DOM populated)
  initHeroCanvas();
  initNav();
  initCursor();

  // Small timeout lets CSS parse before observing
  requestAnimationFrame(() => {
    initScrollReveal();
    initCardTilt();
  });
});
