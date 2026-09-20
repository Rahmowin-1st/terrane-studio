/* TERRANE V3.1 — interaction polish layer */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  root.classList.add('terrane-v31');

  const header = document.querySelector('.site-header');
  const headerInner = document.querySelector('.site-header-inner');

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-v31-scrolled', window.scrollY > 72);
  };
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });

  if (headerInner && fine.matches && !reduced.matches) {
    const resetGlass = () => {
      headerInner.style.setProperty('--v31-glass-x', '72%');
      headerInner.style.setProperty('--v31-glass-y', '20%');
    };
    headerInner.addEventListener('pointermove', (event) => {
      const r = headerInner.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((event.clientX - r.left) / r.width) * 100));
      const y = Math.max(0, Math.min(100, ((event.clientY - r.top) / r.height) * 100));
      headerInner.style.setProperty('--v31-glass-x', x.toFixed(1) + '%');
      headerInner.style.setProperty('--v31-glass-y', y.toFixed(1) + '%');
    }, { passive: true });
    headerInner.addEventListener('pointerleave', resetGlass, { passive: true });
    resetGlass();
  }

  const pressables = [
    ...document.querySelectorAll(
      '.hero-primary-cta,.hero-secondary-cta,.project-link,.project-arrow,.consultation-submit,.site-header a,.site-header button,#terrane-case-root a,#terrane-case-root button'
    )
  ];
  pressables.forEach((el) => {
    const on = () => el.classList.add('v31-pressing');
    const off = () => el.classList.remove('v31-pressing');
    el.addEventListener('pointerdown', on, { passive: true });
    ['pointerup','pointercancel','pointerleave'].forEach((type) => el.addEventListener(type, off, { passive: true }));
  });

  const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const navMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (section) navMap.set(section, link);
  });

  if ('IntersectionObserver' in window && navMap.size) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.remove('is-v31-active'));
      navMap.get(visible.target)?.classList.add('is-v31-active');
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.08,0.2,0.4] });
    navMap.forEach((_, section) => navObserver.observe(section));
  }

  const approachSteps = [...document.querySelectorAll('.approach-step')];
  if ('IntersectionObserver' in window && approachSteps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          approachSteps.forEach((step) => step.classList.toggle('is-v31-active', step === entry.target));
        }
      });
    }, { rootMargin: '-38% 0px -44% 0px', threshold: 0.01 });
    approachSteps.forEach((step) => stepObserver.observe(step));
  }

  const projectStories = [...document.querySelectorAll('.project-story')];
  projectStories.forEach((story) => {
    const stage = story.querySelector('.project-stage');
    if (!stage || !fine.matches || reduced.matches) return;
    stage.addEventListener('pointerenter', () => story.classList.add('is-v31-hover'));
    stage.addEventListener('pointerleave', () => story.classList.remove('is-v31-hover'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    root.classList.add('v31-keyboard');
  }, { once: true });

  if ('ResizeObserver' in window && headerInner) {
    const ro = new ResizeObserver(() => {
      root.style.setProperty('--v31-header-h', Math.round(headerInner.getBoundingClientRect().height) + 'px');
    });
    ro.observe(headerInner);
  }
})();
