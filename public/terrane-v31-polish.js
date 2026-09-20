/* TERRANE V3.1 — interaction polish hotfix
   Additive only: stable V3 owns header tone, nav state, approach state and motion. */
(() => {
  'use strict';
  if (window.__TERRANE_V31_POLISH__) return;
  window.__TERRANE_V31_POLISH__ = true;

  const root = document.documentElement;
  root.classList.add('terrane-v31');

  const PRESS_SELECTOR = [
    '.hero-primary-cta',
    '.hero-secondary-cta',
    '.project-link',
    '.project-arrow',
    '.consultation-submit',
    '.site-header button',
    '.site-header a[href="#commission"]',
    '#terrane-case-root .case-back',
    '#terrane-case-root .case-next a',
    '#terrane-case-root button'
  ].join(',');

  let pressed = null;
  const clearPressed = () => {
    if (!pressed) return;
    pressed.classList.remove('v31-pressing');
    pressed = null;
  };

  document.addEventListener('pointerdown', (event) => {
    const target = event.target instanceof Element ? event.target.closest(PRESS_SELECTOR) : null;
    if (!target) return;
    clearPressed();
    pressed = target;
    pressed.classList.add('v31-pressing');
  }, { passive: true });

  document.addEventListener('pointerup', clearPressed, { passive: true });
  document.addEventListener('pointercancel', clearPressed, { passive: true });
  window.addEventListener('blur', clearPressed);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') root.classList.add('v31-keyboard');
  }, { once: true });
})();
