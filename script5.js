// script.js
// Rendre les noms cliquables et mettre la bonne mise en valeur
(function(){
  const names = Array.from(document.querySelectorAll('.products .name'));
  const hero = document.getElementById('heroImage');
  if (!hero || names.length === 0) return;

  let autoSlideInterval = null;
  let currentIndex = 0;
  let isHovering = false;

  function hideImage(){ 
    if (!isHovering) {
      hero.style.opacity = '0'; 
    }
  }

  function swapImage(src){
    if (!src) return hideImage();
    hero.style.transition = 'opacity 180ms ease';
    hero.src = src;
    requestAnimationFrame(() => hero.style.opacity = '1');
  }

  function startAutoSlide() {
    if (autoSlideInterval) return;
    
    autoSlideInterval = setInterval(() => {
      if (!isHovering) {
        currentIndex = (currentIndex + 1) % names.length;
        const src = names[currentIndex].dataset.src;
        if (src) swapImage(src);
      }
    }, 1500); // Change d'image toutes les 3 secondes
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  names.forEach((name, index) => {
    name.addEventListener('mouseenter', () => {
      isHovering = true;
      stopAutoSlide();
      swapImage(name.dataset.src);
    });

    name.addEventListener('mouseleave', () => {
      isHovering = false;
      currentIndex = index;
      startAutoSlide();
    });

    // Ouvrir dans la même fenêtre
    name.addEventListener('click', () => {
      const link = name.dataset.link || name.getAttribute('href');
      if (link) window.location.href = link;
    });

    name.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        name.click();
      }
    });
  });

  // Démarrer le diaporama automatique au chargement
  startAutoSlide();
})();