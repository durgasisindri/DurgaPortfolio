'use strict';
// Edit these details if your profile URLs or contact information change.
const profile = {
  email: 'durgasisindri@gmail.com',
  location: 'Ameerpet, Hyderabad, India',
  github: 'https://github.com/durgasisindri',
  linkedin: 'https://www.linkedin.com/in/durgasisindri'
};

const menuButton = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
function closeMenu() {
  navLinks?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  if (menuButton) menuButton.textContent = '☰';
}
menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuButton.textContent = isOpen ? '✕' : '☰';
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('location-text').textContent = profile.location;
document.getElementById('email-display').textContent = profile.email;

function setSocialLinks(selector, url) {
  document.querySelectorAll(selector).forEach(link => {
    link.href = url || '#contact';
    if (url) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  });
}
setSocialLinks('.github-link', profile.github);
setSocialLinks('.linkedin-link', profile.linkedin);
document.querySelectorAll('.email-link').forEach(link => link.href = `mailto:${profile.email}`);
document.getElementById('contact-mail').href = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Durga')}`;

document.getElementById('copy-email')?.addEventListener('click', async () => {
  const feedback = document.getElementById('copy-feedback');
  try {
    await navigator.clipboard.writeText(profile.email);
    feedback.textContent = 'Copied!';
    setTimeout(() => { feedback.textContent = 'Copy email ↗'; }, 2000);
  } catch { window.location.href = `mailto:${profile.email}`; }
});

// The PDF is included under Resume/; do not cancel the native download click.
const resumeLink = document.getElementById('resume-link');
if (resumeLink) {
  resumeLink.href = './Resume/NAKKA_DURGA_SISINDRI.pdf';
  resumeLink.setAttribute('download', 'DURGA_SISINDRI.pdf');
}

// Animate content as it enters the viewport, with accessible fallback.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}
