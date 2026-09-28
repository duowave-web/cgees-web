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

     EL ORDEN DE ESTA LISTA ES EL ORDEN EN QUE SE MUESTRAN. Lo más reciente
     arriba. La fecha es opcional: si la dejas en '' simplemente no se enseña.

     ⚠ PENDIENTE: los eventos de abajo están sin fecha y con un resumen
       mínimo. Añade la fecha (AAAA-MM-DD) y amplía el resumen de cada uno.
       Cuando estén completos, pon `noticiasDeEjemplo: false` para quitar el
       aviso amarillo de la página de Actualidad.
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
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'consular',
      enlace: '',
      es: {
        titulo: 'Censo RAVEC 2025',
        resumen: 'Campaña del censo administrativo con fines de estado civil (RAVEC). Informamos sobre quién puede inscribirse, qué documentación hace falta y dónde hacerlo.'
      },
      fr: {
        titulo: "Recensement RAVEC 2025",
        resumen: "Campagne du recensement administratif à vocation d'état civil (RAVEC). Nous informons sur qui peut s'inscrire, quels documents sont nécessaires et où le faire."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'consular',
      enlace: '',
      es: {
        titulo: 'Kits de enrolamiento',
        resumen: 'Despliegue de los kits de enrolamiento para la inscripción de la comunidad guineana residente en España.'
      },
      fr: {
        titulo: "Kits d'enrôlement",
        resumen: "Déploiement des kits d'enrôlement pour l'inscription de la communauté guinéenne résidant en Espagne."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Referéndum de la nueva Constitución',
        resumen: 'Participación de la diáspora en la consulta sobre la nueva Constitución: organización del voto y acompañamiento a las personas inscritas.'
      },
      fr: {
        titulo: "Référendum sur la nouvelle Constitution",
        resumen: "Participation de la diaspora à la consultation sur la nouvelle Constitution : organisation du vote et accompagnement des personnes inscrites."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Elecciones a la nueva Asamblea Nacional',
        resumen: 'Organización y acompañamiento del voto de la comunidad guineana en España para la nueva Asamblea Nacional.'
      },
      fr: {
        titulo: "Élections à la nouvelle Assemblée nationale",
        resumen: "Organisation et accompagnement du vote de la communauté guinéenne en Espagne pour la nouvelle Assemblée nationale."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Presentación y entrega de la nueva Constitución',
        resumen: 'Acto de presentación del nuevo texto constitucional y entrega de ejemplares a la comunidad guineana en España.'
      },
      fr: {
        titulo: "Présentation et remise de la nouvelle Constitution",
        resumen: "Cérémonie de présentation du nouveau texte constitutionnel et remise d'exemplaires à la communauté guinéenne en Espagne."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Presentación del nuevo embajador, Framoi Mara',
        resumen: 'Encuentro de la comunidad con el nuevo embajador de la República de Guinea en España, Framoi Mara.'
      },
      fr: {
        titulo: "Présentation du nouvel ambassadeur, Framoi Mara",
        resumen: "Rencontre de la communauté avec le nouvel ambassadeur de la République de Guinée en Espagne, Framoi Mara."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Cena con el ministro Ousmane Gaoual en Granollers',
        resumen: 'Encuentro del Consejo y las entidades guineanas con el ministro Ousmane Gaoual en Granollers (Barcelona).'
      },
      fr: {
        titulo: "Dîner avec le ministre Ousmane Gaoual à Granollers",
        resumen: "Rencontre du Conseil et des entités guinéennes avec le ministre Ousmane Gaoual à Granollers (Barcelone)."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Satisfecit al cónsul en Sabadell',
        resumen: 'Entrega de un satisfecit al cónsul en reconocimiento a su labor con la comunidad guineana, en Sabadell (Barcelona).'
      },
      fr: {
        titulo: "Satisfecit au consul à Sabadell",
        resumen: "Remise d'un satisfecit au consul en reconnaissance de son travail auprès de la communauté guinéenne, à Sabadell (Barcelone)."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'consular',
      enlace: '',
      es: {
        titulo: 'Enrolamiento en Malta',
        resumen: 'Jornada de enrolamiento e inscripción consular para la comunidad guineana residente en Malta.'
      },
      fr: {
        titulo: "Enrôlement à Malte",
        resumen: "Journée d'enrôlement et d'inscription consulaire pour la communauté guinéenne résidant à Malte."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'institucional',
      enlace: '',
      es: {
        titulo: 'Viaje a Malta',
        resumen: 'Desplazamiento del Consejo a Malta para atender a la comunidad guineana del país y coordinar con la representación diplomática.'
      },
      fr: {
        titulo: "Voyage à Malte",
        resumen: "Déplacement du Conseil à Malte pour accompagner la communauté guinéenne du pays et assurer la coordination avec la représentation diplomatique."
      }
    },
    {
      fecha: '',                       // PENDIENTE — formato AAAA-MM-DD
      categoria: 'comunidad',
      enlace: '',
      es: {
        titulo: 'Formación',
        resumen: 'Sesiones de formación dirigidas a la comunidad guineana y a las entidades registradas en el Consejo.'
      },
      fr: {
        titulo: "Formation",
        resumen: "Sessions de formation destinées à la communauté guinéenne et aux entités enregistrées auprès du Conseil."
      }
    },
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
