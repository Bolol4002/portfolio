// main.js — Portfolio multi-page interactions

// ── Typing animation (home page only) ──
const phrases = [
  'Electronics & VLSI Enthusiast',
  'Hardware Verification',
  'RTL Design',
  'Linux Advocate',
  'CPU Microarchitecture'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrase = phrases[phraseIndex];

  if (isDeleting) {
    el.innerHTML = phrase.substring(0, charIndex - 1) + '<span class="cursor"></span>';
    charIndex--;
    typingSpeed = 40;
  } else {
    el.innerHTML = phrase.substring(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeText, typingSpeed);
}

// ── Mobile nav toggle ──
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.topnav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── Card hover tilt effect ──
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / 20;
      const ry = (cx - x) / 20;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 800);
  initNavToggle();
  initCardTilt();
});
