// ===== MOBILE NAV =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? '닫기' : '메뉴';
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '메뉴';
  });
});

// ===== CURRENT SECTION =====
const links = nav.querySelectorAll('a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + e.target.id;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id], #contact').forEach(s => observer.observe(s));
