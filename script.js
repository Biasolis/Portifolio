(function () {
  // Ano no rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Tema (claro por padrão, escuro opcional e persistido)
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var icon = toggle ? toggle.querySelector('i') : null;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    } else {
      root.removeAttribute('data-theme');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* localStorage indisponível */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignora */ }
    });
  }

  // Animação de revelação ao rolar
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Botão "voltar ao topo"
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) toTop.classList.add('visible');
      else toTop.classList.remove('visible');
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
