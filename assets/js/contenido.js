/* ==========================================================================
   CGE-ES — Contenido editable: noticias y repertorio de asociaciones
   ========================================================================== */

window.CGE_CONTENIDO = {

  /* ======================================================================
     A) NOTICIAS Y LOGROS
     ----------------------------------------------------------------------
     Una misma lista alimenta dos sitios distintos. Lo decide `tipo`:

       tipo: 'noticia' → sale en Actualidad y en la portada, y se puede
                         abrir y leer entera en noticia.html
       tipo: 'logro'   → sale en «El Consejo» → Logros. No se abre: es una
                         insignia corta.

     Dentro de los `tipo: 'logro'`, el campo `clase` dice qué es:

       clase: 'logro'  → algo conseguido que mejora la vida de la comunidad
       clase: 'acto'   → un acto o un hito importante, pero que no es un
                         logro en sí. Sale con otro color, porque meterlo
                         todo bajo «Logros» era faltar a la verdad.

       destacado: true → lo saca en grande delante de los demás. Solo
                         debería llevarlo uno

     Para mover una ficha de un sitio al otro basta con cambiar esa palabra.

     Campos:
       id        → identificador para la URL (noticia.html?id=...). Solo
                   minúsculas, números y guiones. NO cambiarlo una vez
                   publicado: rompería los enlaces que ya circulen.
       fecha     → AAAA-MM-DD. Opcional: sin ella la ficha se publica
                   igual, solo que sin fecha.
       categoria → 'institucional' | 'consular' | 'comunidad' | 'asociaciones'
       autor     → quién lo firma. Si está vacío, no se muestra.
       fotos     → rutas de imagen. La primera hace de portada.
       es / fr   → { titulo, resumen, cuerpo }
                   `resumen` es lo que se lee en la tarjeta.
                   `cuerpo` es un array: cada texto, un párrafo. Si está
                   vacío, la noticia no se puede abrir y la tarjeta no
                   ofrece el enlace de «leer más».

     EL ORDEN DE ESTA LISTA ES EL ORDEN EN QUE SE MUESTRAN.

     ⚠ PENDIENTE: a estas fichas les faltan la fecha, el cuerpo, el autor
       y las fotos. Cuando estén completas, pon `noticiasDeEjemplo: false`
       para quitar el aviso amarillo de Actualidad.
     ====================================================================== */

  noticiasDeEjemplo: true,

  categorias: {
    institucional: { es: 'Institucional', fr: 'Institutionnel', en: 'Institutional', clase: 'etiqueta--navy'  },
    consular:      { es: 'Consular',      fr: 'Consulaire',     en: 'Consular',      clase: 'etiqueta--rojo'  },
    comunidad:     { es: 'Comunidad',     fr: 'Communauté',     en: 'Community',     clase: 'etiqueta--oro'   },
    asociaciones:  { es: 'Asociaciones',  fr: 'Associations',   en: 'Associations',  clase: 'etiqueta--verde' }
  },

  noticias: [
    {
      /* El logro principal. `destacado: true` lo saca en grande, delante
         de los demás. Solo debería haber uno. */
      id: 'tramitacion-documentacion',
      tipo: 'logro',
      clase: 'logro',
      destacado: true,
      fecha: '',
      categoria: 'consular',
      autor: '',
      fotos: [],
      es: {
        titulo: "Tramitar documentación guineana es hoy más fácil",
        resumen: "La colaboración con la Embajada ha agilizado los trámites de documentación guineana y ha hecho mucho más transparente qué papeles hacen falta en cada caso. Es el resultado que más se nota en el día a día de la comunidad.",
        cuerpo: []
      },
      fr: {
        titulo: "Les démarches de documents guinéens sont aujourd'hui plus simples",
        resumen: "La collaboration avec l'Ambassade a accéléré les démarches de documentation guinéenne et rendu bien plus claire la liste des pièces nécessaires dans chaque cas. C'est le résultat qui se remarque le plus au quotidien.",
        cuerpo: []
      }
    },
    {
      id: 'censo-ravec-2025',
      tipo: 'logro',
      clase: 'logro',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'consular',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Censo RAVEC 2025",
        resumen: "Campaña del censo administrativo con fines de estado civil.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Recensement RAVEC 2025",
        resumen: "Campagne du recensement administratif à vocation d'état civil.",
        cuerpo: []
      }
    },
    {
      id: 'kits-enrolamiento',
      tipo: 'logro',
      clase: 'logro',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'consular',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Kits de enrolamiento",
        resumen: "Kits desplegados para inscribir a la comunidad residente en España.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Kits d'enrôlement",
        resumen: "Kits déployés pour inscrire la communauté résidant en Espagne.",
        cuerpo: []
      }
    },
    {
      id: 'malta',
      tipo: 'logro',
      clase: 'logro',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'consular',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Atención a la comunidad en Malta",
        resumen: "Viaje del Consejo con jornada de enrolamiento e inscripción consular.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Accompagnement de la communauté à Malte",
        resumen: "Déplacement du Conseil avec une journée d'enrôlement et d'inscription.",
        cuerpo: []
      }
    },
    {
      id: 'formacion',
      tipo: 'logro',
      clase: 'logro',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'comunidad',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Formación",
        resumen: "Sesiones para la comunidad y para las entidades registradas.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Formation",
        resumen: "Sessions pour la communauté et les entités enregistrées.",
        cuerpo: []
      }
    },
    {
      id: 'satisfecit-consul-sabadell',
      tipo: 'logro',
      clase: 'acto',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Satisfecit al cónsul en Sabadell",
        resumen: "Reconocimiento a su labor con la comunidad, en Sabadell (Barcelona).",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Satisfecit au consul à Sabadell",
        resumen: "Reconnaissance de son travail auprès de la communauté, à Sabadell.",
        cuerpo: []
      }
    },
    {
      id: 'referendum-constitucion',
      tipo: 'noticia',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Referéndum de la nueva Constitución",
        resumen: "Participación de la diáspora en la consulta sobre la nueva Constitución: organización del voto y acompañamiento a las personas inscritas.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Référendum sur la nouvelle Constitution",
        resumen: "Participation de la diaspora à la consultation sur la nouvelle Constitution : organisation du vote et accompagnement des personnes inscrites.",
        cuerpo: []
      }
    },
    {
      id: 'elecciones-asamblea-nacional',
      tipo: 'noticia',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Elecciones a la nueva Asamblea Nacional",
        resumen: "Organización y acompañamiento del voto de la comunidad guineana en España para la nueva Asamblea Nacional.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Élections à la nouvelle Assemblée nationale",
        resumen: "Organisation et accompagnement du vote de la communauté guinéenne en Espagne pour la nouvelle Assemblée nationale.",
        cuerpo: []
      }
    },
    {
      id: 'entrega-nueva-constitucion',
      tipo: 'noticia',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Presentación y entrega de la nueva Constitución",
        resumen: "Acto de presentación del nuevo texto constitucional y entrega de ejemplares a la comunidad guineana en España.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Présentation et remise de la nouvelle Constitution",
        resumen: "Cérémonie de présentation du nouveau texte constitutionnel et remise d'exemplaires à la communauté guinéenne en Espagne.",
        cuerpo: []
      }
    },
    {
      id: 'embajador-framoi-mara',
      tipo: 'noticia',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Presentación del nuevo embajador, Framoi Mara",
        resumen: "Encuentro de la comunidad con el nuevo embajador de la República de Guinea en España, Framoi Mara.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Présentation du nouvel ambassadeur, Framoi Mara",
        resumen: "Rencontre de la communauté avec le nouvel ambassadeur de la République de Guinée en Espagne, Framoi Mara.",
        cuerpo: []
      }
    },
    {
      id: 'cena-ministro-granollers',
      tipo: 'noticia',
      fecha: '',                       // PENDIENTE  AAAA-MM-DD
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "Cena con el ministro Ousmane Gaoual en Granollers",
        resumen: "Encuentro del Consejo y las entidades guineanas con el ministro Ousmane Gaoual en Granollers (Barcelona).",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Dîner avec le ministre Ousmane Gaoual à Granollers",
        resumen: "Rencontre du Conseil et des entités guinéennes avec le ministre Ousmane Gaoual à Granollers (Barcelone).",
        cuerpo: []
      }
    },
    {
      id: 'inscripcion-rna',
      tipo: 'noticia',
      fecha: '2024-09-24',
      categoria: 'institucional',
      autor: '',                       // PENDIENTE
      fotos: [],                       // ej. ['assets/img/noticias/malta-1.jpg']
      es: {
        titulo: "El CGE-ES queda inscrito en el Registro Nacional de Asociaciones",
        resumen: "El Ministerio del Interior resuelve la inscripción de constitución del Consejo, con ámbito de actuación en todo el territorio del Estado, bajo el número 629208 de la Sección 1ª.",
        cuerpo: []                     // PENDIENTE
      },
      fr: {
        titulo: "Le CGE-ES est inscrit au Registre national des associations",
        resumen: "Le ministère de l'Intérieur prononce l'inscription de constitution du Conseil, avec un champ d'action couvrant tout le territoire de l'État, sous le numéro 629208 de la Section 1re.",
        cuerpo: []
      }
    }
  ],

  /* ======================================================================
     B) REPERTORIO DE ENTIDADES GUINEANAS
     ----------------------------------------------------------------------
     Se muestran en la página «Entidades», en el orden de esta lista.
     Mientras la lista esté vacía se muestra un aviso de «en construcción».

       sigla     → siglas REALES de la entidad, si las tiene. NO se
                   inventan: muchas no tienen. Si lo dejas vacío se pone
                   la inicial del nombre y ya está.
       cotejada  → false mientras no hayamos comprobado NIF, denominación
                   oficial y número de registro. La ficha se publica
                   igualmente, pero atenuada y sin acción, para no dar por
                   bueno un dato que no lo está. Si no pones el campo, se
                   entiende que sí está cotejada.
       nombre    → denominación completa
       tipo      → 'Asociación' | 'Federación' | 'ONG' | 'Fundación' |
                   'Cooperativa' | 'Consejo'…  (texto libre; si lo dejas
                   vacío no se muestra la etiqueta)
       ciudad    → localidad (opcional)
       provincia → provincia o territorio
       desde     → año de constitución (opcional)
       ambito    → ámbito de actuación: 'Cultura', 'Educación',
                   'Solidaridad', 'Cooperación', 'Deporte', 'Mujer',
                   'Juventud'… Se pueden encadenar separados por comas y
                   cada uno sale como una etiqueta independiente.
       email     → correo de la entidad, o '' para no publicarlo
       web       → URL o '' (opcional)

     ⚠ PROTECCIÓN DE DATOS
     Aquí solo se publican datos de la ENTIDAD. Los teléfonos móviles, las
     direcciones postales y los nombres de las personas de la junta que
     figuran en tu hoja de cálculo se han dejado FUERA a propósito: son
     datos personales y publicarlos requiere el consentimiento de cada
     persona. Lo mismo con los correos que son claramente personales.
     ====================================================================== */

  asociaciones: [
    { sigla: 'AGCO',    nombre: 'Asociación Guineana de Conakry y Originarios',
      tipo: 'Asociación',
      ciudad: 'Granollers', provincia: 'Barcelona', desde: '2003',
      ambito: 'Cultura, Cooperación', email: 'asociacionguineana@gmail.com', web: '' },

    { sigla: 'ASEGORC', nombre: 'Asociación de Emigrantes Guineanos y Originarios Residentes en Catalunya',
      tipo: 'Asociación',
      ciudad: 'Santa Coloma de Gramenet', provincia: 'Barcelona', desde: '2004',
      ambito: '', email: '', web: '' },

    { sigla: 'AMD',     nombre: 'Associació Manden Dekuru (Unió Mandig)',
      tipo: 'Asociación',
      ciudad: 'Sabadell', provincia: 'Barcelona', desde: '2009',
      ambito: 'Cultura', email: '', web: '' },

    { sigla: '',        nombre: 'Asociación Djigui de Guinea (Esperança)',
      tipo: 'Asociación',
      ciudad: 'Salt', provincia: 'Girona', desde: '2010',
      ambito: 'Solidaridad, Cultura', email: 'djiguigirona@gmail.com', web: '' },

    { sigla: 'AKAGE',   nombre: 'Association Konia et Amis Guinéens en Espagne',
      tipo: 'Asociación',
      ciudad: 'Lleida', provincia: 'Lleida', desde: '2010',
      ambito: 'Solidaridad, Cultura', email: 'akage2010konia@hotmail.com', web: '' },

    { sigla: 'CSDBGE',  nombre: 'Consejo Superior de la Diáspora de la Baja Guinea',
      tipo: '',                                   // PENDIENTE de confirmar
      ciudad: 'Barcelona', provincia: 'Barcelona', desde: '2020',
      ambito: 'Cultura, Cooperación', email: 'bassecote.espagne@gmail.com', web: '' },

    { sigla: '',        nombre: 'Femmes Battantes de Barcelone',
      tipo: '',                                   // PENDIENTE de confirmar
      ciudad: 'Barcelona', provincia: 'Barcelona', desde: '',
      ambito: '', email: '', web: '' },

    { sigla: '',        nombre: 'Fasso Balandou de Sabadell',
      tipo: '',                                   // PENDIENTE de confirmar
      ciudad: 'Sabadell', provincia: 'Barcelona', desde: '',
      ambito: '', email: '', web: '' },

    { sigla: '',        nombre: 'Manding de Mataró',
      tipo: '',                                   // PENDIENTE de confirmar
      ciudad: 'Mataró', provincia: 'Barcelona', desde: '',
      ambito: '', email: '', web: '' },

    { sigla: '',        nombre: 'Association des Femmes Guinéennes à Catalunya',
      tipo: 'Asociación',
      ciudad: '', provincia: 'Cataluña', desde: '',
      ambito: 'Mujer', email: '', web: '' }
  ]
};
