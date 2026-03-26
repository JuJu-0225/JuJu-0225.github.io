// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.about-card, .skill-group, .project-card, .award-item, .activity-group, .contact-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--pink-500)'
      : '';
  });

  // Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(255, 100, 160, 0.15)'
    : '';
});
