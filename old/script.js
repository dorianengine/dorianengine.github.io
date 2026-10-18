// Filtre SVG qui déforme les lignes du fond en vagues (animé lentement)
document.body.insertAdjacentHTML('afterbegin', `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="wave" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.0012 0.004" numOctaves="1" seed="4" result="noise">
        <animate attributeName="baseFrequency" dur="45s" repeatCount="indefinite"
                 values="0.0012 0.004; 0.0022 0.006; 0.0012 0.004"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="420" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </svg>`);

// Menu : met en avant la page en cours
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === here));

// Titres : la taille du texte s'ajuste pour remplir toute la largeur de la box
function fitTitles() {
  document.querySelectorAll('.top-row .title-box, .game .title-box, .cols .title-box').forEach(b => {
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
