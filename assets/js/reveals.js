export function initReveals(){
  const apply = () => {
    document.querySelectorAll('.reveal').forEach(el => {
      const winH = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      if (top < winH - 150) el.classList.add('active');
    });
  };
  window.addEventListener('scroll', apply);
  document.addEventListener('DOMContentLoaded', apply);
}
