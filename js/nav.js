document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function () {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');

    // optionally focus first link for accessibility when opened
    if (!expanded) {
      const firstLink = navMenu.querySelector('.nav-links a');
      if (firstLink) firstLink.focus();
    }
  });

  // close menu when a link is clicked
  navMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      // return focus to toggle for accessibility
      navToggle.focus();
    }
  });

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.focus();
    }
  });
});