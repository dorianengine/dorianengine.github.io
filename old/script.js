// Menu : met en avant la page en cours selon le scroll
const links = [...document.querySelectorAll('nav a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      links.forEach(l => l.classList.toggle('on', l.hash === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => io.observe(s));

// Formulaire : pour l'instant, on affiche juste une confirmation.
// À brancher plus tard sur un vrai service (Formspree, EmailJS, etc.)
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent (demo)!');
  e.target.reset();
});

// Titres : la taille du texte s'ajuste pour remplir toute la largeur de la box
function fitTitles() {
  document.querySelectorAll('.top-row .title-box, .game .title-box').forEach(b => {
    let lo = 16, hi = 52;   /* taille max : plus petit = titres moins gros */
    while (hi - lo > 1) {
      const m = (lo + hi) / 2;
      b.style.fontSize = m + 'px';
      b.scrollWidth > b.clientWidth ? hi = m : lo = m;
    }
    b.style.fontSize = lo + 'px';
  });
}
document.fonts.ready.then(fitTitles);
addEventListener('resize', fitTitles);
