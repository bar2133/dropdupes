// Light / dark switch. Light is always the default, whatever the system setting; the nav button turns dark mode
// on and off, and the choice is remembered in this browser. Loaded in <head> so the saved theme applies before paint.
(() => {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch {}
  const apply = dark => {
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000000' : '#f2f2f7');
    document.querySelectorAll('.theme-toggle').forEach(b => b.setAttribute('aria-pressed', String(dark)));
  };
  apply(saved === 'dark');
  document.addEventListener('DOMContentLoaded', () => apply(root.dataset.theme === 'dark'));
  document.addEventListener('click', e => {
    if (!e.target.closest('.theme-toggle')) return;
    const dark = root.dataset.theme !== 'dark';
    apply(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  });
})();
