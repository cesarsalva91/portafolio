export function initIntro({
  text1 = 'hello word',
  text2 = "I'm César",
  typeMs = 120,
  waitAfter1 = 1000,   // pausa después de texto1
  waitBeforeFade = 2000, // pausa después del segundo texto
  fadeMs = 2000
} = {}) {
  const target = document.getElementById('type');
  const intro = document.getElementById('intro');
  const portfolio = document.getElementById('portfolio');
  if (!target || !intro || !portfolio) return;

  // escribe primer texto
  let i = 0;
  function typeText1() {
    if (i < text1.length) {
      target.textContent += text1.charAt(i++);
      setTimeout(typeText1, typeMs);
    } else {
      // cuando termina → pausa → borrar
      setTimeout(deleteText, waitAfter1);
    }
  }

  // borra texto
  function deleteText() {
    if (target.textContent.length > 0) {
      target.textContent = target.textContent.slice(0, -1);
      setTimeout(deleteText, typeMs / 2);
    } else {
      // cuando termina de borrar → escribir segundo texto
      i = 0;
      setTimeout(typeText2, 400);
    }
  }

  // escribe segundo texto
  function typeText2() {
    if (i < text2.length) {
      target.textContent += text2.charAt(i++);
      setTimeout(typeText2, typeMs);
    } else {
      // cuando termina → esperar y hacer fade al portafolio
      setTimeout(() => {
        portfolio.classList.remove('fade-in');
        intro.offsetHeight; // forzar reflow
        intro.classList.add('fade-out');
        intro.addEventListener('transitionend', () => {
          intro.classList.add('hidden');
          portfolio.classList.add('fade-in');
        }, { once: true });

        // Fallback por si transitionend no dispara
        setTimeout(() => {
          if (!intro.classList.contains('hidden')) {
            intro.classList.add('hidden');
            portfolio.classList.add('fade-in');
          }
        }, fadeMs + 100);

      }, waitBeforeFade);
    }
  }

  typeText1();
}
