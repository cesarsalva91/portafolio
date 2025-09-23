// === Intro con typewriter y transición robusta ===
(function(){
  const TEXT = 'hello word';         // Cambiá a 'hello world' si querés :)
  const TYPE_MS = 120;
  const INTRO_WAIT_MS = 2000;        // Mostrar intro 5s antes del fade
  const FADE_MS = 2000;              // Duración del fade (igual al CSS)

  const target = document.getElementById('type');

  // Si el script cargó antes del DOM por alguna razón, reintenta al DOMContentLoaded.
  if (!target) {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  function init(){
    // Typewriter
    let i = 0;
    (function typeNext(){
      if (i < TEXT.length) {
        target.textContent += TEXT.charAt(i++);
        setTimeout(typeNext, TYPE_MS);
      }
    })();

    // Al cabo de INTRO_WAIT_MS: fade-out del intro y fade-in del portafolio
    setTimeout(() => {
      const intro = document.getElementById('intro');
      const portfolio = document.getElementById('portfolio');
      if (!intro || !portfolio) return;

      // Aseguramos estado inicial del portfolio por si hubo recargas parciales
      portfolio.classList.remove('fade-in');

      // Forzamos reflow para garantizar que el navegador registre el estado actual
      // antes de aplicar la clase que dispara la transición.
      // eslint-disable-next-line no-unused-expressions
      intro.offsetHeight;

      // Disparamos fade-out
      intro.classList.add('fade-out');

      // Cuando termina la transición de opacidad del intro:
      const onEnd = (ev) => {
        if (ev.propertyName !== 'opacity') return;
        intro.removeEventListener('transitionend', onEnd);
        intro.classList.add('hidden');      // sacamos del flujo
        portfolio.classList.add('fade-in'); // mostramos el portafolio (fade-in)
      };
      intro.addEventListener('transitionend', onEnd);

      // Fallback por si 'transitionend' no dispara (algunos navegadores/condiciones)
      setTimeout(() => {
        if (!intro.classList.contains('hidden')) {
          intro.classList.add('hidden');
          portfolio.classList.add('fade-in');
        }
      }, FADE_MS + 150); // pequeño margen
    }, INTRO_WAIT_MS);
  }
})();


// === Animaciones reveal al hacer scroll ===
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal);

// === Fondo animado de "código" ===
const codeText = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mi Portafolio - Cesar</title>
  <link rel="stylesheet" href="style.css" />
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>
<body>
   <!-- Intro -->
  <div id="intro">
    <div class="type-row">
      <span class="prompt">&gt;_ </span><span id="type"></span><span class="cursor">_</span>
    </div>
  </div>

  <!-- Portafolio -->
  <div id="portfolio">
    <!-- Fondo animado de código -->
    <div id="code-background"></div>

    <!-- Header -->
    <header>
      <nav>
        <h1>Mi Portafolio</h1>
        <ul>
          <li><a href="#about">Sobre mí</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero -->
    <section id="hero">
      <h2>Hola, soy Cesar</h2>
      <div class="sphere" id="sphere">
        <div class="eye left"></div>
        <div class="eye right"></div>
      </div>
      <p>Desarrollador Web | Backend & Frontend</p>
      <a href="#projects" class="btn">Ver mis proyectos</a>
    </section>

`;
const codeBackground = document.getElementById("code-background");
if (codeBackground) {
  const codeArray = codeText.split("");
  const updateBg = () => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = window.scrollY / maxScroll;
    const charsToShow = Math.floor(scrollPercent * codeArray.length);
    codeBackground.textContent = codeArray.slice(0, charsToShow).join("");
  };
  window.addEventListener("scroll", updateBg);
  window.addEventListener("resize", updateBg);
  document.addEventListener("DOMContentLoaded", updateBg);
}

// === Esfera con ojos ===
const sphere = document.getElementById('sphere');
const eyes = document.querySelectorAll('.eye');
if (sphere && eyes.length > 0) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    sphere.style.background =
      `radial-gradient(circle at ${50 + x*40}% ${50 + y*40}%, #40c9ff, #00264d 70%)`;
    const offsetX = x * 40, offsetY = y * 40;
    eyes.forEach(eye => eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`);
  });
}
