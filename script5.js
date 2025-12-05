// script.js
// Rendre les noms cliquables et mettre la bonne mise en valeur
(function(){
  const names = Array.from(document.querySelectorAll('.products .name'));
  const hero = document.getElementById('heroImage');
  if (!hero || names.length === 0) return;

  function hideImage(){ hero.style.opacity = '0'; }
  function swapImage(src){
    if (!src) return hideImage();
    hero.style.transition = 'opacity 180ms ease';
    hero.src = src;
    requestAnimationFrame(() => hero.style.opacity = '1');
  }

  names.forEach(name => {
    name.addEventListener('mouseenter', () => swapImage(name.dataset.src));
    name.addEventListener('mouseleave', hideImage);

    // Ouvrir dans la même fenêtre
    name.addEventListener('click', () => {
      const link = name.dataset.link;
      if (link) window.location.href = link; // même fenêtre
    });

    name.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        name.click();
      }
    });
  });
})();