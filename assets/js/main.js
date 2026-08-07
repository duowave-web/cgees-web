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

    var flecha = '';
    if (n.enlace) {
      flecha = '<a class="enlace-flecha" href="' + n.enlace + '">' +
        (traducir('comun.leermas') || 'Leer más') +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
    }

    var etiquetaHTML = '<span class="etiqueta ' + (cat.clase || '') + '">' + etiqueta + '</span>';

    return '' +
      '<article class="noticia" data-categoria="' + n.categoria + '">' +
        '<div class="noticia__media">' +
          '<img src="assets/img/logo-blanco.svg" alt="" width="62" height="62" loading="lazy">' +
        '</div>' +
        '<div class="noticia__cuerpo">' +
          '<div class="noticia__meta">' + etiquetaHTML +
            '<time class="noticia__fecha" datetime="' + n.fecha + '">' + formatearFecha(n.fecha) + '</time>' +
          '</div>' +
          '<h3>' + txt.titulo + '</h3>' +
          '<p>' + txt.resumen + '</p>' +
          (flecha ? '<div style="margin-top:auto;padding-top:18px">' + flecha + '</div>' : '') +
        '</div>' +
      '</article>';
  }

  function pintarNoticias() {
    var C = window.CGE_CONTENIDO;
    if (!C) return;

    var lista = C.noticias.slice().sort(function (a, b) {
      return a.fecha < b.fecha ? 1 : -1;
    });

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
     5 bis. Repertorio de asociaciones federadas
     ====================================================================== */

  function pintarDirectorio() {
    var caja = document.querySelector('[data-directorio]');
    if (!caja) return;

    var lista = (window.CGE_CONTENIDO && window.CGE_CONTENIDO.asociaciones) || [];

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
      /* Si la asociación no tiene siglas, se generan a partir del nombre */
      var sigla = a.sigla || a.nombre
        .replace(/\(.*?\)/g, '')
        .split(/\s+/)
        .filter(function (p) { return p.length > 2 && /^[A-ZÁÉÍÓÚÀÈÇÑ]/.test(p); })
        .map(function (p) { return p[0]; })
        .join('')
        .slice(0, 4) || '—';

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

      return '<div class="directorio__item">' +
        '<span class="directorio__sigla">' + sigla + '</span>' +
        '<span><span class="directorio__nombre">' + a.nombre + '</span>' +
          (meta ? '<span class="directorio__meta" style="display:block">' + meta + '</span>' : '') +
          (ambitos ? '<span class="directorio__ambitos">' + ambitos + '</span>' : '') +
        '</span>' +
        accion +
      '</div>';
    }).join('') + '</div>';
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
        var destino  = (window.CGE && window.CGE.SITIO.email) || 'infocgees@gmail.com';
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
            ((window.CGE && window.CGE.SITIO.email) || 'infocgees@gmail.com') + '.');
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
    initAcordeon();
    initFiltros();
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
