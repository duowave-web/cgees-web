/* ==========================================================================
   CGE-ES — Contenido editable: noticias y repertorio de asociaciones
   ========================================================================== */

window.CGE_CONTENIDO = {

  /* ======================================================================
     A) NOTICIAS Y AVISOS
     ----------------------------------------------------------------------
     Para publicar algo nuevo, copia un bloque entero y ponlo EL PRIMERO de
     la lista. Se muestra solo en la portada (las 3 más recientes) y en la
     página de Actualidad (todas).

       fecha      → AAAA-MM-DD
       categoria  → 'institucional' | 'consular' | 'comunidad' | 'asociaciones'
       enlace     → URL, o '' si todavía no hay página de detalle
       es/fr/en   → { titulo, resumen }

     ⚠ Salvo la primera, las entradas de abajo son EJEMPLOS de maquetación.
       Sustitúyelas por contenido real y pon `noticiasDeEjemplo: false`.
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
      /* ✅ Esta entrada sí es real: consta en la resolución del Ministerio. */
      fecha: '2024-09-24',
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'El CGE-ES queda inscrito en el Registro Nacional de Asociaciones',
        resumen: 'El Ministerio del Interior resuelve la inscripción de constitución del Consejo, con ámbito de actuación en todo el territorio del Estado, bajo el número 629208 de la Sección 1ª.'
      },
      fr: {
        titulo: 'Le CGE-ES est inscrit au Registre national des associations',
        resumen: "Le ministère de l'Intérieur prononce l'inscription de constitution du Conseil, avec un champ d'action couvrant tout le territoire de l'État, sous le numéro 629208 de la Section 1re."
      },
      en: {
        titulo: 'CGE-ES entered in the National Register of Associations',
        resumen: 'The Ministry of the Interior registers the Council’s incorporation, operating across the whole of Spain, under number 629208 of Section 1.'
      }
    },
    {
      fecha: '2026-06-18',
      categoria: 'comunidad',
      enlace: '',
      es: {
        titulo: 'Abierta la convocatoria para la Fiesta de la Independencia',
        resumen: 'Las asociaciones federadas que quieran participar en la organización del 2 de octubre pueden comunicarlo ya al Consejo.'
      },
      fr: {
        titulo: "Appel à participation pour la Fête de l'Indépendance",
        resumen: "Les associations fédérées souhaitant participer à l'organisation du 2 octobre peuvent dès à présent se manifester auprès du Conseil."
      },
      en: {
        titulo: 'Call for participation in the Independence Day celebration',
        resumen: 'Member associations wishing to take part in organising the 2 October event can now let the Council know.'
      }
    },
    {
      fecha: '2026-05-09',
      categoria: 'consular',
      enlace: '',
      es: {
        titulo: 'Recordatorio: revisa la caducidad de tu pasaporte',
        resumen: 'Buena parte de los expedientes que se atascan lo hacen por un pasaporte vencido. La renovación lleva tiempo: conviene no dejarlo para el final.'
      },
      fr: {
        titulo: "Rappel : vérifiez la validité de votre passeport",
        resumen: "Une bonne partie des dossiers bloqués le sont à cause d'un passeport périmé. Le renouvellement prend du temps : mieux vaut ne pas attendre."
      },
      en: {
        titulo: 'Reminder: check your passport expiry date',
        resumen: 'Many stalled files are held up by an expired passport. Renewal takes time, so it is best not to leave it until the last minute.'
      }
    },
    {
      fecha: '2026-04-02',
      categoria: 'asociaciones',
      enlace: '',
      es: {
        titulo: 'El repertorio de asociaciones suma nuevas provincias',
        resumen: 'Continúa el trabajo de censo de las asociaciones guineanas que operan en España. Si la tuya aún no figura, escríbenos.'
      },
      fr: {
        titulo: "Le répertoire des associations s'étend à de nouvelles provinces",
        resumen: "Le recensement des associations guinéennes actives en Espagne se poursuit. Si la vôtre n'y figure pas encore, écrivez-nous."
      },
      en: {
        titulo: 'The association directory expands to new provinces',
        resumen: 'Work continues on the census of Guinean associations operating in Spain. If yours is not listed yet, get in touch.'
      }
    },
    {
      fecha: '2026-01-15',
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Reunión de trabajo con administraciones locales',
        resumen: 'El Consejo traslada a los servicios sociales municipales las principales necesidades detectadas por las asociaciones durante el último año.'
      },
      fr: {
        titulo: 'Réunion de travail avec les administrations locales',
        resumen: "Le Conseil transmet aux services sociaux municipaux les principaux besoins identifiés par les associations au cours de l'année écoulée."
      },
      en: {
        titulo: 'Working meeting with local authorities',
        resumen: 'The Council presents municipal social services with the main needs identified by member associations over the past year.'
      }
    },
    {
      fecha: '2025-11-28',
      categoria: 'comunidad',
      enlace: '',
      es: {
        titulo: 'Campaña de información sobre el empadronamiento',
        resumen: 'Recordamos que empadronarse es un derecho independiente de la situación administrativa y la puerta de entrada a la sanidad y la educación.'
      },
      fr: {
        titulo: "Campagne d'information sur l'inscription au registre municipal",
        resumen: "Nous rappelons que l'inscription au registre municipal est un droit indépendant de la situation administrative et la porte d'accès à la santé et à l'éducation."
      },
      en: {
        titulo: 'Information campaign on municipal registration',
        resumen: 'We recall that municipal registration is a right independent of administrative status and the gateway to healthcare and education.'
      }
    }
  ],

  /* ======================================================================
     B) REPERTORIO DE ENTIDADES GUINEANAS
     ----------------------------------------------------------------------
     Se muestran en la página «Entidades», en el orden de esta lista.
     Mientras la lista esté vacía se muestra un aviso de «en construcción».

       sigla     → 2-7 letras para el cuadrado azul. Si lo dejas vacío,
                   se generan solas a partir del nombre.
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
