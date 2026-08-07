/* ==========================================================================
   CGE-ES — Cabecera y pie de página compartidos
   --------------------------------------------------------------------------
   TODO el contenido común del sitio (datos de la entidad, menú, redes,
   enlaces del pie) está definido AQUÍ y una sola vez. Si cambias el teléfono
   o añades una página al menú, lo haces en este archivo y se actualiza en
   todas las páginas automáticamente.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. DATOS DE LA ENTIDAD  ←←← EDITA AQUÍ
     ------------------------------------------------------------------------
     Los datos registrales están tomados de:
       · Tarjeta de Identificación Fiscal de la AEAT (NIF definitivo 29-09-2024)
       · Resolución de inscripción del Ministerio del Interior de 24-09-2024
         (salida nº 19017, nº de clave 3844-2024)
     Lo marcado como PENDIENTE sigue sin confirmar. Ver README.md.
     ---------------------------------------------------------------------- */
  var SITIO = {
    sigla:        'CGE-ES',
    nombre:       'Consejo de Guineanos del Exterior en España',
    nombreFr:     "Conseil des Guinéens de l'Extérieur en Espagne",

    email:        'infocgees@gmail.com',
    telefono:     '+34 900 000 000',              // PENDIENTE
    telefonoTel:  '+34900000000',                 // PENDIENTE (sin espacios)
    whatsapp:     '',                             // PENDIENTE (opcional, formato 34600000000)

    ciudad:       'Madrid',
    direccion:    'Avda. del Cerro de los Ángeles, 25 — 1ª planta, puerta A',
    cp:           '28026 Madrid',
    pais:         'España',

    cif:          'G26752907',
    registro:     'Registro Nacional de Asociaciones, Sección 1ª, nº 629208',
    registroNum:  '629208',
    fechaAlta:    '24 de septiembre de 2024',
    fechaActa:    '27 de abril de 2024',

    horario:      'Lunes a viernes, 9:00 – 18:00',      // PENDIENTE
    dominio:      'https://www.cgees.org',

    /* ----------------------------------------------------------------------
       Datos bancarios de la entidad.
       Se muestran ÚNICAMENTE en la página de contacto, en un bloque propio.
       Si dejas el IBAN vacío, el bloque entero no aparece en la web.

       Publicar un IBAN es habitual y razonablemente seguro (con el IBAN solo
       no se puede sacar dinero), pero conviene:
         · mostrarlo siempre junto al titular y al NIF, para que quien vaya a
           transferir pueda comprobar que la cuenta es de la entidad;
         · tenerlo en un único sitio de la web, para que actualizarlo o
           desmentir una copia falsa sea inmediato.
       ---------------------------------------------------------------------- */
    banco: {
      titular: 'Consejo de Guineanos del Exterior en España',
      iban:    '',                                // PENDIENTE — ej. 'ES00 0000 0000 0000 0000 0000'
      bic:     '',                                // PENDIENTE (opcional)
      entidad: ''                                 // PENDIENTE (opcional, nombre del banco)
    },

    /* Embajada de la República de Guinea en España y Malta */
    embajada: {
      nombre:    'Ambassade de Guinée en Espagne',
      direccion: 'Calle Luis Muriel, 4 — 28002 Madrid',
      telefono:  '+34 914 352 928',
      telefono2: '+34 914 311 004',
      email:     'embajada@guineamadrid.es',
      web:       'https://es.ambaguinee.org/',
      horario:   'Lunes a viernes, 9:00 – 16:00'
    },

    redes: {
      facebook:  '',   // PENDIENTE — deja vacío para ocultar el icono
      instagram: '',   // PENDIENTE
      linkedin:  '',   // PENDIENTE
      youtube:   ''    // PENDIENTE
    }
  };

  /* ------------------------------------------------------------------------
     2. MENÚ DE NAVEGACIÓN  ←←← EDITA AQUÍ para añadir o quitar páginas
     ---------------------------------------------------------------------- */
  var NAV = [
    { href: 'index.html', key: 'nav.inicio', txt: 'Inicio' },
    {
      href: 'quienes-somos.html', key: 'nav.quienes', txt: 'El Consejo',
      sub: [
        { href: 'quienes-somos.html#origen',   key: 'nav.sub.origen', txt: 'Origen y mandato',
          dkey: 'nav.sub.origen.d',  d: 'Cómo y por qué nace el Consejo' },
        { href: 'quienes-somos.html#organos',  key: 'nav.sub.organos', txt: 'Junta Directiva',
          dkey: 'nav.sub.organos.d', d: 'Elegida por votación de la comunidad' },
        { href: 'quienes-somos.html#registro', key: 'nav.sub.registro', txt: 'Datos registrales',
          dkey: 'nav.sub.registro.d', d: 'Inscripción, NIF y sede social' }
      ]
    },
    { href: 'asociaciones.html', key: 'nav.asociaciones', txt: 'Entidades' },
    {
      href: 'servicios.html', key: 'nav.servicios', txt: 'Servicios',
      sub: [
        { href: 'asuntos-consulares.html',      key: 'nav.sub.consular', txt: 'Asuntos consulares',
          dkey: 'nav.sub.consular.d', d: 'Pasaporte, documentos y Embajada' },
        { href: 'servicios.html#orientacion',   key: 'nav.sub.orient',   txt: 'Orientación e información',
          dkey: 'nav.sub.orient.d',   d: 'Cómo funciona cada trámite' },
        { href: 'servicios.html#coordinacion',  key: 'nav.sub.coord',    txt: 'Coordinación y representación',
          dkey: 'nav.sub.coord.d',    d: 'Interlocución con las instituciones' },
        { href: 'servicios.html#comunidad',     key: 'nav.sub.comunidad',txt: 'Cultura y comunidad',
          dkey: 'nav.sub.comunidad.d',d: 'Fiesta de la Independencia y actos' }
      ]
    },
    { href: 'actualidad.html', key: 'nav.actualidad', txt: 'Actualidad' },
    { href: 'contacto.html',   key: 'nav.contacto',   txt: 'Contacto' }
  ];

  /* ------------------------------------------------------------------------
     3. Iconos SVG reutilizables
     ---------------------------------------------------------------------- */
  var ICO = {
    mail:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    tel:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z"/></svg>',
    pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    caret: '<svg class="nav__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    fb:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
    ig:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></svg>',
    li:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0 1 16.6 8.7c4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
    yt:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.5-.4-5.2a2.8 2.8 0 0 0-2-2C18.9 4.4 12 4.4 12 4.4s-6.9 0-8.6.4a2.8 2.8 0 0 0-2 2C1 8.5 1 12 1 12s0 3.5.4 5.2a2.8 2.8 0 0 0 2 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 2-2C23 15.5 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z"/></svg>',
    ext:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>'
  };

  /* ------------------------------------------------------------------------
     4. Utilidades
     ---------------------------------------------------------------------- */
  function paginaActual() {
    var p = window.location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function esActiva(href) {
    return href.split('#')[0] === paginaActual();
  }

  function i18n(key, texto) {
    return ' data-i18n="' + key + '">' + texto;
  }

  /* ------------------------------------------------------------------------
     5. Cabecera
     ---------------------------------------------------------------------- */
  function htmlCabecera() {
    var itemsNav = NAV.map(function (item) {
      var activo = esActiva(item.href) ? ' aria-current="page"' : '';

      if (!item.sub) {
        return '<div class="nav__item">' +
          '<a class="nav__enlace" href="' + item.href + '"' + activo +
          i18n(item.key, item.txt) + '</a></div>';
      }

      /* Una página hija marcada como activa también resalta el padre */
      if (!activo && item.sub.some(function (s) { return esActiva(s.href); })) {
        activo = ' aria-current="page"';
      }

      var sub = item.sub.map(function (s) {
        return '<li><a href="' + s.href + '">' +
          '<span' + i18n(s.key, s.txt) + '</span>' +
          '<small' + i18n(s.dkey, s.d) + '</small>' +
          '</a></li>';
      }).join('');

      return '<div class="nav__item nav__item--desplegable">' +
        '<a class="nav__enlace" href="' + item.href + '"' + activo + ' aria-haspopup="true">' +
        '<span' + i18n(item.key, item.txt) + '</span>' + ICO.caret + '</a>' +
        '<ul class="submenu">' + sub + '</ul>' +
        '</div>';
    }).join('');

    return '' +
      '<div class="barra-superior">' +
        '<div class="contenedor barra-superior__inner">' +
          '<div class="barra-superior__datos">' +
            '<a href="mailto:' + SITIO.email + '">' + ICO.mail + '<span>' + SITIO.email + '</span></a>' +
            '<span style="display:inline-flex;align-items:center;gap:7px">' + ICO.pin +
              '<span' + i18n('cab.sede', 'Avda. del Cerro de los Ángeles, 25 · Madrid') + '</span></span>' +
          '</div>' +
          '<div class="selector-idioma" role="group" aria-label="Idioma / Langue">' +
            '<button class="selector-idioma__btn" data-idioma="es" type="button" lang="es">ES</button>' +
            '<button class="selector-idioma__btn" data-idioma="fr" type="button" lang="fr">FR</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<header class="cabecera">' +
        '<div class="contenedor cabecera__inner">' +
          '<a class="marca" href="index.html" aria-label="' + SITIO.sigla + ' — ' + SITIO.nombre + '">' +
            '<img class="marca__escudo" src="assets/img/logo.svg" alt="" width="50" height="50">' +
            '<span class="marca__texto">' +
              '<span class="marca__sigla">' + SITIO.sigla + '</span>' +
              '<span class="marca__nombre"' + i18n('marca.nombre', SITIO.nombre) + '</span>' +
            '</span>' +
          '</a>' +

          '<nav class="nav" id="nav-principal" aria-label="Principal">' + itemsNav + '</nav>' +

          '<div class="cabecera__acciones">' +
            '<a class="btn btn--primario btn--sm" href="contacto.html"' +
              i18n('cab.cta', 'Escríbenos') + '</a>' +
            '<button class="hamburguesa" type="button" aria-expanded="false" ' +
              'aria-controls="nav-principal" aria-label="Abrir menú">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="velo" hidden></div>';
  }

  /* ------------------------------------------------------------------------
     6. Pie de página
     ---------------------------------------------------------------------- */
  function htmlPie() {
    var redes = '';
    if (SITIO.redes.facebook)  redes += '<a href="' + SITIO.redes.facebook  + '" aria-label="Facebook"  target="_blank" rel="noopener">' + ICO.fb + '</a>';
    if (SITIO.redes.instagram) redes += '<a href="' + SITIO.redes.instagram + '" aria-label="Instagram" target="_blank" rel="noopener">' + ICO.ig + '</a>';
    if (SITIO.redes.linkedin)  redes += '<a href="' + SITIO.redes.linkedin  + '" aria-label="LinkedIn"  target="_blank" rel="noopener">' + ICO.li + '</a>';
    if (SITIO.redes.youtube)   redes += '<a href="' + SITIO.redes.youtube   + '" aria-label="YouTube"   target="_blank" rel="noopener">' + ICO.yt + '</a>';
    var bloqueRedes = redes ? '<div class="redes">' + redes + '</div>' : '';

    return '' +
      '<div class="tricolor"></div>' +
      '<footer class="pie">' +
        '<div class="contenedor pie__principal">' +
          '<div class="pie__rejilla">' +

            '<div>' +
              '<a class="pie__marca" href="index.html">' +
                '<img src="assets/img/logo-blanco.svg" alt="" width="58" height="58">' +
                '<span class="pie__marca-texto">' +
                  '<span class="pie__marca-sigla">' + SITIO.sigla + '</span>' +
                  '<span class="pie__marca-nombre"' + i18n('marca.nombre.pie', SITIO.nombre) + '</span>' +
                '</span>' +
              '</a>' +
              '<p class="pie__descripcion"' + i18n('pie.desc',
                'Órgano de representación de la diáspora guineana en España. Asociación sin ' +
                'ánimo de lucro inscrita en el Registro Nacional de Asociaciones del Ministerio ' +
                'del Interior.') + '</p>' +
              '<p class="pie__registro">' +
                '<span' + i18n('pie.nif', 'NIF') + '</span> ' + SITIO.cif + ' · ' +
                '<span' + i18n('pie.rna', 'RNA Sección 1ª nº') + '</span> ' + SITIO.registroNum +
              '</p>' +
              bloqueRedes +
            '</div>' +

            '<div>' +
              '<h4' + i18n('pie.entidad', 'El Consejo') + '</h4>' +
              '<ul>' +
                '<li><a href="quienes-somos.html#origen"' + i18n('pie.origen', 'Origen y mandato') + '</a></li>' +
                '<li><a href="quienes-somos.html#organos"' + i18n('pie.organos', 'Junta Directiva') + '</a></li>' +
                '<li><a href="quienes-somos.html#registro"' + i18n('pie.acred', 'Datos registrales') + '</a></li>' +
                '<li><a href="asociaciones.html"' + i18n('pie.asoc', 'Entidades guineanas') + '</a></li>' +
                '<li><a href="asociaciones.html#adherirse"' + i18n('pie.adherirse', 'Cómo inscribirse') + '</a></li>' +
              '</ul>' +
            '</div>' +

            '<div>' +
              '<h4' + i18n('pie.servicios', 'Servicios') + '</h4>' +
              '<ul>' +
                '<li><a href="asuntos-consulares.html"' + i18n('pie.s1', 'Asuntos consulares') + '</a></li>' +
                '<li><a href="servicios.html#orientacion"' + i18n('pie.s2', 'Orientación e información') + '</a></li>' +
                '<li><a href="servicios.html#coordinacion"' + i18n('pie.s3', 'Coordinación y representación') + '</a></li>' +
                '<li><a href="servicios.html#comunidad"' + i18n('pie.s4', 'Cultura y comunidad') + '</a></li>' +
                '<li><a href="actualidad.html"' + i18n('pie.s5', 'Actualidad y avisos') + '</a></li>' +
              '</ul>' +
            '</div>' +

            '<div>' +
              '<h4' + i18n('pie.contacto', 'Contacto') + '</h4>' +
              '<ul>' +
                '<li><a href="mailto:' + SITIO.email + '">' + SITIO.email + '</a></li>' +
                '<li><a class="pendiente" href="tel:' + SITIO.telefonoTel + '">' + SITIO.telefono + '</a></li>' +
                '<li style="margin-top:12px">' + SITIO.direccion + '</li>' +
                '<li>' + SITIO.cp + '</li>' +
              '</ul>' +
              '<h4 style="margin-top:26px"' + i18n('pie.embajada', 'Embajada de Guinea') + '</h4>' +
              '<ul>' +
                '<li><a href="' + SITIO.embajada.web + '" target="_blank" rel="noopener">es.ambaguinee.org</a></li>' +
                '<li>' + SITIO.embajada.telefono + '</li>' +
              '</ul>' +
            '</div>' +

          '</div>' +
        '</div>' +

        '<div class="contenedor">' +
          '<div class="pie__legal">' +
            '<p style="margin:0">© <span data-anio></span> ' + SITIO.nombre + ' (' + SITIO.sigla + '). ' +
              '<span' + i18n('pie.derechos', 'Todos los derechos reservados.') + '</span></p>' +
            '<nav class="pie__legal-enlaces" aria-label="Enlaces legales">' +
              '<a href="aviso-legal.html"' + i18n('pie.aviso', 'Aviso legal') + '</a>' +
              '<a href="privacidad.html"' + i18n('pie.privacidad', 'Política de privacidad') + '</a>' +
              '<a href="privacidad.html#cookies"' + i18n('pie.cookies', 'Cookies') + '</a>' +
              '<a href="contacto.html"' + i18n('pie.contactar', 'Contactar') + '</a>' +
            '</nav>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ------------------------------------------------------------------------
     7. Renderizado
     ---------------------------------------------------------------------- */
  function render() {
    var cab = document.getElementById('site-header');
    var pie = document.getElementById('site-footer');
    if (cab) cab.innerHTML = htmlCabecera();
    if (pie) pie.innerHTML = htmlPie();

    var anio = new Date().getFullYear();
    document.querySelectorAll('[data-anio]').forEach(function (el) { el.textContent = anio; });

    /* Datos de la entidad dentro de las páginas: data-sitio="cif",
       data-sitio="embajada.telefono", etc. */
    function valor(ruta) {
      return ruta.split('.').reduce(function (o, k) {
        return (o === undefined || o === null) ? undefined : o[k];
      }, SITIO);
    }

    document.querySelectorAll('[data-sitio]').forEach(function (el) {
      var v = valor(el.getAttribute('data-sitio'));
      if (v === undefined) return;
      if (el.tagName === 'A') {
        var pre = el.getAttribute('data-sitio-href') || '';
        /* Los enlaces tel: no admiten espacios; el texto visible sí los conserva */
        el.href = pre + (pre === 'tel:' ? String(v).replace(/[\s.]/g, '') : v);
      }
      el.textContent = v;
    });

    /* El bloque de datos bancarios solo aparece si hay un IBAN cargado */
    document.querySelectorAll('[data-si-iban]').forEach(function (el) {
      el.hidden = !(SITIO.banco && SITIO.banco.iban);
    });
    /* Filas opcionales dentro del bloque (BIC, nombre del banco) */
    document.querySelectorAll('[data-si-valor]').forEach(function (el) {
      el.hidden = !valor(el.getAttribute('data-si-valor'));
    });

    document.querySelectorAll('[data-sitio-attr]').forEach(function (el) {
      el.getAttribute('data-sitio-attr').split(',').forEach(function (par) {
        var t = par.split(':');
        var v = valor(t[1]);
        if (v !== undefined) el.setAttribute(t[0], (el.getAttribute('data-prefijo') || '') + v);
      });
    });
  }

  window.CGE = { SITIO: SITIO, NAV: NAV, ICO: ICO, render: render };
})();
