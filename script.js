// === Animaciones de aparición al cargar y al hacer scroll ===
(function () {
    var elementos = document.querySelectorAll('.animar');
    if (!elementos.length) return;

    function mostrarSiVisible(el) {
        var rect = el.getBoundingClientRect();
        var ventanaAlto = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < ventanaAlto && rect.bottom > 0) {
            el.classList.add('visible');
            return true;
        }
        return false;
    }

    // 1. Animación al cargar: elementos que ya están visibles
    elementos.forEach(function (el) {
        mostrarSiVisible(el);
    });

    // 2. Animación al hacer scroll
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(function (el) {
        if (!el.classList.contains('visible')) {
            observer.observe(el);
        }
    });
})();

// === Navbar y menú hamburguesa ===
(function () {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('nav-menu');
    var nav = document.querySelector('nav');
    if (!toggle || !menu || !nav) return;

    // Abrir/cerrar menú hamburguesa
    toggle.addEventListener('click', function () {
        var isActive = menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
        ajustarPadding();
    });

    // Cerrar menú al hacer click en un link
    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            ajustarPadding();
        });
    }

    // Navbar fixed: compensar altura
    function ajustarPadding() {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    }
    ajustarPadding();
    window.addEventListener('resize', ajustarPadding);
    window.addEventListener('load', ajustarPadding);

    // Sombra extra al hacer scroll
    var scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(function () {
            scrollTimeout = null;
            if (window.scrollY > 10) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        }, 10);
    });
})();
