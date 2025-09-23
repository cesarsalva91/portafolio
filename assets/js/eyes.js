export function initEyes(){
  const sphere = document.getElementById('sphere');
  const eyes = document.querySelectorAll('.eye');
  if (!sphere || eyes.length === 0) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    // luz dinámica
    sphere.style.background =
      `radial-gradient(circle at ${50 + x*40}% ${50 + y*40}%, #40c9ff, #00264d 70%)`;

    const offsetX = x * 40, offsetY = y * 40;
    eyes.forEach(eye => eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`);
  });
}
