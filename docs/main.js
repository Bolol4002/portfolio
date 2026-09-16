// main.js — Blueprint portfolio: nav toggle, scrollspy, project filter

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function initScrollspy() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!navLinks.length) return;
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!sections.length) return;

  const map = new Map();
  sections.forEach(s => map.set(s.id, document.querySelector(`.nav-links a[href="#${s.id}"]`)));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.remove('active'));
      const el = map.get(entry.target.id);
      if (el) el.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
}

function initFilters() {
  const buttons = [...document.querySelectorAll('.filter-btn')];
  if (!buttons.length) return;
  const projs = [...document.querySelectorAll('.proj[data-cat]')];

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projs.forEach(p => {
        const show = cat === 'all' || p.dataset.cat === cat;
        p.classList.toggle('is-hidden', !show);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollspy();
  initFilters();
});