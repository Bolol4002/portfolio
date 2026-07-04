// main.js — Portfolio with optimized ASCII particle system

// ── Mobile nav toggle ──
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.topnav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── Card hover tilt ──
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${(y - cy) / 20}deg) rotateY(${(cx - x) / 20}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ── ASCII Particle System (optimized) ──
function initAsciiParticles() {
  const canvas = document.getElementById('ascii-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CW = 500;
  const CH = 400;
  canvas.width = CW;
  canvas.height = CH;

  const FONT_SIZE = 7;
  const COLS = Math.floor(CW / FONT_SIZE);
  const ROWS = Math.floor(CH / FONT_SIZE);
  const SPRING = 0.06;
  const DAMPING = 0.82;
  const PUSH_RADIUS = 50;
  const PUSH_FORCE = 10;
  const SETTLE_THRESHOLD = 0.3;

  let particles = [];
  let mouse = { x: -999, y: -999, active: false };
  let settled = true;

  function getWeight(ch) {
    if (ch === '#' || ch === '@' || ch === '%') return 1.0;
    if (ch === '*') return 0.7;
    if (ch === '+') return 0.5;
    if (ch === '=') return 0.4;
    if (ch === '-') return 0.25;
    if (ch === ':') return 0.3;
    if (ch === '.') return 0.2;
    return 0;
  }

  function loadAscii() {
    fetch('ascii.txt')
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n');
        const maxCols = Math.max(...lines.map(l => l.length));
        const offsetX = Math.floor((COLS - maxCols) / 2);
        const offsetY = Math.floor((ROWS - lines.length) / 2);

        particles = [];
        for (let row = 0; row < lines.length; row++) {
          for (let col = 0; col < lines[row].length; col++) {
            const ch = lines[row][col];
            const w = getWeight(ch);
            if (w <= 0) continue;

            const tx = (offsetX + col) * FONT_SIZE + FONT_SIZE * 0.5;
            const ty = (offsetY + row) * FONT_SIZE + FONT_SIZE * 0.5;
            const angle = Math.random() * Math.PI * 2;
            const dist = 150 + Math.random() * 250;

            particles.push({
              ch, tx, ty, w,
              x: tx + Math.cos(angle) * dist,
              y: ty + Math.sin(angle) * dist,
              vx: 0, vy: 0
            });
          }
        }
      });
  }

  function animate() {
    let anyMoving = false;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      p.vx += dx * SPRING;
      p.vy += dy * SPRING;

      if (mouse.active) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        const rSq = PUSH_RADIUS * PUSH_RADIUS;
        if (mDistSq < rSq && mDistSq > 0) {
          const mDist = Math.sqrt(mDistSq);
          const force = (1 - mDist / PUSH_RADIUS) * PUSH_FORCE;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }
      }

      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      if (Math.abs(p.vx) > SETTLE_THRESHOLD || Math.abs(p.vy) > SETTLE_THRESHOLD ||
          Math.abs(dx) > SETTLE_THRESHOLD || Math.abs(dy) > SETTLE_THRESHOLD) {
        anyMoving = true;
      }
    }

    ctx.clearRect(0, 0, CW, CH);
    ctx.fillStyle = '#3AAFB9';
    ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const speed = p.vx * p.vx + p.vy * p.vy;
      ctx.globalAlpha = p.w * (speed > 1 ? Math.min(0.5 + speed * 0.03, 1) : 0.55);
      ctx.fillText(p.ch, p.x, p.y);
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (CW / rect.width);
    mouse.y = (e.clientY - rect.top) * (CH / rect.height);
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -999;
    mouse.y = -999;
  });

  loadAscii();
  animate();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initCardTilt();
  initAsciiParticles();
});
