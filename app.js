const gridButton = document.querySelector('.grid-toggle');
const gridState = document.querySelector('[data-grid-state]');

if (gridButton && gridState) {
  gridButton.addEventListener('click', () => {
    const on = document.body.classList.toggle('show-grid');
    gridButton.setAttribute('aria-pressed', String(on));
    gridState.textContent = on ? 'on' : 'off';
  });
}

const progress = document.querySelector('.nav__progress');
const navLinks = [...document.querySelectorAll('.nav__link[data-section]')];
const sectionMap = [
  ['work', 'work'],
  ['nesesis', 'work'],
  ['ollx', 'work'],
  ['method', 'method'],
  ['index', 'index'],
];

let raf = 0;
function frame() {
  raf = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;

  let current = '';
  for (const [id, nav] of sectionMap) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) current = nav;
  }
  for (const link of navLinks) {
    if (link.dataset.section === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
schedule();
