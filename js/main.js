/* Galbiatti — JavaScript progressivo, sem dependências ou coleta de dados. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];

  function scrollToPageStart() {
    document.getElementById('inicio')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  if (menuButton && nav) {
    const setMenu = open => {
      nav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setMenu(false);
      if (link.hash && link.origin === location.origin) {
        const section = document.getElementById(link.hash.slice(1));
        if (link.hash === '#inicio') {
          event.preventDefault();
          if (location.hash !== '#inicio') history.pushState(null, '', '#inicio');
          scrollToPageStart();
          return;
        }
        section?.focus({ preventScroll: true });
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuButton.focus();
      }
    });
    document.addEventListener('focusin', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });
    window.matchMedia('(min-width: 781px)').addEventListener('change', () => setMenu(false));
    document.documentElement.classList.add('navigation-ready');
  }

  // Marca a seção pelo início visível, inclusive após clique, hash e rolagem manual.
  const navSections = [...document.querySelectorAll('section[data-nav]')];
  if (navLinks.length && navSections.length) {
    let scrollFrame = 0;
    function updateActiveSection() {
      scrollFrame = 0;
      const header = document.querySelector('.site-header');
      const limit = (header?.getBoundingClientRect().height || 0) + 60;
      let active = navSections[0].dataset.nav;
      for (const section of navSections) {
        const marker = document.getElementById(section.dataset.nav);
        if (marker && marker.getBoundingClientRect().top <= limit) active = section.dataset.nav;
      }
      const page = document.scrollingElement;
      const lastSection = navSections[navSections.length - 1];
      if (page && page.scrollTop > 0 && page.scrollHeight - page.clientHeight - page.scrollTop <= 2) {
        active = lastSection.dataset.nav;
      }
      navLinks.forEach(link => {
        const current = link.hash === `#${active}`;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    const scheduleUpdate = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('hashchange', scheduleUpdate);
    updateActiveSection();
  }

  const viewport = document.querySelector('.experts-viewport');
  const track = document.querySelector('.experts-grid');
  const dots = document.querySelector('.experts-dots');
  const counter = document.querySelector('.experts-counter');
  if (viewport && track && dots && counter) {
    const cards = [...track.querySelectorAll('.expert-card')];
    const total = cards.length;
    const buffer = 3; // Enough cards to fill the widest viewport at either seam.
    const logicalIndex = slot => ((slot - buffer) % total + total) % total;
    const visibleCount = () => window.matchMedia('(min-width: 1100px)').matches ? 3
      : window.matchMedia('(min-width: 700px)').matches ? 2 : 1;

    function copyCard(card) {
      const copy = card.cloneNode(true);
      copy.classList.add('expert-card-copy');
      copy.removeAttribute('aria-labelledby');
      copy.setAttribute('aria-label', card.querySelector('h3').textContent);
      copy.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      return copy;
    }

    track.prepend(...cards.slice(-buffer).map(copyCard));
    track.append(...cards.slice(0, buffer).map(copyCard));
    const slides = [...track.children];
    let selected = 0;
    let destination = buffer;
    let scrollTimer;
    let drag;
    const position = slot => slides[slot].offsetLeft - slides[0].offsetLeft;
    const nearestSlot = () => {
      const step = position(1);
      return step ? Math.max(0, Math.min(slides.length - visibleCount(), Math.round(viewport.scrollLeft / step))) : buffer;
    };
    const scrollToSlot = (slot, animate) => viewport.scrollTo({
      left: position(slot), behavior: animate && !reducedMotion.matches ? 'smooth' : 'instant'
    });

    const indicators = cards.map(() => {
      const indicator = document.createElement('span');
      indicator.className = 'experts-dot';
      dots.append(indicator);
      return indicator;
    });

    function updateCards() {
      const visible = visibleCount();
      const first = buffer + selected;
      const group = Array.from({ length: visible }, (_, offset) => (selected + offset) % total);
      slides.forEach((slide, slot) => {
        const inView = slot >= first && slot < first + visible;
        slide.classList.toggle('is-in-view', group.includes(logicalIndex(slot)));
        if (!inView && slide.contains(document.activeElement)) viewport.focus({ preventScroll: true });
        slide.inert = !inView;
        slide.setAttribute('aria-hidden', String(!inView));
        if (!inView) slide.querySelector('details').open = false;
      });
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('is-active', index === selected);
      });
      counter.textContent = `${selected + 1} de ${total}`;
    }

    function settle() {
      clearTimeout(scrollTimer);
      if (drag?.active) return;
      const slot = nearestSlot();
      selected = logicalIndex(slot);
      destination = buffer + selected;
      // Both positions display the same cards, in the same order.
      if (slot !== destination) scrollToSlot(destination, false);
      updateCards();
    }

    function goTo(slot) {
      clearTimeout(scrollTimer);
      const end = slides.length - visibleCount();
      destination = Math.max(0, Math.min(end, slot));
      if (Math.abs(viewport.scrollLeft - position(destination)) < 1) {
        settle();
        return;
      }
      scrollToSlot(destination, true);
      if (reducedMotion.matches) settle();
    }

    viewport.parentElement.querySelector('.experts-prev')?.addEventListener('click', () => goTo(destination - 1));
    viewport.parentElement.querySelector('.experts-next')?.addEventListener('click', () => goTo(destination + 1));
    viewport.addEventListener('scrollend', settle);
    if (!('onscrollend' in viewport)) {
      viewport.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(settle, 180);
      }, { passive: true });
    }
    viewport.addEventListener('keydown', event => {
      if (event.target.closest('summary, a, button, input, textarea, select')) return;
      const targets = { ArrowRight: destination + 1, ArrowLeft: destination - 1, Home: buffer, End: buffer + total - 1 };
      if (Object.hasOwn(targets, event.key)) {
        event.preventDefault();
        goTo(targets[event.key]);
      }
    });

    // Touch uses the browser's native scrolling. Mouse drag supplements it on desktop.
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('summary, a, button, .expert-bio')) return;
      drag = { id: event.pointerId, x: event.clientX, left: viewport.scrollLeft, active: false };
    });
    viewport.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const delta = event.clientX - drag.x;
      if (!drag.active && Math.abs(delta) < 8) return;
      if (!drag.active) {
        drag.active = true;
        viewport.setPointerCapture(event.pointerId);
        viewport.classList.add('is-dragging');
      }
      viewport.scrollLeft = drag.left - delta;
    });
    function finishDrag(event) {
      if (!drag || drag.id !== event.pointerId) return;
      const active = drag.active;
      drag = null;
      if (!active) return;
      const slot = nearestSlot();
      viewport.classList.remove('is-dragging');
      goTo(slot);
    }
    viewport.addEventListener('pointerup', finishDrag);
    viewport.addEventListener('pointercancel', finishDrag);
    viewport.addEventListener('lostpointercapture', finishDrag);
    viewport.addEventListener('pointerleave', () => { if (!drag?.active) drag = null; });

    const profiles = slides.map(slide => slide.querySelector('details'));
    slides.forEach((slide, slot) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.querySelector('img').draggable = false;
      const profile = profiles[slot];
      profile.addEventListener('toggle', () => {
        if (profile.open) profiles.forEach(other => { if (other !== profile) other.open = false; });
      });
    });

    function align() {
      clearTimeout(scrollTimer);
      destination = buffer + selected;
      scrollToSlot(destination, false);
      updateCards();
    }
    viewport.classList.add('carousel-ready');
    viewport.closest('.experts-section').classList.add('carousel-enabled');
    let lastWidth = viewport.clientWidth;
    if ('ResizeObserver' in window) new ResizeObserver(() => {
      if (lastWidth === viewport.clientWidth) return;
      lastWidth = viewport.clientWidth;
      align();
    }).observe(viewport);
    else window.addEventListener('resize', align, { passive: true });
    reducedMotion.addEventListener('change', align);
    align();
  }

  document.querySelectorAll('#current-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  const status = document.getElementById('open-status');
  if (status) {
    const updateStatus = () => {
      try {
        const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
        }).formatToParts(new Date()).map(part => [part.type, part.value]));
        const minutes = Number(parts.hour) * 60 + Number(parts.minute);
        const open = !['Sat', 'Sun'].includes(parts.weekday) && minutes >= 480 && minutes < 1020;
        status.textContent = open ? 'Dentro do horário de atendimento' : 'Fora do horário de atendimento';
        status.classList.toggle('is-open', open);
      } catch { status.textContent = 'Horário de Brasília'; }
    };
    updateStatus();
    setInterval(updateStatus, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) updateStatus(); });
  }

  const testimonialsMore = document.querySelector('.testimonials-more');
  const extraTestimonials = document.querySelectorAll('.testimonial-card-extra');
  if (testimonialsMore && extraTestimonials.length) {
    const mobileTestimonials = window.matchMedia('(max-width: 780px)');
    let expanded = false;

    const renderTestimonials = () => {
      const mobile = mobileTestimonials.matches;
      testimonialsMore.hidden = !mobile;
      testimonialsMore.setAttribute('aria-expanded', String(expanded));
      testimonialsMore.textContent = expanded ? 'Mostrar menos depoimentos' : `Ver mais ${extraTestimonials.length} depoimentos`;
      extraTestimonials.forEach(card => {
        if (mobile && !expanded && card.contains(document.activeElement)) testimonialsMore.focus();
        card.hidden = mobile && !expanded;
      });
    };

    testimonialsMore.addEventListener('click', () => {
      expanded = !expanded;
      renderTestimonials();
      if (expanded) extraTestimonials[0].querySelector('summary')?.focus();
    });
    mobileTestimonials.addEventListener('change', renderTestimonials);
    renderTestimonials();
  }

  // O início do documento é independente do cabeçalho fixo.
  document.querySelectorAll('a[href="#topo"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      history.replaceState(null, '', `${location.pathname}${location.search}#topo`);
      scrollToPageStart();
    });
  });
})();
