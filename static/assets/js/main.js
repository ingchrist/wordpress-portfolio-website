/* ═══════════════════════════════════════════════════════
   MINT PORTFOLIO — MAIN JS
════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Year ────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scrolled header ─────────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Burger menu ─────────────────────────────────────
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── Active nav on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(n => n.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observerNav.observe(s));

  // ── Portfolio filter ─────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.style.display = '';
          item.classList.remove('fade-out');
        } else {
          item.classList.add('fade-out');
          setTimeout(() => {
            if (item.classList.contains('fade-out')) item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ── Load more (toggle hidden items) ─────────────────
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    // Initially nothing hidden — btn is just decorative demo
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.textContent = 'ALL WORK LOADED';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
    });
  }

  // ── Scroll reveal ────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.work, .about-grid, .blog-card, .contact-grid, .gallery-item, .stat'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── Contact form (client-side feedback) ─────────────
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMsg.textContent = 'Please fill in all required fields.';
        formMsg.className = 'form-msg error';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.className = 'form-msg error';
        return;
      }

      // Simulate sending
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'SEND MESSAGE';
        submitBtn.disabled = false;
        formMsg.textContent = '✓ Message sent! We\'ll be in touch soon.';
        formMsg.className = 'form-msg success';
        setTimeout(() => { formMsg.textContent = ''; formMsg.className = 'form-msg'; }, 5000);
      }, 1500);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

})();
