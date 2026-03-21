document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#modulo"], a[href="#inicio"], a[href="#estrutura"], a[href="#sobre"], a[href="#contato"], a[href="#modulos"]');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerOffset = document.querySelector('.top-bar')?.offsetHeight || 0;
      const navOffset = document.querySelector('.module-nav')?.offsetHeight || 0;
      const extraOffset = targetId.startsWith('#modulo') ? headerOffset + navOffset - 18 : headerOffset - 12;
      const top = target.getBoundingClientRect().top + window.pageYOffset - extraOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const moduleSections = document.querySelectorAll('section.module');
  const moduleNavLinks = document.querySelectorAll('.module-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const correspondingLink = document.querySelector(`.module-nav a[href="#${id}"]`);
      if (entry.isIntersecting && correspondingLink) {
        moduleNavLinks.forEach(link => link.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    });
  }, { threshold: 0.25 });

  moduleSections.forEach(section => observer.observe(section));

  const buildStamp = document.getElementById('buildStamp');
  if (buildStamp && buildStamp.dataset.build) {
    buildStamp.textContent = `Build do site: ${buildStamp.dataset.build}`;
  }
});
