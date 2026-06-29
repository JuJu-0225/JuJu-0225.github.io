// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('#mobile-nav a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        if (a.getAttribute('href') === '#' + e.target.id) {
          a.querySelector('.nav-dot').style.background = '#3b82f6';
        } else {
          a.querySelector('.nav-dot').style.background = '';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.innerHTML = value + (progress >= 1 ? `<span class="stat-suffix">${suffix}</span>` : '');
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ===== FADE IN =====
const fadeEls = document.querySelectorAll('.project, .skill-block, .stat-box, .contact-item, .timeline li');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.style.opacity = '1', i * 60);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s ease';
  fadeObs.observe(el);
});
