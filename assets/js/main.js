
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('.faq-item summary').forEach(summary => {
    const details = summary.parentElement;
    const indicator = summary.querySelector('[data-faq-icon]');
    const sync = () => { if (indicator) indicator.textContent = details.open ? '＋' : '＋'; };
    sync();
    details.addEventListener('toggle', sync);
  });
});
