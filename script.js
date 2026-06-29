// ===== SCROLL PROGRESS =====
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(99,102,241,0.15)'
    : '';
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observerNav.observe(s));

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  '.about-card, .skill-group, .project-card, .podium-card, .awards-total, .activity-group, .contact-card, .pm-diff, .stat-item'
);
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.classList.add('fade-in');
  fadeObs.observe(el);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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

// ===== TYPEWRITER =====
const phrases = ['서비스 완성도에 집착하는 백엔드 개발자', '기획부터 배포까지 직접 설계합니다', 'PM · Backend · QA — 한 번에'];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = phrases[pi];
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ===== SPARKLES =====
const sparkleContainer = document.getElementById('sparkles');
function createSparkle() {
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 2 + 's';
  s.style.width = s.style.height = (Math.random() * 6 + 3) + 'px';
  sparkleContainer.appendChild(s);
  setTimeout(() => s.remove(), 3000);
}
setInterval(createSparkle, 400);
