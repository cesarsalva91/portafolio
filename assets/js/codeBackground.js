const demoCode = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mi Portafolio - Cesar</title>
  <link rel="stylesheet" href="style.css" />
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <!-- Si llegaste hasta aquí, ya sabes demasiado -->
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

    <!-- Mensaje oculto: el verdadero secreto está en el café -->
`;

export function initCodeBackground(code = demoCode){
  const el = document.getElementById('code-background');
  if (!el) return;
  const arr = code.split('');
  const update = () => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const pct = window.scrollY / maxScroll;
    const n = Math.floor(pct * arr.length);
    el.textContent = arr.slice(0, n).join('');
  };
  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  document.addEventListener('DOMContentLoaded', update);
}
