/** animations.js — scroll-reveal + hero canvas + nav scroll */

// ── Particle canvas (hero background) ─────────────────────────────────────────
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = rand(0, W);
      this.y  = rand(0, H);
      this.r  = rand(0.5, 2);
      this.vx = rand(-0.15, 0.15);
      this.vy = rand(-0.2, -0.05);
      this.alpha = rand(0.1, 0.5);
      this.life  = 0;
      this.maxLife = rand(200, 500);
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0) this.reset();
    }
    draw() {
      const t = this.life / this.maxLife;
      const a = this.alpha * (t < 0.1 ? t * 10 : t > 0.85 ? (1 - t) * 6.67 : 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,212,${a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Stagger starts so they don't all look the same
  particles.forEach(p => { p.life = Math.floor(Math.random() * p.maxLife); });

  // Draw connecting lines between close particles
  function drawConnections() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,212,${0.05 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

// ── Nav scroll effect ─────────────────────────────────────────────────────────
export function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const mobile    = document.getElementById('nav-mobile');
  if (hamburger && mobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobile.classList.toggle('open');
    });
    // Close on link click
    mobile.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobile.classList.remove('open');
      });
    });
  }
}

// ── Scroll-reveal (IntersectionObserver) ─────────────────────────────────────
export function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up');
  const io  = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  els.forEach(el => io.observe(el));
}

// ── Project card 3-D tilt + spotlight ────────────────────────────────────────
export function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rx = (-dy / rect.height) * 10;
      const ry = (dx  / rect.width)  * 10;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
      // Spotlight
      const mx = ((e.clientX - rect.left) / rect.width)  * 100;
      const my = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Hero text split animation ─────────────────────────────────────────────────
export function animateHeroText(firstName, lastName) {
  const container = document.getElementById('hero-name');
  if (!container) return;

  function splitLine(text, baseDelay, isOutline) {
    const line = document.createElement('span');
    line.className = 'hero-name-line' + (isOutline ? ' outline' : '');
    [...text].forEach((char, i) => {
      if (char === ' ') {
        line.appendChild(document.createTextNode('\u00a0'));
        return;
      }
      const wrapper = document.createElement('span');
      wrapper.className = 'hero-letter';
      const inner = document.createElement('span');
      inner.className = 'hero-letter-inner';
      inner.textContent = char;
      inner.style.setProperty('--letter-delay', (baseDelay + i * 0.04) + 's');
      wrapper.appendChild(inner);
      line.appendChild(wrapper);
    });
    return line;
  }

  container.appendChild(splitLine(firstName, 0.5, false));
  container.appendChild(splitLine(lastName,  0.65, true));
}
