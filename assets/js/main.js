/* ==========================================================================
   CGE-ES — Lógica del sitio
   --------------------------------------------------------------------------
   Orden de carga en el HTML:
     1. layout.js     → datos de la entidad, cabecera y pie
     2. contenido.js  → noticias
     3. i18n.js       → traducciones a francés e inglés
     4. main.js       → este archivo
   ========================================================================== */

(function () {
  'use strict';

  var IDIOMAS   = ['es', 'fr'];
  var POR_DEFECTO = 'es';
  var CLAVE_LS  = 'cge-idioma';

  /* Textos originales en español, guardados antes de traducir */
  var originales = new Map();
  var idiomaActual = POR_DEFECTO;

  /* ========================================================================
     1. Idioma
     ====================================================================== */

  function detectarIdioma() {
    var url = new URLSearchParams(window.location.search).get('lang');
    if (url && IDIOMAS.indexOf(url) !== -1) return url;

    try {
      var guardado = localStorage.getItem(CLAVE_LS);
      if (guardado && IDIOMAS.indexOf(guardado) !== -1) return guardado;
    } catch (e) { /* modo privado sin localStorage */ }

    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    if (IDIOMAS.indexOf(nav) !== -1) return nav;

    return POR_DEFECTO;
  }

  function traducir(clave) {
    var dic = window.CGE_I18N && window.CGE_I18N[idiomaActual];
    return dic && dic[clave] ? dic[clave] : null;
  }

  function aplicarIdioma(idioma) {
    idiomaActual = IDIOMAS.indexOf(idioma) !== -1 ? idioma : POR_DEFECTO;
    document.documentElement.lang = idiomaActual;

    /* Contenido de los elementos */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var clave = el.getAttribute('data-i18n');
      if (!originales.has(el)) originales.set(el, el.innerHTML);

      var t = traducir(clave);
      el.innerHTML = (idiomaActual === 'es' || !t) ? originales.get(el) : t;
    });

    /* Atributos traducibles: data-i18n-attr="content:clave,placeholder:clave" */
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (par) {
        var t2 = par.split(':');
        var attr = t2[0].trim();
        var clave = t2[1].trim();
        var guardaEn = 'data-orig-' + attr;

        if (!el.hasAttribute(guardaEn)) el.setAttribute(guardaEn, el.getAttribute(attr) || '');

        var t = traducir(clave);
        el.setAttribute(attr, (idiomaActual === 'es' || !t) ? el.getAttribute(guardaEn) : t);
      });
    });

    /* Botones del selector */
    document.querySelectorAll('.selector-idioma__btn').forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-idioma') === idiomaActual ? 'true' : 'false');
    });

    /* Vuelve a pintar lo que se genera por JS */
    pintarNoticias();
    pintarLogros();
    pintarDocumentos();
    pintarNoticiaDetalle();
    pintarEventoDetalle();
    pintarDirectorio();

    document.dispatchEvent(new CustomEvent('cge:idioma', { detail: { idioma: idiomaActual } }));
  }

  function cambiarIdioma(idioma) {
    try { localStorage.setItem(CLAVE_LS, idioma); } catch (e) { /* noop */ }

    var url = new URL(window.location.href);
    if (idioma === POR_DEFECTO) url.searchParams.delete('lang');
    else url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);

    aplicarIdioma(idioma);
  }

  /* ========================================================================
     2. Navegación
     ====================================================================== */

  function initNavegacion() {
    var nav   = document.getElementById('nav-principal');
    var boton = document.querySelector('.hamburguesa');
    var velo  = document.querySelector('.velo');
    if (!nav || !boton) return;

    function cerrar() {
      nav.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('nav-abierto');
      if (velo) { velo.classList.remove('visible'); velo.hidden = true; }
    }

    function abrir() {
      nav.classList.add('abierto');
      boton.setAttribute('aria-expanded', 'true');
      boton.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('nav-abierto');
      if (velo) { velo.hidden = false; requestAnimationFrame(function () { velo.classList.add('visible'); }); }
    }

    boton.addEventListener('click', function () {
      nav.classList.contains('abierto') ? cerrar() : abrir();
    });

    if (velo) velo.addEventListener('click', cerrar);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) { cerrar(); boton.focus(); }
    });

    /* Con el visor abierto, + y - hacen zoom y 0 lo devuelve al 100 %. */
    document.addEventListener('keydown', function (e) {
      if (!visorDoc || !visorDoc.hasAttribute('open')) return;
      if (visorDoc.querySelector('[data-visor-opciones]').hidden) return;
      if (e.key === '+' || e.key === '=') { e.preventDefault(); aplicarZoom(1); }
      if (e.key === '-') { e.preventDefault(); aplicarZoom(-1); }
      if (e.key === '0') { e.preventDefault(); visorZoom = 2; visorVista = 'ancho'; pintarEstadoVisor(); }
    });

    /* En móvil, el enlace con submenú despliega en lugar de navegar */
    nav.querySelectorAll('.nav__item--desplegable > .nav__enlace').forEach(function (enlace) {
      enlace.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault();
          enlace.parentElement.classList.toggle('abierto');
        }
      });
    });

    /* Al pulsar cualquier otro enlace del menú, se cierra */
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!a.parentElement.classList.contains('nav__item--desplegable')) cerrar();
      });
    });

    window.addEventListener('resize', function () {
      if (!window.matchMedia('(max-width: 900px)').matches) cerrar();
    });
  }

  /* Empujón al vídeo de fondo del hero.

     `autoplay muted` basta en condiciones normales, pero no siempre arranca:
     un documento oculto —pestaña en segundo plano, ventana minimizada— no
     reproduce vídeo, y algunos modos de ahorro de datos rechazan el play().
     Cuando eso pasa se queda el primer fotograma congelado y parece que el
     vídeo no está.

     Así que se reintenta cuando la pestaña se hace visible y al primer gesto
     del usuario. Si el play() se rechaza igualmente, queda el `poster`, que
     es una imagen del propio vídeo: el fondo nunca se ve vacío. */
  function initVideoHero() {
    var v = document.querySelector('.hero__video');
    if (!v) return;
    /* Si el sistema pide menos animación, el CSS lo esconde: no se toca. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var intentos = 0;
    function arrancar() {
      if (!v.paused || intentos > 6) return;
      intentos++;
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* queda el poster */ });
    }

    arrancar();
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') arrancar();
    });
    window.addEventListener('pageshow', arrancar);
    /* Un gesto cualquiera desbloquea el play en los navegadores que lo piden */
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
      document.addEventListener(ev, arrancar, { once: true, passive: true });
    });
  }

  function initCabeceraFija() {
    var cabecera = document.querySelector('.cabecera');
    if (!cabecera) return;
    var ultimo = -1;

    function comprobar() {
      var fija = window.scrollY > 8;
      if (fija !== ultimo) {
        cabecera.classList.toggle('esta-fija', fija);
        ultimo = fija;
      }
    }
    comprobar();
    window.addEventListener('scroll', comprobar, { passive: true });
  }

  /* ========================================================================
     3. Acordeón
     ====================================================================== */

  function initAcordeon() {
    document.querySelectorAll('[data-acordeon] .acordeon__boton').forEach(function (boton) {
      var panel = boton.nextElementSibling;
      if (!panel) return;

      var id = 'panel-' + Math.random().toString(36).slice(2, 9);
      panel.id = id;
      boton.setAttribute('aria-controls', id);

      boton.addEventListener('click', function () {
        var abierto = boton.getAttribute('aria-expanded') === 'true';
        boton.setAttribute('aria-expanded', abierto ? 'false' : 'true');
        panel.setAttribute('data-abierto', abierto ? 'false' : 'true');
      });
    });
  }

  /* ========================================================================
     4. Aparición al hacer scroll
     ====================================================================== */

  function initRevelar() {
    var elementos = document.querySelectorAll('.revelar');
    if (!elementos.length) return;

    if (!('IntersectionObserver' in window)) {
      elementos.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    elementos.forEach(function (el) { obs.observe(el); });
  }

  /* ========================================================================
     5. Noticias
     ====================================================================== */

  var filtroActivo = 'todas';

  function formatearFecha(iso) {
    var loc = { es: 'es-ES', fr: 'fr-FR' }[idiomaActual];
    try {
      return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' })
        .format(new Date(iso + 'T00:00:00'));
    } catch (e) { return iso; }
  }

  function tarjetaNoticia(n) {
    var C = window.CGE_CONTENIDO;
    var cat = C.categorias[n.categoria] || {};
    var txt = n[idiomaActual] || n.es;
    var etiqueta = cat[idiomaActual] || cat.es || n.categoria;

    /* Solo se ofrece «leer más» si la ficha tiene cuerpo escrito. Un enlace
       que lleva a una página vacía es peor que no tener enlace. */
    var flecha = '';
    var destino = enlaceNoticia(n);
    if (destino) {
      flecha = '<a class="enlace-flecha" href="' + destino + '">' +
        (traducir('comun.leermas') || 'Leer más') +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
    }

    var etiquetaHTML = '<span class="etiqueta ' + (cat.clase || '') + '">' + etiqueta + '</span>';

    return '' +
      '<article class="noticia" data-categoria="' + n.categoria + '">' +
        /* Con portada, la etiqueta y el titular van SOBRE la imagen, con un
           velo oscuro por encima para que se lean: una foto de un acto no
           tiene un sitio previsible donde el texto contraste. Sin portada,
           se queda la banda con el emblema y el titular debajo. */
        (n.portada
          ? '<div class="noticia__portada">' +
              '<img src="' + n.portada + '" alt="" loading="lazy">' +
              '<div class="noticia__sobreimpreso">' +
                '<div class="noticia__meta">' + etiquetaHTML +
                  (n.fecha ? '<time datetime="' + n.fecha + '">' + formatearFecha(n.fecha) + '</time>' : '') +
                  (n.proximo ? '<span class="etiqueta etiqueta--oro">' + (traducir('ev.proximo') || 'Próximo') + '</span>' : '') +
                '</div>' +
                '<h3>' + (destino ? '<a href="' + destino + '">' + txt.titulo + '</a>' : txt.titulo) + '</h3>' +
              '</div>' +
            '</div>' +
            '<div class="noticia__cuerpo">' +
              '<p>' + txt.resumen + '</p>' +
              (flecha ? '<div style="margin-top:auto;padding-top:14px">' + flecha + '</div>' : '') +
            '</div>'
          : '<div class="noticia__media">' +
              '<img src="assets/img/logo.svg" alt="" width="62" height="62" loading="lazy">' +
            '</div>' +
            '<div class="noticia__cuerpo">' +
              '<div class="noticia__meta">' + etiquetaHTML +
                /* La fecha es opcional: sin ella, no se pinta el <time> */
                (n.fecha
                  ? '<time class="noticia__fecha" datetime="' + n.fecha + '">' + formatearFecha(n.fecha) + '</time>'
                  : '') +
                (n.proximo ? '<span class="etiqueta etiqueta--oro">' + (traducir('ev.proximo') || 'Próximo') + '</span>' : '') +
              '</div>' +
              '<h3>' + (destino ? '<a href="' + destino + '">' + txt.titulo + '</a>' : txt.titulo) + '</h3>' +
              '<p>' + txt.resumen + '</p>' +
              (flecha ? '<div style="margin-top:auto;padding-top:18px">' + flecha + '</div>' : '') +
            '</div>') +
      '</article>';
  }

  /* Devuelve la URL de la noticia, o '' si no hay nada que abrir.
     `enlace` sigue funcionando por si algún día se apunta a algo externo. */
  function enlaceNoticia(n) {
    if (n.enlace) return n.enlace;
    if (n.tipo === 'logro' || !n.id) return '';
    /* Un evento siempre tiene página: aunque no haya cuerpo escrito, hay
       fotos o documentos que enseñar. */
    if (n.tipo === 'evento') return 'evento.html?id=' + encodeURIComponent(n.id);
    var txt = n[idiomaActual] || n.es;
    var cuerpo = txt && txt.cuerpo;
    if (!cuerpo || !cuerpo.length) return '';
    return 'noticia.html?id=' + encodeURIComponent(n.id);
  }

  /* `oculto: true` deja una ficha fuera de la web sin borrarla, para lo que
     todavía no tiene material. Se filtra aquí, en un solo sitio, para que no
     se cuele en la portada, en Actualidad ni en los logros. */
  function visible(n) { return !n.oculto; }

  function soloNoticias(lista) {
    return lista.filter(function (n) { return n.tipo !== 'logro' && visible(n); });
  }

  function pintarNoticias() {
    var C = window.CGE_CONTENIDO;
    if (!C) return;

    /* Se respeta el orden del archivo contenido.js: lo primero de la lista es
       lo primero que se ve. Así no hace falta que todo tenga fecha.
       Los logros se quedan fuera: viven en «El Consejo». */
    var lista = soloNoticias(C.noticias);

    var home = document.querySelector('[data-noticias-home]');
    if (home) home.innerHTML = lista.slice(0, 3).map(tarjetaNoticia).join('');

    var todas = document.querySelector('[data-noticias-todas]');
    if (todas) {
      var filtradas = filtroActivo === 'todas'
        ? lista
        : lista.filter(function (n) { return n.categoria === filtroActivo; });

      todas.innerHTML = filtradas.map(tarjetaNoticia).join('');

      var vacio = document.querySelector('[data-sin-resultados]');
      if (vacio) vacio.hidden = filtradas.length > 0;
    }

    var aviso = document.querySelector('[data-aviso-ejemplo]');
    if (aviso) aviso.hidden = !C.noticiasDeEjemplo;
  }

  /* ========================================================================
     5 pre. Documentos de origen y su visor
     ------------------------------------------------------------------------
     Los documentos se sirven como imágenes por página, no como PDF (ver
     contenido.js → documentos). El visor las muestra en una capa sobre la
     página y se cierra con la ✕, con Escape o pulsando fuera.

     Las imágenes se crean al abrir, no al cargar la página: son 35 y pesan
     4,6 MB en total, así que cargarlas de entrada por si acaso sería
     regalar el ancho de banda de todo el que entre en esta página.
     ====================================================================== */

  var visorDoc = null;      // el <dialog> una vez creado
  var visorFoco = null;     // a quién devolver el foco al cerrar

  /* Zoom y modo de vista del visor.

     El zoom no usa transform: scale() porque entonces la hoja se sale del
     contenedor y el scroll no la alcanza. Se cambia el ANCHO de la hoja, que
     es lo que reflowea de verdad y deja el scroll funcionando. */
  var ZOOMS = [50, 75, 100, 125, 150, 200, 300];
  var visorZoom = 2;        // índice en ZOOMS: 100%
  var visorVista = 'ancho'; // 'ancho' | 'pagina' | 'doble'

  function pintarEstadoVisor() {
    if (!visorDoc) return;
    var hojas = visorDoc.querySelector('.visor__hojas');
    hojas.setAttribute('data-vista', visorVista);
    hojas.style.setProperty('--zoom', ZOOMS[visorZoom] + '%');
    visorDoc.querySelector('[data-visor-nivel]').textContent = ZOOMS[visorZoom] + '%';
    visorDoc.querySelectorAll('[data-vista]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-vista') === visorVista ? 'true' : 'false');
    });
    /* En «página completa» el zoom lo manda la altura, así que los botones
       de ampliar y reducir no pintan nada y se apagan. */
    visorDoc.querySelectorAll('[data-zoom]').forEach(function (b) {
      b.disabled = visorVista === 'pagina';
    });
  }

  function aplicarZoom(delta) {
    visorZoom = Math.max(0, Math.min(ZOOMS.length - 1, visorZoom + delta));
    if (visorVista === 'pagina') visorVista = 'ancho';
    pintarEstadoVisor();
  }

  function aplicarVista(v) {
    visorVista = v;
    if (v === 'pagina' || v === 'doble') visorZoom = 2;
    pintarEstadoVisor();
  }

  function formatearFechaDoc(f) {
    if (!f) return '';
    var partes = f.split('-');
    var meses = idiomaActual === 'fr'
      ? ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
      : ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var mes = meses[parseInt(partes[1], 10) - 1] || '';
    /* Algunos documentos solo llevan mes y año: no se inventa un día. */
    if (partes.length < 3) return mes + ' ' + partes[0];
    var dia = partes[2].replace(/^0/, '');
    /* En francés la fecha no lleva preposiciones: «25 août 2023», no
       «25 de août de 2023», que es como salía al calcar el español. */
    return idiomaActual === 'fr'
      ? dia + ' ' + mes + ' ' + partes[0]
      : dia + ' de ' + mes + ' de ' + partes[0];
  }

  /* La fuente casi siempre es la misma en los dos idiomas (MATD, MAEIAGE,
     CGE-ES). Solo la Embajada cambia, así que lleva `fuenteFr`. */
  function fuenteDe(d) {
    return (idiomaActual === 'fr' && d.fuenteFr) ? d.fuenteFr : d.fuente;
  }

  function pintarDocumentos() {
    var caja = document.querySelector('[data-documentos]');
    if (!caja) return;

    /* Solo los de origen. Los documentos de los eventos están en el mismo
       array, pero se ven en la página de su evento: aquí desordenaban una
       lista que es la de los papeles que amparan la creación del Consejo. */
    var lista = ((window.CGE_CONTENIDO && window.CGE_CONTENIDO.documentos) || [])
      .filter(function (d) { return d.origen; });
    if (!lista.length) { caja.innerHTML = ''; return; }

    /* En «El Consejo» van en rejilla, para ver los diez de un vistazo. En la
       página de un evento son uno o tres y se quedan en lista. */
    var enRejilla = caja.hasAttribute('data-documentos');

    /* El contador del resumen: plegado y sin número, nadie lo abre. */
    var cuenta = document.querySelector('[data-documentos-cuenta]');
    if (cuenta) cuenta.textContent = '(' + lista.length + ')';

    caja.innerHTML = '<ul class="docs' + (enRejilla ? ' docs--rejilla' : '') + '">' + lista.map(function (d) {
      var titulo = d[idiomaActual] || d.es;
      var hojas = d.paginas + ' ' + (d.paginas === 1
        ? (traducir('doc.pagina') || 'página')
        : (traducir('doc.paginas') || 'páginas'));
      return '' +
        '<li>' +
          '<button class="docs__item" type="button" data-abrir-doc="' + d.id + '">' +
            '<span class="docs__icono" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>' +
            '</span>' +
            '<span class="docs__texto">' +
              '<span class="docs__titulo">' + titulo + '</span>' +
              '<span class="docs__meta">' + fuenteDe(d) + ' · ' + formatearFechaDoc(d.fecha) + ' · ' + hojas + '</span>' +
            '</span>' +
          '</button>' +
        '</li>';
    }).join('') + '</ul>';
  }

  function crearVisor() {
    if (visorDoc) return visorDoc;
    var d = document.createElement('dialog');
    d.className = 'visor';
    d.innerHTML =
      '<div class="visor__barra">' +
        '<div class="visor__titulo"></div>' +
        '<div class="visor__opciones" data-visor-opciones>' +
          '<button class="visor__op" type="button" data-zoom="-1" aria-label="' + (traducir('vis.menos') || 'Reducir') + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>' +
          '</button>' +
          '<span class="visor__nivel" data-visor-nivel>100%</span>' +
          '<button class="visor__op" type="button" data-zoom="1" aria-label="' + (traducir('vis.mas') || 'Ampliar') + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
          '</button>' +
          '<span class="visor__sep" aria-hidden="true"></span>' +
          '<button class="visor__op visor__op--txt" type="button" data-vista="ancho">' +
            (traducir('vis.ancho') || 'Ajustar al ancho') + '</button>' +
          '<button class="visor__op visor__op--txt" type="button" data-vista="pagina">' +
            (traducir('vis.pagina') || 'Página completa') + '</button>' +
          '<button class="visor__op visor__op--txt" type="button" data-vista="doble">' +
            (traducir('vis.doble') || 'Dos columnas') + '</button>' +
        '</div>' +
        '<button class="visor__cerrar" type="button" aria-label="Cerrar">&times;</button>' +
      '</div>' +
      '<div class="visor__hojas"></div>';
    document.body.appendChild(d);

    d.querySelector('.visor__cerrar').addEventListener('click', function () { cerrarVisor(); });

    d.querySelector('[data-visor-opciones]').addEventListener('click', function (e) {
      var z = e.target.closest('[data-zoom]');
      if (z) { aplicarZoom(parseInt(z.getAttribute('data-zoom'), 10)); return; }
      var v = e.target.closest('[data-vista]');
      if (v) aplicarVista(v.getAttribute('data-vista'));
    });
    /* Pulsar el fondo cierra. Se compara con el propio <dialog> porque el
       ::backdrop no recibe eventos: el click de fuera aterriza en él. */
    d.addEventListener('click', function (e) { if (e.target === d) cerrarVisor(); });
    d.addEventListener('cancel', function (e) { e.preventDefault(); cerrarVisor(); });
    visorDoc = d;
    return d;
  }

  function abrirVisor(id) {
    var lista = (window.CGE_CONTENIDO && window.CGE_CONTENIDO.documentos) || [];
    var doc = lista.filter(function (x) { return x.id === id; })[0];
    if (!doc) return;

    var d = crearVisor();
    var titulo = doc[idiomaActual] || doc.es;

    d.querySelector('.visor__titulo').innerHTML =
      '<strong>' + titulo + '</strong>' +
      '<span>' + fuenteDe(doc) + ' · ' + formatearFechaDoc(doc.fecha) + '</span>';

    var hojas = '';
    for (var i = 1; i <= doc.paginas; i++) {
      hojas += '<figure><img src="assets/img/docs/' + doc.id + '-' + i + '.webp"' +
               ' alt="' + titulo + ' — ' + (traducir('doc.pagina') || 'página') + ' ' + i + '"' +
               ' loading="' + (i === 1 ? 'eager' : 'lazy') + '" draggable="false">' +
               '<figcaption>' + i + ' / ' + doc.paginas + '</figcaption></figure>';
    }
    d.querySelector('.visor__hojas').className = 'visor__hojas';
    d.querySelector('.visor__hojas').innerHTML = hojas;
    d.querySelector('.visor__hojas').scrollTop = 0;

    /* El CSS le da a cada hoja el hueco de un A4 para que no midan cero
       antes de cargar. Una vez cargada, se le quita y vale la proporción
       real del archivo, que no siempre es A4. */
    d.querySelectorAll('.visor__hojas img').forEach(function (img) {
      if (img.complete && img.naturalWidth) { img.style.aspectRatio = 'auto'; return; }
      img.addEventListener('load', function () { img.style.aspectRatio = 'auto'; }, { once: true });
    });
    d.querySelector('[data-visor-opciones]').hidden = false;
    visorZoom = 2; visorVista = 'ancho';
    pintarEstadoVisor();

    visorFoco = document.activeElement;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.body.classList.add('visor-abierto');
    d.querySelector('.visor__cerrar').focus();
  }

  /* El mismo <dialog> se reutiliza para ampliar una foto del carrusel: es
     la misma capa, la misma ✕ y el mismo Escape. */
  function abrirFoto(src, alt, pos) {
    var d = crearVisor();
    d.querySelector('.visor__titulo').innerHTML = '<strong>' + (alt || '') + '</strong>' +
      (pos ? '<span>' + pos + '</span>' : '');
    /* Para una foto suelta la barra no tiene sentido: no hay páginas ni
       columnas, y el navegador ya deja ampliarla. */
    d.querySelector('[data-visor-opciones]').hidden = true;
    d.querySelector('.visor__hojas').className = 'visor__hojas visor__hojas--foto';
    d.querySelector('.visor__hojas').innerHTML =
      '<figure><img src="' + src + '" alt="' + (alt || '') + '" draggable="false"></figure>';
    visorFoco = document.activeElement;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.body.classList.add('visor-abierto');
    d.querySelector('.visor__cerrar').focus();
  }

  function cerrarVisor() {
    if (!visorDoc) return;
    if (typeof visorDoc.close === 'function') visorDoc.close(); else visorDoc.removeAttribute('open');
    document.body.classList.remove('visor-abierto');
    /* Se vacía al cerrar para que el navegador suelte las imágenes. */
    visorDoc.querySelector('.visor__hojas').innerHTML = '';
    if (visorFoco && visorFoco.focus) visorFoco.focus();
  }

  function initDocumentos() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-abrir-doc]');
      if (b) { e.preventDefault(); abrirVisor(b.getAttribute('data-abrir-doc')); }
    });
  }

  /* ========================================================================
     5 quater. Página de un evento (evento.html?id=...)
     ------------------------------------------------------------------------
     Una plantilla que se rellena con el evento que pida la URL: cabecera con
     la portada, el texto, el carrusel de fotos y los documentos, que se
     abren en el mismo visor que los de origen.
     ====================================================================== */

  var carrusel = { fotos: [], i: 0, titulo: '' };

  function pintarCarrusel() {
    var caja = document.querySelector('[data-carrusel]');
    if (!caja || !carrusel.fotos.length) return;
    var total = carrusel.fotos.length;
    var i = carrusel.i;
    caja.querySelector('.carrusel__imagen img').src = carrusel.fotos[i];
    caja.querySelector('.carrusel__cuenta').textContent = (i + 1) + ' / ' + total;
    /* Con una sola foto no hay nada que pasar: se esconden las flechas. */
    caja.querySelectorAll('.carrusel__paso').forEach(function (b) { b.hidden = total < 2; });
    var puntos = caja.querySelector('.carrusel__puntos');
    if (puntos) {
      puntos.innerHTML = total < 2 ? '' : carrusel.fotos.map(function (_, k) {
        return '<button type="button" class="carrusel__punto' + (k === i ? ' es-actual' : '') +
               '" data-ir="' + k + '" aria-label="' + (k + 1) + '"></button>';
      }).join('');
    }
  }

  function moverCarrusel(delta) {
    var total = carrusel.fotos.length;
    if (!total) return;
    carrusel.i = (carrusel.i + delta + total) % total;
    pintarCarrusel();
  }

  function pintarEventoDetalle() {
    var caja = document.querySelector('[data-evento-detalle]');
    if (!caja) return;

    var C = window.CGE_CONTENIDO;
    var id = new URLSearchParams(window.location.search).get('id');
    var ev = ((C && C.noticias) || []).filter(function (x) {
      return x.id === id && x.tipo === 'evento' && visible(x);
    })[0];

    if (!ev) {
      caja.innerHTML =
        '<div class="panel-nota">' +
          '<strong>' + (traducir('ev.nohay.t') || 'No encontramos ese evento') + '</strong>' +
          '<span>' + (traducir('ev.nohay.p') || 'Puede que el enlace esté mal escrito o que ya no esté publicado.') + '</span>' +
        '</div>' +
        '<p style="margin-top:22px"><a class="btn btn--primario" href="actualidad.html">' +
          (traducir('noti.volver') || 'Volver a Actualidad') + '</a></p>';
      document.title = (traducir('ev.nohay.t') || 'Evento no encontrado') + ' · CGE-ES';
      return;
    }

    var txt = ev[idiomaActual] || ev.es;
    var cat = (C.categorias && C.categorias[ev.categoria]) || {};
    var etiqueta = cat[idiomaActual] || cat.es || ev.categoria;

    var meta = '<span class="etiqueta ' + (cat.clase || '') + '">' + etiqueta + '</span>';
    if (ev.fecha) meta += '<time datetime="' + ev.fecha + '">' + formatearFecha(ev.fecha) + '</time>';
    if (ev.proximo) meta += '<span class="etiqueta etiqueta--oro">' + (traducir('ev.proximo') || 'Próximo') + '</span>';

    var html = '';

    /* Cabecera. Con portada va sobre la foto con velo; sin ella, sobre el
       fondo navy de siempre, que es lo que hay cuando no hay fotos. */
    html += '<header class="ev-cabecera' + (ev.portada ? ' ev-cabecera--foto' : '') + '"' +
      (ev.portada ? ' style="background-image:url(' + ev.portada + ')"' : '') + '>' +
      '<div class="ev-cabecera__inner">' +
        '<div class="ev-cabecera__meta">' + meta + '</div>' +
        '<h1>' + txt.titulo + '</h1>' +
        '<p>' + txt.resumen + '</p>' +
      '</div>' +
    '</header>';

    html += '<div class="ev-cuerpo">';

    var cuerpo = (txt.cuerpo || []);
    if (cuerpo.length) {
      html += cuerpo.map(function (par) { return '<p>' + par + '</p>'; }).join('');
    }

    /* Vídeo. `preload="none"`: no se descargan los 4,9 MB hasta que alguien
       le da al play. El poster es una imagen de 28 KB. */
    if (ev.video) {
      html += '<section class="ev-video">' +
        '<h2 class="ev-subtitulo">' + (traducir('ev.video') || 'Vídeo') + '</h2>' +
        '<video controls preload="none" playsinline' +
          (ev.videoPoster ? ' poster="' + ev.videoPoster + '"' : '') + '>' +
          '<source src="' + ev.video + '" type="video/mp4">' +
        '</video>' +
      '</section>';
    }

    /* Carrusel */
    if (ev.fotos && ev.fotos.length) {
      html += '<section class="carrusel" data-carrusel aria-roledescription="carrusel">' +
        '<h2 class="ev-subtitulo">' + (traducir('ev.fotos') || 'Imágenes') + '</h2>' +
        '<div class="carrusel__marco">' +
          '<button class="carrusel__paso carrusel__paso--atras" type="button" data-carrusel-paso="-1"' +
            ' aria-label="' + (traducir('ev.anterior') || 'Anterior') + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>' +
          '</button>' +
          '<button class="carrusel__imagen" type="button" data-ampliar' +
            ' aria-label="' + (traducir('ev.ampliar') || 'Ampliar') + '">' +
            '<img src="" alt="' + txt.titulo + '" draggable="false">' +
          '</button>' +
          '<button class="carrusel__paso carrusel__paso--adelante" type="button" data-carrusel-paso="1"' +
            ' aria-label="' + (traducir('ev.siguiente') || 'Siguiente') + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>' +
          '</button>' +
          '<span class="carrusel__cuenta"></span>' +
        '</div>' +
        '<div class="carrusel__puntos"></div>' +
      '</section>';
    }

    /* Documentos del evento, en el visor de siempre */
    var docsEv = (ev.documentos || []).map(function (did) {
      return ((C.documentos || []).filter(function (d) { return d.id === did; })[0]);
    }).filter(Boolean);

    if (docsEv.length) {
      html += '<section class="ev-docs">' +
        '<h2 class="ev-subtitulo">' + (traducir('ev.docs') || 'Documentos del evento') + '</h2>' +
        '<ul class="docs">' + docsEv.map(function (d) {
          var titulo = d[idiomaActual] || d.es;
          var hojas = d.paginas + ' ' + (d.paginas === 1
            ? (traducir('doc.pagina') || 'página')
            : (traducir('doc.paginas') || 'páginas'));
          return '<li><button class="docs__item" type="button" data-abrir-doc="' + d.id + '">' +
            '<span class="docs__icono" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>' +
            '</span>' +
            '<span class="docs__texto">' +
              '<span class="docs__titulo">' + titulo + '</span>' +
              '<span class="docs__meta">' + fuenteDe(d) + ' · ' + formatearFechaDoc(d.fecha) + ' · ' + hojas + '</span>' +
            '</span>' +
          '</button></li>';
        }).join('') + '</ul>' +
      '</section>';
    }

    html += '<p class="noticia-detalle__volver"><a class="enlace-flecha" href="actualidad.html">' +
      (traducir('noti.volver') || 'Volver a Actualidad') + '</a></p>';
    html += '</div>';

    caja.innerHTML = html;

    carrusel = { fotos: (ev.fotos || []).slice(), i: 0, titulo: txt.titulo };
    pintarCarrusel();

    document.title = txt.titulo + ' · CGE-ES';
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', txt.resumen);
  }

  function initEvento() {
    document.addEventListener('click', function (e) {
      var paso = e.target.closest('[data-carrusel-paso]');
      if (paso) { moverCarrusel(parseInt(paso.getAttribute('data-carrusel-paso'), 10)); return; }
      var punto = e.target.closest('[data-ir]');
      if (punto) { carrusel.i = parseInt(punto.getAttribute('data-ir'), 10); pintarCarrusel(); return; }
      /* El cartel de la Fiesta se amplía en el mismo visor, para poder
         escanear el QR desde la pantalla. */
      /* Vale para el cartel de la Fiesta y para cualquier otra foto suelta
         que quiera poder ampliarse: la del grupo en «El Consejo», por
         ejemplo, que tiene veinte caras y se agradece verla grande. */
      var cartel = e.target.closest('[data-ampliar-cartel], [data-ampliar-imagen]');
      if (cartel) {
        var img = cartel.querySelector('img');
        abrirFoto(img.getAttribute('src'), img.getAttribute('alt') || '');
        return;
      }
      var ampliar = e.target.closest('[data-ampliar]');
      if (ampliar && carrusel.fotos.length) {
        abrirFoto(carrusel.fotos[carrusel.i], carrusel.titulo,
                  (carrusel.i + 1) + ' / ' + carrusel.fotos.length);
      }
    });

    /* Flechas del teclado, pero solo si el visor está cerrado: con él
       abierto las flechas son para desplazar la imagen. */
    document.addEventListener('keydown', function (e) {
      if (!carrusel.fotos.length) return;
      if (visorDoc && visorDoc.hasAttribute('open')) return;
      if (e.key === 'ArrowLeft') moverCarrusel(-1);
      if (e.key === 'ArrowRight') moverCarrusel(1);
    });
  }

  /* ========================================================================
     5 bis. Logros
     ------------------------------------------------------------------------
     Las fichas con tipo: 'logro' de contenido.js. No se abren: son cortas
     a propósito, para que la lista se lea de un vistazo.
     ====================================================================== */

  function pintarLogros() {
    var caja = document.querySelector('[data-logros]');
    if (!caja) return;

    var C = window.CGE_CONTENIDO;
    var lista = ((C && C.noticias) || []).filter(function (n) { return n.tipo === 'logro' && visible(n); });

    if (!lista.length) { caja.innerHTML = ''; return; }

    /* Dos marcas distintas: el tick es para lo conseguido, la estrella para
       los actos y los hitos. Meterlo todo bajo el mismo tick daba a entender
       que todo son logros, y no lo es. */
    var MARCA = {
      logro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      acto:  '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6.1L12 16.8 6.6 19.7l1.2-6.1L3.3 9.4l6.1-.8z"/></svg>'
    };

    function insignia(n, grande) {
      var txt = n[idiomaActual] || n.es;
      var cat = (C.categorias && C.categorias[n.categoria]) || {};
      var etiqueta = cat[idiomaActual] || cat.es || n.categoria;
      var clase = n.clase === 'acto' ? 'acto' : 'logro';
      return '' +
        '<article class="insignia insignia--' + clase + (grande ? ' insignia--destacada' : '') + ' revelar">' +
          '<span class="insignia__marca" aria-hidden="true">' + (MARCA[clase] || MARCA.logro) + '</span>' +
          '<div class="insignia__cuerpo">' +
            '<div class="insignia__meta">' +
              '<span class="etiqueta ' + (cat.clase || '') + '">' + etiqueta + '</span>' +
              (n.fecha ? '<time datetime="' + n.fecha + '">' + formatearFecha(n.fecha) + '</time>' : '') +
            '</div>' +
            '<h3>' + txt.titulo + '</h3>' +
            '<p>' + txt.resumen + '</p>' +
          '</div>' +
        '</article>';
    }

    var destacado = lista.filter(function (n) { return n.destacado; })[0];
    var resto = lista.filter(function (n) { return n !== destacado; });

    caja.innerHTML =
      (destacado ? insignia(destacado, true) : '') +
      (resto.length ? '<div class="insignias">' + resto.map(function (n) {
        return insignia(n, false);
      }).join('') + '</div>' : '');
  }

  /* ========================================================================
     5 ter. Noticia completa (noticia.html?id=...)
     ------------------------------------------------------------------------
     No hay generador de sitio: la página es una sola plantilla que se
     rellena con la ficha que pida la URL. Si el id no existe o la ficha no
     tiene cuerpo, se avisa y se ofrece volver a Actualidad en lugar de
     dejar la página en blanco.
     ====================================================================== */

  function pintarNoticiaDetalle() {
    var caja = document.querySelector('[data-noticia-detalle]');
    if (!caja) return;

    var C = window.CGE_CONTENIDO;
    var id = new URLSearchParams(window.location.search).get('id');
    var n = ((C && C.noticias) || []).filter(function (x) {
      return x.id === id && x.tipo !== 'logro' && visible(x);
    })[0];

    var txt = n && (n[idiomaActual] || n.es);
    var cuerpo = txt && txt.cuerpo;

    if (!n || !cuerpo || !cuerpo.length) {
      caja.innerHTML =
        '<div class="panel-nota">' +
          '<strong>' + (traducir('noti.nohay.t') || 'No encontramos esa noticia') + '</strong>' +
          '<span>' + (traducir('noti.nohay.p') || 'Puede que el enlace esté mal escrito o que la noticia ya no esté publicada.') + '</span>' +
        '</div>' +
        '<p style="margin-top:24px"><a class="btn btn--primario" href="actualidad.html">' +
          (traducir('noti.volver') || 'Volver a Actualidad') + '</a></p>';
      document.title = (traducir('noti.nohay.t') || 'Noticia no encontrada') + ' · CGE-ES';
      return;
    }

    var cat = (C.categorias && C.categorias[n.categoria]) || {};
    var etiqueta = cat[idiomaActual] || cat.es || n.categoria;

    var meta = '<span class="etiqueta ' + (cat.clase || '') + '">' + etiqueta + '</span>';
    if (n.fecha) meta += '<time datetime="' + n.fecha + '">' + formatearFecha(n.fecha) + '</time>';
    if (n.autor) meta += '<span class="noticia-detalle__autor">' + n.autor + '</span>';

    var fotos = n.fotos || [];
    var portada = fotos.length
      ? '<figure class="noticia-detalle__portada"><img src="' + fotos[0] + '" alt=""></figure>'
      : '';
    var galeria = fotos.length > 1
      ? '<div class="noticia-detalle__galeria">' + fotos.slice(1).map(function (f) {
          return '<figure><img src="' + f + '" alt="" loading="lazy"></figure>';
        }).join('') + '</div>'
      : '';

    caja.innerHTML =
      '<div class="noticia-detalle__meta">' + meta + '</div>' +
      '<h1>' + txt.titulo + '</h1>' +
      '<p class="entradilla">' + txt.resumen + '</p>' +
      portada +
      cuerpo.map(function (par) { return '<p>' + par + '</p>'; }).join('') +
      galeria +
      '<p class="noticia-detalle__volver"><a class="enlace-flecha" href="actualidad.html">' +
        (traducir('noti.volver') || 'Volver a Actualidad') + '</a></p>';

    document.title = txt.titulo + ' · CGE-ES';
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', txt.resumen);
  }

  /* ========================================================================
     5 bis. Repertorio de asociaciones federadas
     ====================================================================== */

  function pintarDirectorio() {
    var caja = document.querySelector('[data-directorio]');
    if (!caja) return;

    var todas = (window.CGE_CONTENIDO && window.CGE_CONTENIDO.asociaciones) || [];
    var lista = filtrarEntidades(todas, busquedaEntidades);

    /* El contador y el aviso de «sin resultados» solo tienen sentido si hay
       algo cargado: si el repertorio entero está vacío se enseña el aviso de
       «en construcción» de más abajo. */
    var contador = document.querySelector('[data-entidades-total]');
    if (contador) {
      contador.textContent = todas.length
        ? (lista.length === todas.length
            ? todas.length + ' ' + (traducir('asoc.dir.entidades') || 'entidades')
            : lista.length + ' / ' + todas.length)
        : '';
    }

    if (todas.length && !lista.length) {
      caja.innerHTML =
        '<p class="directorio__vacio">' +
          (traducir('asoc.dir.nada') || 'Ninguna entidad coincide con esa búsqueda.') +
        '</p>';
      return;
    }

    if (!lista.length) {
      caja.innerHTML =
        '<div class="directorio__vacio">' +
          '<strong style="display:block;color:var(--navy);margin-bottom:6px">' +
            (traducir('asoc.dir.vacio.t') || 'Repertorio en construcción') + '</strong>' +
          (traducir('asoc.dir.vacio.p') ||
            'Estamos completando el censo de asociaciones guineanas en España. ' +
            'Si representas a una, escríbenos y la incorporamos.') +
        '</div>';
      return;
    }

    caja.innerHTML = '<div class="directorio">' + lista.map(function (a) {
      /* Las siglas NO se inventan: muchas entidades no tienen. Si el campo
         viene vacío se pone la inicial del nombre y ya está. Antes se
         fabricaban juntando iniciales y salían siglas que nadie usa. */
      var sigla = a.sigla || (a.nombre.trim()[0] || '·').toUpperCase();

      var lugar = [a.ciudad, a.provincia].filter(Boolean);
      if (lugar.length === 2 && lugar[0] === lugar[1]) lugar = [lugar[0]];
      var meta = [
        a.tipo || '',
        lugar.join(' (') + (lugar.length === 2 ? ')' : ''),
        a.desde ? (traducir('asoc.dir.desde') || 'Desde') + ' ' + a.desde : ''
      ].filter(Boolean).join(' · ');

      /* El ámbito puede llevar varios valores separados por comas */
      var ambitos = (a.ambito || '').split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean)
        .map(function (s) { return '<span class="etiqueta etiqueta--oro">' + s + '</span>'; })
        .join('');

      var accion;
      if (a.web) {
        accion = '<a class="enlace-flecha" href="' + a.web + '" target="_blank" rel="noopener">' +
          (traducir('asoc.dir.web') || 'Sitio web') +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg></a>';
      } else if (a.email) {
        accion = '<a class="directorio__email" href="mailto:' + a.email + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>' +
          '<span>' + a.email + '</span></a>';
      } else {
        accion = '<span class="etiqueta etiqueta--verde">' +
          (traducir('asoc.dir.registrada') || 'Registrada') + '</span>';
      }

      /* `cotejada: false` = todavía no hemos comprobado NIF, denominación
         oficial y número de registro. Se muestra igualmente, pero apagada y
         sin acción, para no dar por bueno un dato que no lo está. */
      var sinCotejar = a.cotejada === false;
      if (sinCotejar) {
        accion = '<span class="etiqueta">' +
          (traducir('asoc.dir.sincotejar') || 'Datos por verificar') + '</span>';
      }

      return '<div class="directorio__item' + (sinCotejar ? ' directorio__item--sincotejar' : '') + '">' +
        '<span class="directorio__sigla">' + sigla + '</span>' +
        '<span><span class="directorio__nombre">' + a.nombre + '</span>' +
          (meta ? '<span class="directorio__meta" style="display:block">' + meta + '</span>' : '') +
          (ambitos ? '<span class="directorio__ambitos">' + ambitos + '</span>' : '') +
        '</span>' +
        accion +
      '</div>';
    }).join('') + '</div>';
  }

  /* Búsqueda del repertorio. Se normaliza quitando acentos para que
     «Coordinacion» encuentre «Coordinación», y se exige que TODAS las
     palabras aparezcan, que es como la gente espera que busque. */
  var busquedaEntidades = '';

  function normalizar(t) {
    return String(t || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function filtrarEntidades(lista, texto) {
    var palabras = normalizar(texto).split(/\s+/).filter(Boolean);
    if (!palabras.length) return lista.slice();

    return lista.filter(function (a) {
      var heno = normalizar([
        a.sigla, a.nombre, a.tipo, a.ciudad, a.provincia, a.desde, a.ambito
      ].filter(Boolean).join(' '));
      return palabras.every(function (w) { return heno.indexOf(w) !== -1; });
    });
  }

  function initBuscadorEntidades() {
    var campo = document.querySelector('[data-buscar-entidades]');
    if (!campo) return;

    var limpiar = document.querySelector('[data-limpiar-busqueda]');

    function aplicar() {
      busquedaEntidades = campo.value;
      if (limpiar) limpiar.hidden = !campo.value;
      pintarDirectorio();
    }

    campo.addEventListener('input', aplicar);
    /* Enter en un campo suelto no debe recargar la página */
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') e.preventDefault();
      if (e.key === 'Escape' && campo.value) { campo.value = ''; aplicar(); }
    });
    if (limpiar) {
      limpiar.hidden = true;
      limpiar.addEventListener('click', function () { campo.value = ''; aplicar(); campo.focus(); });
    }
  }

  function initFiltros() {
    var caja = document.querySelector('[data-filtros]');
    if (!caja) return;

    caja.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filtro]');
      if (!b) return;

      filtroActivo = b.getAttribute('data-filtro');
      caja.querySelectorAll('[data-filtro]').forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      pintarNoticias();
    });
  }

  /* ========================================================================
     6. Formulario de contacto
     ====================================================================== */

  function initFormulario() {
    var form = document.querySelector('[data-formulario]');
    if (!form) return;

    var aviso = form.querySelector('[data-aviso]');

    function msg(clave, respaldo) {
      return traducir(clave) || respaldo;
    }

    function mostrarError(campo, texto) {
      campo.setAttribute('aria-invalid', 'true');
      var caja = form.querySelector('[data-error-de="' + campo.id + '"]');
      if (caja) caja.textContent = texto;
    }

    function limpiarError(campo) {
      campo.removeAttribute('aria-invalid');
      var caja = form.querySelector('[data-error-de="' + campo.id + '"]');
      if (caja) caja.textContent = '';
    }

    function validar() {
      var ok = true;
      var primero = null;

      form.querySelectorAll('input, select, textarea').forEach(limpiarError);

      var obligatorios = ['f-nombre', 'f-email', 'f-motivo', 'f-mensaje'];
      obligatorios.forEach(function (id) {
        var c = document.getElementById(id);
        if (!c) return;
        if (!c.value.trim()) {
          mostrarError(c, msg('form.err.vacio', 'Este campo es obligatorio.'));
          ok = false;
          if (!primero) primero = c;
        }
      });

      var email = document.getElementById('f-email');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        mostrarError(email, msg('form.err.email', 'Introduce una dirección de correo válida.'));
        ok = false;
        if (!primero) primero = email;
      }

      var mensaje = document.getElementById('f-mensaje');
      if (mensaje && mensaje.value.trim() && mensaje.value.trim().length < 20) {
        mostrarError(mensaje, msg('form.err.corto', 'Cuéntanos un poco más (mínimo 20 caracteres).'));
        ok = false;
        if (!primero) primero = mensaje;
      }

      var rgpd = document.getElementById('f-rgpd');
      if (rgpd && !rgpd.checked) {
        mostrarError(rgpd, msg('form.err.rgpd', 'Debes aceptar la política de privacidad.'));
        ok = false;
        if (!primero) primero = rgpd;
      }

      if (primero) primero.focus();
      return ok;
    }

    function textoDelSelect(id) {
      var s = document.getElementById(id);
      if (!s) return '';
      return s.options[s.selectedIndex] ? s.options[s.selectedIndex].text : s.value;
    }

    function cuerpoMensaje() {
      var v = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
      return [
        'Nombre: '     + v('f-nombre'),
        'Email: '      + v('f-email'),
        'Teléfono: '   + (v('f-tel') || '—'),
        'Provincia: '  + (v('f-provincia') || '—'),
        'Asociación: ' + (v('f-asociacion') || '—'),
        'Motivo: '     + textoDelSelect('f-motivo'),
        'Idioma: '     + textoDelSelect('f-idioma'),
        '',
        'Mensaje:',
        v('f-mensaje')
      ].join('\n');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Trampa antispam: si está rellena, es un bot */
      var trampa = document.getElementById('f-web');
      if (trampa && trampa.value) return;

      if (!validar()) {
        aviso.setAttribute('data-estado', 'error');
        aviso.textContent = msg('form.err.general', 'Revisa los campos marcados antes de enviar.');
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');
      var boton = form.querySelector('button[type="submit"]');

      /* --- Sin endpoint configurado: abrir el cliente de correo --- */
      if (!endpoint) {
        var destino  = (window.CGE && window.CGE.SITIO.email) || 'conseil.guineen.espagne@gmail.com';
        var asunto   = '[Web CGE-ES] ' + textoDelSelect('f-motivo');
        window.location.href = 'mailto:' + destino +
          '?subject=' + encodeURIComponent(asunto) +
          '&body='    + encodeURIComponent(cuerpoMensaje());

        aviso.setAttribute('data-estado', 'ok');
        aviso.textContent = msg('form.ok.mailto',
          'Se ha abierto tu programa de correo con el mensaje preparado. Solo tienes que pulsar Enviar.');
        return;
      }

      /* --- Con endpoint: envío en segundo plano --- */
      boton.disabled = true;
      aviso.removeAttribute('data-estado');

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) {
          if (!r.ok) throw new Error('respuesta ' + r.status);
          form.reset();
          aviso.setAttribute('data-estado', 'ok');
          aviso.textContent = msg('form.ok',
            'Hemos recibido tu consulta. Te responderemos lo antes posible. Gracias por escribirnos.');
        })
        .catch(function () {
          aviso.setAttribute('data-estado', 'error');
          aviso.textContent = msg('form.err.envio',
            'No hemos podido enviar el mensaje. Escríbenos directamente a ' +
            ((window.CGE && window.CGE.SITIO.email) || 'conseil.guineen.espagne@gmail.com') + '.');
        })
        .then(function () { boton.disabled = false; });
    });

    /* Limpiar el error de un campo al corregirlo */
    form.addEventListener('input', function (e) {
      if (e.target.hasAttribute('aria-invalid')) limpiarError(e.target);
    });
    form.addEventListener('change', function (e) {
      if (e.target.hasAttribute('aria-invalid')) limpiarError(e.target);
    });
  }

  /* ========================================================================
     7. Arranque
     ====================================================================== */

  function iniciar() {
    if (window.CGE && window.CGE.render) window.CGE.render();

    initNavegacion();
    initCabeceraFija();
    initVideoHero();
    initAcordeon();
    initFiltros();
    initBuscadorEntidades();
    initDocumentos();
    initEvento();
    initFormulario();

    aplicarIdioma(detectarIdioma());

    document.addEventListener('click', function (e) {
      var b = e.target.closest('.selector-idioma__btn');
      if (b) cambiarIdioma(b.getAttribute('data-idioma'));
    });

    initRevelar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
