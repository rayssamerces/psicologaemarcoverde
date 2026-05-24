/**
 * Gabriela Novais — Site Institucional
 * Menu mobile, scroll suave, animações fade-in e header fixo
 */

(function () {
  'use strict';

  /* --- Elementos do DOM --- */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const fadeElements = document.querySelectorAll('.fade-in');

  /* --- Overlay para menu mobile --- */
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  /* --- Menu Hamburger (mobile) --- */
  function toggleMenu(forceClose) {
    const shouldOpen = forceClose === true ? false : !nav.classList.contains('open');

    nav.classList.toggle('open', shouldOpen);
    hamburger.classList.toggle('active', shouldOpen);
    overlay.classList.toggle('active', shouldOpen);
    hamburger.setAttribute('aria-expanded', shouldOpen);
    hamburger.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');

    /* Bloqueia scroll do body quando menu aberto */
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  overlay.addEventListener('click', () => toggleMenu(true));

  /* Fecha menu ao clicar em um link */
  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  /* --- Header com sombra ao rolar --- */
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Destaque do link ativo na navegação --- */
  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });

  /* --- Animação fade-in ao scroll (Intersection Observer) --- */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* --- Scroll suave para âncoras (fallback para browsers antigos) --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = header.offsetHeight + 16;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth',
      });
    });
  });

  /* --- Animação escalonada nos cards de áreas --- */
  const areaCards = document.querySelectorAll('.area-card.fade-in');
  areaCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

})();
