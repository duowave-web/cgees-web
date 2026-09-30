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

  /* En false: las fichas ya son reales. Solo queda «Referéndum de la nueva
     Constitución» sin fecha ni cuerpo, y esa se publica sin fecha, que es
     lo previsto. Si algún día se vuelven a meter fichas de relleno, ponlo
     en true y sale el aviso amarillo de Actualidad. */
  noticiasDeEjemplo: false,

  categorias: {
    institucional: { es: 'Institucional', fr: 'Institutionnel', en: 'Institutional', clase: 'etiqueta--navy'  },
    consular:      { es: 'Consular',      fr: 'Consulaire',     en: 'Consular',      clase: 'etiqueta--rojo'  },
    comunidad:     { es: 'Comunidad',     fr: 'Communauté',     en: 'Community',     clase: 'etiqueta--oro'   },
    asociaciones:  { es: 'Asociaciones',  fr: 'Associations',   en: 'Associations',  clase: 'etiqueta--verde' }
  },

  noticias: [
    {
      id: '68-aniversario-independencia',
      tipo: 'evento',
      fecha: '2026-10-02',
      categoria: 'comunidad',
      proximo: true,          // aún no ha ocurrido
      autor: '',
      portada: 'assets/img/eventos/68-aniversario-independencia/portada.webp',
      fotos: ['assets/img/eventos/68-aniversario-independencia/01.webp', 'assets/img/eventos/68-aniversario-independencia/02.webp', 'assets/img/eventos/68-aniversario-independencia/03.webp', 'assets/img/eventos/68-aniversario-independencia/04.webp'],
      documentos: [],
      es: {
        titulo: "68.º aniversario de la independencia de Guinea",
        resumen: "Acto conmemorativo del 2 de octubre, organizado por el Consejo. Aquí están los carteles de la convocatoria.",
        cuerpo: [
          "La organización en España del acto conmemorativo del aniversario de la independencia corresponde al Consejo. Es la cita del año: el momento en que las entidades guineanas de todo el territorio coinciden en un mismo sitio.",
          "Los carteles de esta edición están abajo. Si tu entidad quiere participar en la organización, aportar una actuación o montar un puesto, escríbenos."
        ]
      },
      fr: {
        titulo: "68e anniversaire de l'indépendance de la Guinée",
        resumen: "Cérémonie commémorative du 2 octobre, organisée par le Conseil. Les affiches de l'appel à participation sont ici.",
        cuerpo: [
          "L'organisation en Espagne de la commémoration de l'anniversaire de l'indépendance revient au Conseil. C'est le rendez-vous de l'année : le moment où les entités guinéennes de tout le territoire se retrouvent au même endroit.",
          "Les affiches de cette édition sont ci-dessous. Si votre entité souhaite participer à l'organisation, proposer une prestation ou tenir un stand, écrivez-nous."
        ]
      }
    },
    {
      id: 'jornada-legislativas',
      tipo: 'evento',
      fecha: '2026-05-31',
      categoria: 'consular',
      autor: '',
      portada: 'assets/img/eventos/jornada-legislativas/portada.webp',
      fotos: ['assets/img/eventos/jornada-legislativas/01.webp', 'assets/img/eventos/jornada-legislativas/02.webp', 'assets/img/eventos/jornada-legislativas/03.webp', 'assets/img/eventos/jornada-legislativas/04.webp', 'assets/img/eventos/jornada-legislativas/05.webp', 'assets/img/eventos/jornada-legislativas/06.webp'],
      documentos: ['ev-nota-039-barcelona', 'ev-comunicado-007-legislativas', 'ev-papeleta-legislativas'],
      es: {
        titulo: "Jornada electoral: elecciones legislativas",
        resumen: "La comunidad vota para la nueva Asamblea Nacional en los centros habilitados en España.",
        cuerpo: [
          "La comunidad guineana residente en España votó el 31 de mayo de 2026 para la nueva Asamblea Nacional, en los centros de voto habilitados por la Embajada.",
          "El Consejo acompañó la jornada: informó de dónde votar y qué documentación hacía falta, y estuvo presente en los centros. Abajo están la nota verbal del centro de Barcelona, el comunicado con los centros de voto y el modelo de papeleta de las listas nacionales."
        ]
      },
      fr: {
        titulo: "Journée électorale : élections législatives",
        resumen: "La communauté vote pour la nouvelle Assemblée nationale dans les centres ouverts en Espagne.",
        cuerpo: [
          "La communauté guinéenne résidant en Espagne a voté le 31 mai 2026 pour la nouvelle Assemblée nationale, dans les centres de vote ouverts par l'Ambassade.",
          "Le Conseil a accompagné la journée : information sur les lieux de vote et les documents nécessaires, et présence dans les centres. Ci-dessous, la note verbale du centre de Barcelone, le communiqué des centres de vote et le spécimen de bulletin des listes nationales."
        ]
      }
    },
    {
      id: 'jornada-presidenciales',
      tipo: 'evento',
      fecha: '2025-12-28',
      categoria: 'consular',
      autor: '',
      portada: 'assets/img/eventos/jornada-presidenciales/portada.webp',
      fotos: ['assets/img/eventos/jornada-presidenciales/01.webp', 'assets/img/eventos/jornada-presidenciales/02.webp', 'assets/img/eventos/jornada-presidenciales/03.webp', 'assets/img/eventos/jornada-presidenciales/04.webp', 'assets/img/eventos/jornada-presidenciales/05.webp'],
      documentos: ['ev-nota-105-barcelona', 'ev-comunicado-020-presidenciales'],
      es: {
        titulo: "Jornada electoral: elecciones presidenciales",
        resumen: "Votación de la comunidad en los centros habilitados en España, con el Consejo presente en los centros.",
        cuerpo: [
          "La comunidad guineana residente en España votó el 28 de diciembre de 2025 en las elecciones presidenciales, en los centros de voto habilitados por la Embajada.",
          "El Consejo informó de los centros y de la documentación necesaria, y acompañó la jornada. Abajo están la nota verbal del centro de Barcelona y el comunicado con los centros de voto."
        ]
      },
      fr: {
        titulo: "Journée électorale : élection présidentielle",
        resumen: "Vote de la communauté dans les centres ouverts en Espagne, avec le Conseil présent sur place.",
        cuerpo: [
          "La communauté guinéenne résidant en Espagne a voté le 28 décembre 2025 à l'élection présidentielle, dans les centres de vote ouverts par l'Ambassade.",
          "Le Conseil a informé des centres et des documents nécessaires, et a accompagné la journée. Ci-dessous, la note verbale du centre de Barcelone et le communiqué des centres de vote."
        ]
      }
    },
    {
      id: 'nueva-constitucion-madrid',
      tipo: 'evento',
      fecha: '2025-08-02',
      categoria: 'institucional',
      autor: '',
      portada: 'assets/img/eventos/nueva-constitucion-madrid/portada.webp',
      fotos: ['assets/img/eventos/nueva-constitucion-madrid/01.webp'],
      documentos: [],
      es: {
        titulo: "Presentación de la nueva Constitución en Madrid",
        resumen: "Acto de presentación del nuevo texto constitucional a la comunidad guineana en España.",
        cuerpo: [
          "El 2 de agosto de 2025 se presentó en Madrid el nuevo texto constitucional de la República de Guinea a la comunidad guineana residente en España."
        ]
      },
      fr: {
        titulo: "Présentation de la nouvelle Constitution à Madrid",
        resumen: "Cérémonie de présentation du nouveau texte constitutionnel à la communauté guinéenne en Espagne.",
        cuerpo: [
          "Le 2 août 2025, le nouveau texte constitutionnel de la République de Guinée a été présenté à Madrid à la communauté guinéenne résidant en Espagne."
        ]
      }
    },
    {
      id: 'embajador-comunidad-barcelona',
      tipo: 'evento',
      fecha: '2024-08-11',
      categoria: 'comunidad',
      autor: '',
      portada: 'assets/img/eventos/embajador-comunidad-barcelona/portada.webp',
      fotos: ['assets/img/eventos/embajador-comunidad-barcelona/01.webp', 'assets/img/eventos/embajador-comunidad-barcelona/02.webp', 'assets/img/eventos/embajador-comunidad-barcelona/03.webp', 'assets/img/eventos/embajador-comunidad-barcelona/04.webp', 'assets/img/eventos/embajador-comunidad-barcelona/05.webp', 'assets/img/eventos/embajador-comunidad-barcelona/06.webp', 'assets/img/eventos/embajador-comunidad-barcelona/07.webp', 'assets/img/eventos/embajador-comunidad-barcelona/08.webp', 'assets/img/eventos/embajador-comunidad-barcelona/09.webp', 'assets/img/eventos/embajador-comunidad-barcelona/10.webp'],
      documentos: [],
      es: {
        titulo: "El embajador visita a la comunidad en Barcelona",
        resumen: "Encuentro del embajador de Guinea con la comunidad guineana de Cataluña.",
        cuerpo: [
          "El 11 de agosto de 2024 el embajador de la República de Guinea ante España y Malta se reunió en Barcelona con la comunidad guineana de Cataluña, acompañado por el Consejo."
        ]
      },
      fr: {
        titulo: "L'ambassadeur rend visite à la communauté à Barcelone",
        resumen: "Rencontre de l'ambassadeur de Guinée avec la communauté guinéenne de Catalogne.",
        cuerpo: [
          "Le 11 août 2024, l'ambassadeur de la République de Guinée auprès de l'Espagne et de Malte a rencontré à Barcelone la communauté guinéenne de Catalogne, accompagné par le Conseil."
        ]
      }
    },
    {
      id: 'embajador-framoi-mara',
      tipo: 'evento',
      fecha: '2024-05-11',
      categoria: 'institucional',
      autor: '',
      portada: '',
      fotos: [],
      documentos: ['ev-invitacion-embajador', 'ev-memorandum-2024'],
      es: {
        titulo: "Encuentro con el embajador Framoï Mara",
        resumen: "Primer encuentro de la comunidad con el nuevo embajador ante España y Malta, con entrega de un memorándum.",
        cuerpo: [
          "El 11 de mayo de 2024 la comunidad guineana en España se reunió por primera vez con Framoï Mara, nuevo embajador de la República de Guinea ante el Reino de España y Malta.",
          "El Consejo le entregó un memorándum con los asuntos que la comunidad tenía planteados. Ese documento y la convocatoria del encuentro se pueden consultar abajo."
        ]
      },
      fr: {
        titulo: "Rencontre avec l'ambassadeur Framoï Mara",
        resumen: "Première rencontre de la communauté avec le nouvel ambassadeur auprès de l'Espagne et de Malte, avec remise d'un mémorandum.",
        cuerpo: [
          "Le 11 mai 2024, la communauté guinéenne en Espagne a rencontré pour la première fois Framoï Mara, nouvel ambassadeur de la République de Guinée auprès du Royaume d'Espagne et de Malte.",
          "Le Conseil lui a remis un mémorandum reprenant les questions soulevées par la communauté. Ce document et l'invitation à la rencontre sont consultables ci-dessous."
        ]
      }
    },
    {
      id: 'forum-diaspora-conakry',
      tipo: 'evento',
      fecha: '2023-09-13',
      categoria: 'institucional',
      autor: '',
      portada: '',
      fotos: [],
      documentos: ['ev-circular-3131-forum'],
      es: {
        titulo: "Foro Nacional de la Diáspora en Conakry",
        resumen: "Participación del CGE-ES en el Foro Nacional de la Diáspora convocado por el Gobierno de Guinea.",
        cuerpo: [
          "El Gobierno de Guinea convocó en Conakry el Foro Nacional de la Diáspora, al que asistió el Consejo de Guineanos del Exterior en España. La carta circular que lo convoca se puede consultar abajo."
        ]
      },
      fr: {
        titulo: "Forum National de la Diaspora à Conakry",
        resumen: "Participation du CGE-ES au Forum National de la Diaspora convoqué par le Gouvernement guinéen.",
        cuerpo: [
          "Le Gouvernement guinéen a convoqué à Conakry le Forum National de la Diaspora, auquel le Conseil des Guinéens de l'Extérieur en Espagne a participé. La lettre circulaire de convocation est consultable ci-dessous."
        ]
      }
    },
    {
      id: 'syli-national-barcelona',
      tipo: 'evento',
      fecha: '2023-06-17',
      categoria: 'comunidad',
      autor: '',
      portada: 'assets/img/eventos/syli-national-barcelona/portada.webp',
      fotos: ['assets/img/eventos/syli-national-barcelona/01.webp', 'assets/img/eventos/syli-national-barcelona/02.webp', 'assets/img/eventos/syli-national-barcelona/03.webp', 'assets/img/eventos/syli-national-barcelona/04.webp', 'assets/img/eventos/syli-national-barcelona/05.webp', 'assets/img/eventos/syli-national-barcelona/06.webp'],
      documentos: ['ev-comunicado-syli'],
      es: {
        titulo: "El Syli National juega en Barcelona",
        resumen: "La comunidad se reúne para apoyar a la selección de Guinea en su partido en Barcelona.",
        cuerpo: [
          "El 17 de junio de 2023 la selección de Guinea, el Syli National, jugó en Barcelona. La comunidad guineana de toda España se organizó para acompañarla desde la grada.",
          "El comunicado de la Embajada con los detalles del partido está abajo."
        ]
      },
      fr: {
        titulo: "Le Syli National joue à Barcelone",
        resumen: "La communauté se réunit pour soutenir la sélection guinéenne lors de son match à Barcelone.",
        cuerpo: [
          "Le 17 juin 2023, la sélection guinéenne, le Syli National, a joué à Barcelone. La communauté guinéenne de toute l'Espagne s'est organisée pour l'accompagner depuis les tribunes.",
          "Le communiqué de l'Ambassade avec les détails du match est ci-dessous."
        ]
      }
    },
    {
      id: 'presidentes-europa-paris',
      tipo: 'evento',
      fecha: '2023-03-19',
      categoria: 'institucional',
      autor: '',
      portada: '',
      fotos: ['assets/img/eventos/presidentes-europa-paris/01.webp'],
      documentos: ['ev-informe-paris'],
      es: {
        titulo: "Encuentro de presidentes del CGE en Europa",
        resumen: "Los consejos de guineanos de los países europeos se reúnen en París y trabajan por grupos temáticos.",
        cuerpo: [
          "En marzo de 2023 los presidentes de los Consejos de Guineanos del Exterior de los países europeos se reunieron en París. El CGE-ES participó en el encuentro.",
          "El trabajo se organizó en grupos temáticos. Dos de ellos tocaban de cerca lo que más se nos pregunta: el de pasaportes biométricos y el de migración e integración. El informe completo del encuentro, con las conclusiones y las propuestas de cada grupo, se puede consultar abajo."
        ]
      },
      fr: {
        titulo: "Rencontre des présidents du CGE en Europe",
        resumen: "Les conseils des Guinéens des pays européens se réunissent à Paris et travaillent en groupes thématiques.",
        cuerpo: [
          "En mars 2023, les présidents des Conseils des Guinéens de l'Extérieur des pays européens se sont réunis à Paris. Le CGE-ES a participé à la rencontre.",
          "Le travail s'est organisé en groupes thématiques. Deux d'entre eux touchaient de près ce qu'on nous demande le plus : celui des passeports biométriques et celui de la migration et de l'intégration. Le rapport complet de la rencontre, avec les conclusions et les propositions de chaque groupe, est consultable ci-dessous."
        ]
      }
    },
    {
      id: 'ministro-gaoual-barcelona',
      tipo: 'evento',
      fecha: '2023-02-28',
      categoria: 'institucional',
      autor: '',
      portada: 'assets/img/eventos/ministro-gaoual-barcelona/portada.webp',
      fotos: ['assets/img/eventos/ministro-gaoual-barcelona/01.webp', 'assets/img/eventos/ministro-gaoual-barcelona/02.webp', 'assets/img/eventos/ministro-gaoual-barcelona/03.webp', 'assets/img/eventos/ministro-gaoual-barcelona/04.webp', 'assets/img/eventos/ministro-gaoual-barcelona/05.webp', 'assets/img/eventos/ministro-gaoual-barcelona/06.webp', 'assets/img/eventos/ministro-gaoual-barcelona/07.webp', 'assets/img/eventos/ministro-gaoual-barcelona/08.webp', 'assets/img/eventos/ministro-gaoual-barcelona/09.webp', 'assets/img/eventos/ministro-gaoual-barcelona/10.webp'],
      documentos: ['ev-carta-ministro-gaoual'],
      es: {
        titulo: "Recepción al ministro Ousmane Gaoual Diallo",
        resumen: "El Consejo recibe en la provincia de Barcelona al ministro y portavoz del Gobierno de Guinea.",
        cuerpo: [
          "El 28 de febrero de 2023 el Consejo recibió a Ousmane Gaoual Diallo, ministro de Correos, Telecomunicaciones y Economía Digital y portavoz del Gobierno de la República de Guinea, y a la delegación que le acompañaba.",
          "El Consejo le entregó una carta de bienvenida, que se puede consultar abajo."
        ]
      },
      fr: {
        titulo: "Réception du ministre Ousmane Gaoual Diallo",
        resumen: "Le Conseil reçoit dans la province de Barcelone le ministre et porte-parole du Gouvernement guinéen.",
        cuerpo: [
          "Le 28 février 2023, le Conseil a reçu Ousmane Gaoual Diallo, ministre des Postes, des Télécommunications et de l'Économie numérique et porte-parole du Gouvernement de la République de Guinée, ainsi que la délégation qui l'accompagnait.",
          "Le Conseil lui a remis une lettre de bienvenue, consultable ci-dessous."
        ]
      }
    },
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
     C) DOCUMENTOS DE ORIGEN
     ----------------------------------------------------------------------
     Los documentos que amparan la creación del Consejo. Se ven en
     «El Consejo» → Origen y mandato, en un visor que se abre sobre la
     página.

     OJO: el PDF **no se publica**. De cada documento se han generado
     imágenes por página en assets/img/docs/<id>-<n>.webp y es eso lo que
     se sirve. Así se puede consultar sin que el archivo esté ahí para
     descargarlo. No es inviolable —cualquiera puede guardar una imagen con
     el botón derecho— pero el documento en sí no sale del ordenador.

     Para añadir uno nuevo hay que generar las imágenes. El script está en
     el README, punto 13.

       id      → nombre de los archivos de imagen. NO cambiarlo después.
       fecha   → 'AAAA-MM-DD' o 'AAAA-MM' si solo consta el mes
       fuente  → quién lo emite. `fuenteFr` solo si cambia en francés;
                 si no está, se usa `fuente` en los dos idiomas
       paginas → cuántas imágenes hay
     ====================================================================== */

  documentos: [
    { id: 'ev-carta-ministro-gaoual', fecha: '2023-02-28', paginas: 1,
      fuente: "CGE-ES",
      es: "Carta de bienvenida al ministro Ousmane Gaoual Diallo",
      fr: "Lettre de bienvenue au ministre Ousmane Gaoual Diallo" },
    { id: 'ev-informe-paris', fecha: '2023-03-18', paginas: 9,
      fuente: "CGE-Francia",
      es: "Informe del encuentro de presidentes del CGE en Europa",
      fr: "Rapport de la rencontre des présidents du CGE en Europe" },
    { id: 'ev-comunicado-syli', fecha: '2023-06-05', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 009: partido del Syli National",
      fr: "Communiqué 009 : match du Syli National" },
    { id: 'ev-circular-3131-forum', fecha: '2023-08-07', paginas: 1,
      fuente: "MAEIAGE",
      es: "Carta circular 3131: Foro Nacional de la Diáspora",
      fr: "Lettre circulaire 3131 : Forum National de la Diaspora" },
    { id: 'ev-invitacion-embajador', fecha: '2024-05-11', paginas: 1,
      fuente: "CGE-ES",
      es: "Convocatoria del encuentro con el embajador",
      fr: "Communiqué d'invitation à la rencontre avec l'ambassadeur" },
    { id: 'ev-memorandum-2024', fecha: '2024-05-11', paginas: 8,
      fuente: "CGE-ES",
      es: "Memorándum entregado al embajador Framoï Mara",
      fr: "Mémorandum remis à l'ambassadeur Framoï Mara" },
    { id: 'ev-nota-105-barcelona', fecha: '2025-12-17', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Nota verbal 105: centro de votación de Barcelona",
      fr: "Note verbale 105 : centre de vote de Barcelone" },
    { id: 'ev-comunicado-020-presidenciales', fecha: '2025-12-24', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 020: centros de voto de las presidenciales",
      fr: "Communiqué 020 : centres de vote de la présidentielle" },
    { id: 'ev-nota-039-barcelona', fecha: '2026-05-21', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Nota verbal 039: centro de votación de Barcelona",
      fr: "Note verbale 039 : centre de vote de Barcelone" },
    { id: 'ev-comunicado-007-legislativas', fecha: '2026-05-28', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 007: centros de voto de las legislativas",
      fr: "Communiqué 007 : centres de vote des législatives" },
    { id: 'ev-papeleta-legislativas', fecha: '2026-05-31', paginas: 1,
      fuente: "CENI",
      es: "Modelo de papeleta de las listas nacionales",
      fr: "Spécimen de bulletin des listes nationales" },
    { id: 'tdr-assises-nationales', fecha: '2022-03', paginas: 15,
      fuente: "MATD",
      es: "Términos de referencia de las Asambleas Nacionales",
      fr: "Termes de référence des Assises Nationales" },
    { id: 'tdr-renovacion-mesas', fecha: '2022-06', paginas: 4,
      fuente: "MAEIAGE",
      es: "Términos de referencia para renovar las mesas del CGE",
      fr: "Termes de référence pour le renouvellement des bureaux du CGE" },
    { id: 'lettre-circulaire-1875', fecha: '2022-08-05', paginas: 3,
      fuente: "MAEIAGE",
      es: "Carta circular 001875: renovación de las mesas del CGE",
      fr: "Lettre circulaire 001875 : renouvellement des bureaux du CGE" },
    { id: 'comunicado-012', fecha: '2022-08', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 012: videoconferencia del 6 de agosto de 2022",
      fr: "Communiqué 012 : visioconférence du 6 août 2022" },
    { id: 'comunicado-013', fecha: '2022-08-09', paginas: 1,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 013: prórroga del plazo para presentar listas",
      fr: "Communiqué 013 : prorogation du délai de dépôt des listes" },
    { id: 'nota-014', fecha: '2022-08-09', paginas: 2,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Nota 014: criterios de elegibilidad",
      fr: "Note 014 : critères d'éligibilité" },
    { id: 'comunicado-017', fecha: '2022-09-19', paginas: 2,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Comunicado 017: elección de la mesa del CGE",
      fr: "Communiqué 017 : élection du bureau du CGE" },
    { id: 'acta-congreso-constitutivo', fecha: '2022-10-08', paginas: 3,
      fuente: "CGE-ES",
      es: "Acta del congreso constitutivo del CGE-ES",
      fr: "Procès-verbal du congrès constitutif du CGE-ES" },
    { id: 'nota-045-acuse-acta', fecha: '2022-10-25', paginas: 2,
      fuente: "Embajada de Guinea en Madrid", fuenteFr: "Ambassade de Guinée à Madrid",
      es: "Nota 045: acuse de recibo del acta del congreso",
      fr: "Note 045 : accusé de réception du procès-verbal du congrès" },
    { id: 'convenio-cge-europa', fecha: '2023-08-25', paginas: 2,
      fuente: "CGE-Europe",
      es: "Convenio de entendimiento y coordinación del CGE en Europa",
      fr: "Convention d'entente et de coordination du CGE en Europe" },
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
