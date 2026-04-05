/** cursor.js — Custom glow cursor with hover detection */

export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let dotX  = 0, dotY  = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
  });

  // Ring follows with lag
  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow on hover over interactive elements
  const hoverTargets = 'a, button, [role="button"], input, .project-card, .skill-tag';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });

  // Hide on leave, show on enter
  document.addEventListener('mouseleave', () => { dot.classList.add('hidden'); ring.classList.add('hidden'); });
  document.addEventListener('mouseenter', () => { dot.classList.remove('hidden'); ring.classList.remove('hidden'); });
}
