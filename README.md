# CGE-ES — Sitio web

Web institucional del **Consejo de Guineanos del Exterior en España (CGE-ES)**.

| | |
|---|---|
| **Vista previa** | https://duowave-web.github.io/cgees-web/ |
| **Repositorio** | https://github.com/duowave-web/cgees-web |
| **Dominio final previsto** | www.cge-es.org |

> La vista previa se actualiza sola cada vez que se sube un cambio (tarda un par de minutos).
> Es **un borrador**: lleva `noindex` para que no salga en Google.

HTML, CSS y JavaScript puros. **Sin compilación, sin dependencias, sin base de datos.**
Se edita con cualquier editor de texto y se publica copiando la carpeta a un servidor.

Idiomas: **español** (base) y **francés**.

---

## 1. Ver la web en tu ordenador

```bash
python -m http.server 5173
```

Abre `http://localhost:5173`. Para pararlo, `Ctrl + C`.

---

## 2. Datos oficiales ya incorporados

Tomados de la Tarjeta de Identificación Fiscal de la AEAT y de la resolución de
inscripción del Ministerio del Interior (salida nº 19017, clave 3844-2024):

| Dato | Valor |
|---|---|
| Denominación | Consejo de Guineanos del Exterior en España — CGE ES |
| NIF | **G26752907** (definitivo, 29-09-2024) |
| Registro Nacional de Asociaciones | **Sección 1ª, nº 629208** |
| Fecha de inscripción | 24 de septiembre de 2024 |
| Acta fundacional | 27 de abril de 2024 |
| Domicilio social y fiscal | Avda. del Cerro de los Ángeles, 25 — 1ª planta, puerta A · 28026 Madrid |
| Ámbito | Todo el territorio del Estado |
| Presidencia | Mamadou Diallo Diallo |

> ⚠️ **Dos cosas a confirmar.**
> 1. La tarjeta de la AEAT dice «del Exterior **DE** España» y la resolución del Interior dice
>    «del Exterior **EN** España». La web usa la fórmula del Interior, que es la de la
>    inscripción constitutiva.
> 2. La resolución del Interior escribe **«Mamadou Diallo Diallo»** y la hoja del Bureau
>    **«DIALLO Mamadou»**. La web usa la forma del Bureau, por ser el documento propio de la
>    entidad. Si el nombre registral completo debe figurar tal cual, dímelo.
> 3. La hoja del Bureau se titula «CONSEIL DES GUINÉENS DE L'EXTÉRIEUR EN **ESPAGNE/MALTE**»,
>    pero el ámbito inscrito en el Ministerio del Interior es «todo el territorio del Estado»
>    español. La web no menciona Malta para no contradecir la inscripción: si el mandato
>    guineano incluye Malta y queréis reflejarlo, hay que redactarlo con cuidado.

---

## 3. ⚠️ Lo que falta antes de publicar

Todo lo pendiente aparece **resaltado en amarillo con subrayado discontinuo** en la web.

### 📄 `assets/js/layout.js` → bloque `SITIO`

| Campo | Qué poner |
|---|---|
| `whatsapp` | Opcional |
| `redes.instagram` / `redes.youtube` | Opcionales. **Si lo dejas vacío, el icono no aparece** |

Ya están puestos: el correo, los dos teléfonos (679 901 221 y 637 631 003), el IBAN, el BIC y
las redes **Facebook** y **TikTok**.

> **El titular de la cuenta va «de España», no «en España».** Es como figura en el banco y
> tiene que coincidir exactamente o la transferencia puede rebotar. En el resto de la web la
> denominación es «en España», que es la registral. Cuando el banco lo corrija, igualad las
> dos en `SITIO.banco.titular`.

> **El domicilio solo aparece en la ficha informativa de «El Consejo»**, etiquetado como
> domicilio social. No es una oficina y no hay atención presencial: ponerlo en el pie o en
> Contacto hacía que la gente se presentara allí. Si lo añadís en algún sitio nuevo, ponedlo
> siempre con esa etiqueta.

> De la Embajada de Guinea **solo se publica el enlace a su web**, no su dirección, sus
> teléfonos ni su horario. Los cambian sin avisar y, cuando se quedan viejos, la gente hace el
> viaje en balde creyendo que el dato es nuestro. Si algún día queréis publicarlos, hay que
> asumir revisarlos.

### 📄 `quienes-somos.html`

La página tiene cuatro apartados y nada más, en este orden: **Origen y mandato**,
**Junta Directiva**, **Logros e hitos** y **Ficha informativa**.

- **Origen y mandato**: ✅ completo, con las tres fechas clave (creación el 8/10/2022, RNA el
  24/9/2024 y RECEX el 18/6/2026) y los documentos que amparan la creación, plegados en un
  desplegable para que no estorben.
- **Logros e hitos**: se pinta solo, con las fichas de `contenido.js` que llevan
  `tipo: 'logro'`. Para mover una a Actualidad, cambia esa palabra por `'noticia'`.
  Dentro de esas fichas, el campo **`clase`** decide cómo se ve: `'logro'` sale con tick
  verde, `'acto'` con estrella dorada. Se separan porque meterlo todo bajo «Logros» daba a
  entender que todo son cosas conseguidas, y hay actos que no lo son.
  Y **`destacado: true`** saca una ficha en grande delante de las demás: es el logro
  principal, ahora la mejora en la tramitación de documentación. Solo debería llevarlo una.

  > Los resúmenes de estas fichas son **cortos a propósito**: se ven en una celda de unos
  > 370 px y el CSS los corta a dos líneas. Si escribes un párrafo de noticia, se trunca.
- **Junta Directiva**: ✅ completa. Va en una **ficha a dos columnas**
  (`class="ficha ficha--dos"`), el mismo formato que la ficha informativa del final. Eran
  dieciséis cargos y en tabla a una columna la página se iba de largo. En móvil vuelve a
  una sola columna.

  Abdoulaye Soumah aparece **una sola vez**, en su fila de Vicepresidencia, con la etiqueta
  «Tesorería en funciones». Antes tenía dos filas y parecían dos personas.

  El orden es el **jerárquico de los estatutos** y los números **los pone el CSS** con un
  contador, no están escritos en el HTML: si reordenas o añades un cargo, se recolocan solos.
  No toques ningún número al editar la lista.

  La **Asesoría no se numera**: lleva `ficha__fila--sinnumero`, que además impide que consuma
  número, así que la cuenta acaba en 15 y no salta ninguno. No es un cargo electo de la
  jerarquía. Si añades otra figura asesora, ponle esa misma clase. **No se publican** los teléfonos, correos, códigos postales
  ni profesiones que figuran en la hoja: son datos personales.
  - **Tesorería**: consta **Fode Diakite** tachado y marcado como suspendido, y **Abdoulaye
    Soumah** como tesorero en funciones.

    > Publicar que una persona concreta está suspendida por un expediente disciplinario es un
    > dato personal sensible y puede dar pie a una reclamación del afectado. Se ha puesto
    > porque lo pedisteis expresamente, con la redacción más neutra posible y sin entrar en el
    > motivo. Si el expediente se archiva o se resuelve, **acordaos de actualizar esa fila**:
    > dejarla así indefinidamente es lo que más riesgo tiene.
- **Ficha informativa**: ✅ completa, con NIF, RNA, RECEX, domicilio social, teléfonos, correo
  y cuenta bancaria.

### 📄 `assets/js/contenido.js`
- **Repertorio de asociaciones**: ya están cargadas las 10 de tu hoja de cálculo. Faltan
  algunos datos (ver punto 6) y **todas son de Cataluña**: cuando tengas asociaciones de otras
  comunidades, añádelas ahí.
- **Noticias y logros**: las 12 fichas están cargadas. Cada una lleva un campo `tipo`:
  `'noticia'` sale en Actualidad y en la portada, `'logro'` sale en «El Consejo». El reparto
  actual (6 y 6) **lo hice yo a ojo**: revisadlo y cambiad la palabra en las que no encajen.
- **A cada ficha le faltan** la fecha (`AAAA-MM-DD`), el `cuerpo`, el `autor` y las `fotos`.
  Mientras el `cuerpo` esté vacío, la noticia **no se puede abrir**: la tarjeta no ofrece el
  enlace, a propósito, para que nadie llegue a una página en blanco. En cuanto escribáis el
  cuerpo, el enlace aparece solo. Cuando estén todas completas, pon `noticiasDeEjemplo: false`
  para quitar el aviso amarillo de Actualidad.
- **La inscripción se hace desde Contacto.** La página de Entidades solo tiene un botón que
  lleva allí; los documentos que hay que adjuntar están junto al formulario. Antes el
  procedimiento estaba en las dos páginas y había dos sitios donde mirar lo mismo. Si añades
  requisitos, van en `contacto.html`.
- **Entidades**: dos campos nuevos. `cotejada: false` marca la entidad como «datos por
  verificar» y la enseña atenuada y sin acción; si no pones el campo, se entiende que sí está
  cotejada. Y las **siglas ya no se inventan**: si el campo `sigla` está vacío se pone la
  inicial del nombre. Antes se fabricaban juntando iniciales y salían siglas que nadie usa.

### 📄 `index.html`
- **Fiesta de la Independencia**: fecha, hora y lugar de la próxima edición.

### 📄 `aviso-legal.html` y `privacidad.html`
- Fecha de «Última actualización».
- **Revisión por una persona con formación jurídica** antes de publicar.

### 13. Los documentos de origen

En «El Consejo» → Origen y mandato hay diez documentos oficiales que se pueden consultar en
un visor que se abre sobre la página.

**El PDF no se publica.** De cada documento se generan imágenes por página en
`assets/img/docs/<id>-<n>.webp`, y es eso lo que se sirve. Así se puede leer el documento sin
que el archivo esté ahí para descargarlo.

> Que quede claro: esto **no es inviolable**. Cualquiera puede guardar una imagen con el botón
> derecho o hacer una captura. Lo que se consigue es que el PDF original no salga del
> ordenador y que no haya ningún botón de descarga. Si hiciera falta protección de verdad, no
> se publica en una web abierta.

Las imágenes se cargan **al abrir** el documento, no al cargar la página: son 35 y pesan
4,6 MB en total.

**Para añadir un documento nuevo:**

1. Añádelo a la lista `DOCS` de `dev/generar-documentos.py`, con su `id`, su ruta, su fecha,
   la fuente y el título en los dos idiomas.
2. Ejecuta `python dev/generar-documentos.py`. Necesita PyMuPDF y Pillow
   (`pip install pymupdf pillow`).
3. Copia la entrada al array `documentos` de `assets/js/contenido.js`.

**No cambies el `id` de un documento ya publicado**: es el nombre de sus archivos de imagen.

### Fondos alternos

Las secciones alternan blanco y gris (`seccion--gris`) para que cada bloque se despegue del
anterior. **Si añades o quitas una sección, comprueba el alternado**: dos bloques del mismo
color seguidos se leen como uno solo y se pierde el corte. El hero cuenta como navy.

### Densidad y llamadas a la acción

La web se ajustó para ocupar menos: cuerpo de letra 15,5 px, interlineado 1,58 y menos aire
entre secciones. Entre un 21 % y un 34 % menos de scroll por página.

La portada pasó de 5695 a 2891 px (−49 %): se quitaron «La red» y «Puertas abiertas»,
las tarjetas de servicios perdieron el párrafo que repetía su propia lista, y la banda de
imagen de las noticias dejó de ser un 16/9 cuando lo único que hay dentro es el emblema.

**No hay bloques de «¿Hablamos?» al final de las páginas.** Se quitaron todos a propósito:
Contacto va resaltado como botón verde en la barra fija de todas las páginas, así que
repetirlo abajo no añadía nada y alargaba el scroll. Si alguna vez se vuelve a añadir uno,
que sea en una sola página, no en seis.

En la cabecera, cada apartado lleva un icono. **Por debajo de 1000 px los iconos se ocultan**
(ver `styles.css`, media query de 1000 px): con ellos el menú se salía de la cabecera a partir
de ~960 px. Se sacrifica el icono, que es decoración, para que el menú completo aguante hasta
821 px antes de pasar al cajón de hamburguesa.

### Quitar el resaltado amarillo
Cuando ya no quede nada pendiente, busca `class="pendiente"` en los `.html` y borra ese
atributo, o desactiva el estilo en `assets/css/styles.css` (sección 20).

---

## 4. Estructura del sitio

```
├── index.html                Portada
├── quienes-somos.html        El Consejo: origen, mandato, datos registrales, Junta Directiva
├── asociaciones.html         Repertorio de asociaciones registradas y cómo adherirse
├── servicios.html            Las tres áreas de trabajo
├── asuntos-consulares.html   Guía consular y datos de la Embajada de Guinea
├── actualidad.html           Noticias y avisos, con filtros
├── contacto.html             Formulario, datos y mapa
├── aviso-legal.html          Aviso legal (LSSI-CE)
├── noticia.html              Plantilla para leer una noticia entera (?id=...)
├── privacidad.html           Privacidad y cookies (RGPD)
├── 404.html                  Página de error
├── robots.txt / sitemap.xml
│
└── assets/
    ├── css/styles.css        TODO el diseño
    ├── img/
    │   ├── logo.svg                 El emblema. Único, se usa en todo el sitio
    │   ├── favicon.svg              Icono de la pestaña (emblema simplificado)
    │   └── png/                     El emblema en PNG (ver punto 12)
    └── js/
        ├── layout.js       Datos de la entidad + menú + cabecera + pie  ← EDITAR AQUÍ
        ├── contenido.js    Noticias y repertorio de asociaciones        ← EDITAR AQUÍ
        ├── i18n.js         Traducción al francés (419 claves)
        └── main.js         Idiomas, menú, acordeón, filtros, directorio, formulario
```

---

## 5. Qué NO debe publicarse en la web

Esto es importante y ya se ha corregido una vez. Son criterios de funcionamiento interno del
Consejo que **no van en la web pública**:

- Que la vía normal de trabajo sea la asociación y no la persona individual.
- Que la acreditación social se reserve a determinados perfiles o se canalice por asociación.
- Cualquier referencia a «no tratamos todos los casos» o a criterios de admisión.
- Afirmar que los servicios son gratuitos.

Si alguna vez se reintroduce alguno de estos mensajes por error, la web vuelve a prometer o a
excluir cosas que no corresponde publicar. La página de acreditación social
(`tramites.html`) se eliminó por este motivo.

Lo que sí se publica sobre extranjería es únicamente el hecho institucional: el CGE-ES es
entidad colaboradora en materia de extranjería, sin detallar el procedimiento interno.

---

## 6. El repertorio de entidades y la protección de datos

Las 10 entidades de tu hoja de cálculo están cargadas en `assets/js/contenido.js`.
De cada una se publica **solo lo que es dato de la entidad**: nombre, siglas, tipo, localidad,
provincia, año de constitución, ámbito de actuación y —cuando la dirección es de la entidad y
no de una persona— el correo.

**Tipo de entidad** (`tipo`): texto libre, pensado para `Asociación`, `Federación`, `ONG`,
`Fundación`, `Consejo`… Si lo dejas vacío no se muestra la etiqueta. Está puesto en las que el
nombre lo deja claro; **falta confirmar** el de CSDBGE, Femmes Battantes de Barcelone, Fasso
Balandou de Sabadell y Manding de Mataró.

**Ámbito de actuación** (`ambito`): admite varios valores separados por comas —`Cultura`,
`Educación`, `Solidaridad`, `Cooperación`, `Deporte`, `Mujer`, `Juventud`…— y cada uno sale
como una etiqueta independiente.

**Se han dejado fuera a propósito**, aunque estén en tu hoja:

- los **teléfonos móviles** (son personales, no centralitas);
- las **direcciones postales** de los locales, que en varios casos son domicilios;
- los **nombres de presidencia, secretaría y tesorería**;
- el **correo `seboukaba71@gmail.com`**, que es claramente personal.

Publicar esos datos requiere el consentimiento de cada persona. Si lo tienes, dímelo y los
añado; es cuestión de un rato. Mientras tanto, quien quiera contactar con una asociación sin
correo publicado puede escribir al Consejo.

**Datos que faltan en la hoja** y convendría completar: AMD y ASEGORC no tienen correo de
asociación; Femmes Battantes de Barcelone, Fasso Balandou de Sabadell, Manding de Mataró y
Association des Femmes Guinéennes à Catalunya no tienen NIF, fecha de constitución ni número
de registro. Las cuatro últimas aparecen en la web solo con nombre y localidad.

> Nota: la web dice «asociaciones registradas», no «federadas». En `contenido.js` el campo
> `sigla` puede ir vacío: las siglas se generan solas a partir del nombre.

---

## 7. Tareas habituales

### Cambiar el teléfono, el domicilio o el IBAN
`assets/js/layout.js` → bloque `SITIO`. Se actualiza en las 10 páginas a la vez.

### Añadir una asociación al repertorio
`assets/js/contenido.js` → array `asociaciones`:

```js
{ sigla: 'AGB', nombre: 'Asociación Guineana de Barcelona',
  ciudad: 'Barcelona', provincia: 'Barcelona', desde: '2025',
  ambito: 'Cultura', email: '', web: '' },
```

### Publicar una noticia o un evento
`assets/js/contenido.js` → array `noticias`. Copia un bloque entero, ponlo **el primero** y
cambia fecha, categoría y textos en los dos idiomas. Aparece sola en portada (las 3 primeras)
y en Actualidad (todas).

Dos cosas que conviene saber:

- **El orden de la lista es el orden en que se ve.** Lo primero del archivo es lo primero de
  la web. No se reordena por fecha, así que puedes colocar cada ficha donde quieras.
- **La fecha es opcional.** Si la dejas en `''`, la ficha se publica sin fecha en vez de
  quedarse fuera. Es lo que permite tener los eventos ya cargados mientras se confirman.
Categorías: `institucional`, `consular`, `comunidad`, `asociaciones`.

### Cambiar un texto
El **español** está en los `.html`. Ábrelos, busca la frase y cámbiala. Para que cambie
también en francés, busca en `assets/js/i18n.js` la clave del atributo `data-i18n` de ese
elemento. Si una traducción no existe, se muestra el español: nunca se rompe.

### Añadir una página al menú
`assets/js/layout.js` → array `NAV`.

### Volver a añadir un idioma
`assets/js/main.js` → `var IDIOMAS = ['es', 'fr'];`, el selector en `layout.js` y un nuevo
bloque en `i18n.js`.

### Cambiar los colores
`assets/css/styles.css`, sección 1: `--rojo #CE1126`, `--amarillo #FCD116`,
`--verde #009E49`, `--navy #1F2A37`.

---

## 8. Hacer que el formulario envíe correos de verdad

Ahora mismo abre el programa de correo del usuario con el mensaje redactado. Funciona sin
configurar nada, pero es mejor recibirlo directamente:

1. Regístrate en [formspree.io](https://formspree.io) (plan gratuito hasta 50 mensajes/mes).
2. Crea un formulario. Te dará una URL tipo `https://formspree.io/f/xxxxxxx`.
3. En `contacto.html`, busca `data-endpoint=""` y pega la URL dentro.

El formulario ya lleva campo trampa antispam, validación en los dos idiomas y casilla RGPD.

---

## 9. Trabajar en equipo con GitHub

El proyecto está en un repositorio de Git. La vista previa se publica sola en **GitHub Pages**
cada vez que se sube un cambio.

> ⚠️ Mientras el sitio sea un borrador, las 10 páginas llevan
> `<meta name="robots" content="noindex, nofollow">` para que no aparezca en Google.
> Busca el comentario `BORRADOR` y quita esas dos líneas cuando publiquéis en cge-es.org.

### Descargar el proyecto por primera vez

```bash
git clone https://github.com/duowave-web/cgees-web.git
```

Luego se abre `index.html`, o mejor se levanta el servidor local (punto 1).

### Enviar cambios

```bash
git add -A
git commit -m "Describe aquí lo que has cambiado"
git push
```

En un minuto los cambios están en la web de vista previa.

### Traer los cambios de la otra persona

```bash
git pull
```

Hazlo **antes** de empezar a editar. Si los dos tocáis el mismo archivo a la vez, Git avisa de
un conflicto y hay que resolverlo a mano: para evitarlo, repartíos los archivos (por ejemplo,
uno toca los textos de los `.html` y otro los datos de `assets/js/`).

### Si prefieres no usar la terminal

[GitHub Desktop](https://desktop.github.com) hace lo mismo con botones: *Fetch*, *Commit* y
*Push*. Es la opción recomendada para quien no esté acostumbrado a la línea de comandos.

---

## 10. Publicar

**Netlify (lo más sencillo):** entra en [app.netlify.com/drop](https://app.netlify.com/drop),
arrastra la carpeta entera y conecta el dominio en *Domain settings*.

**Hosting clásico:** sube todo a `public_html/` por FTP. No hace falta PHP ni base de datos.

**Después:** comprueba que el HTTPS está activo y da de alta la web en
[Google Search Console](https://search.google.com/search-console) enviando
`https://www.cge-es.org/sitemap.xml`.

Si el dominio final no fuera `www.cge-es.org`, busca y reemplaza esa cadena en los `.html`,
en `robots.txt` y en `sitemap.xml`.

---

## 11. Datos de terceros usados en la web

**Embajada de la República de Guinea en España y Malta**. Sus datos aparecen únicamente en la
página de asuntos consulares; en el pie de página ya no se muestran:
Calle Luis Muriel, 4 · Madrid · +34 914 352 928 / +34 914 311 004 ·
embajada@guineamadrid.es · [es.ambaguinee.org](https://es.ambaguinee.org/) ·
L–V 9:00–16:00.

> El código postal aparece como **28002** en la web de la propia Embajada y como **28001** en
> el directorio del Ayuntamiento de Madrid. La web usa el 28002. Conviene confirmarlo con
> ellos y, de paso, avisarles de que vamos a enlazarles.

Se edita en `assets/js/layout.js` → `SITIO.embajada`.

---

## 12. Identidad visual

| Color | Código |
|---|---|
| Rojo | `#CE1126` |
| Amarillo | `#FCD116` |
| Verde | `#009E49` |
| Rojo del emblema | `#D60A07` |

El **idioma activo** del selector va en el rojo de la bandera (`--rojo`), no en verde: el
verde es el del botón de Contacto, que está justo al lado, y juntos parecían dos piezas de
lo mismo. El amarillo se probó y llamaba más la atención que la propia llamada a la acción.
| Amarillo del emblema | `#FCC803` |
| Verde del emblema | `#37960E` |
| Gris oscuro | `#1F2A37` |
| Gris claro | `#E6E6E6` |

**Tipografía:** Montserrat (400–800), desde Google Fonts. Si prefieres no depender de Google
(ver política de privacidad, punto 7), descarga la fuente a `assets/fonts/` y sustituye el
`<link>` de cada `.html` por un `@font-face` en `styles.css`.

**Logo:** `assets/img/logo.svg` es el emblema oficial, reconstruido en vectorial a partir del
archivo que nos pasasteis. Lleva «CONSEIL DES GUINÉENS DE L'ÉTRANGER» arriba y «ESPAGNE» abajo.

Es **el mismo en toda la web**: cabecera, pie y páginas interiores. Al ser redondo y llevar el
aro rojo por fuera, se ve igual sobre blanco que sobre el fondo oscuro del pie, así que ya no
hacen falta versiones clara y oscura.

Va todo en trazos, sin texto tipográfico: la letra del original es una gruesa condensada que no
tenemos, y sustituirla por Montserrat se notaba en el ancho. La ventaja es que se ve idéntico en
cualquier sitio (navegador, Word, PDF) sin depender de ninguna fuente instalada. La pega es que
**no se puede reescribir el texto editando el SVG**: si algún día cambia la denominación, hay
que rehacerlo desde el archivo original.

`favicon.svg` es el emblema reducido a los tres aros: a 16 px el texto y el apretón de manos no
se distinguen y solo ensucian.

### Versiones en PNG

En `assets/img/png/`, con **fondo transparente**:

| Archivo | Tamaño | Para qué |
|---|---|---|
| `cge-es-logo-512.png` | 512 px | Firmas de correo, redes sociales, documentos |
| `cge-es-logo-1024.png` | 1024 px | Uso general, presentaciones |
| `cge-es-logo-2048.png` | 2048 px | Imprenta, carteles, camisetas |

**Para documentos oficiales, cartas o cualquier cosa que vaya a imprimirse, usa el SVG si el
programa lo admite** (Word y Google Docs sí): no pierde nitidez a ningún tamaño. El PNG solo
donde no quede otro remedio.

Si hace falta otro tamaño, se regenera con Chrome sin instalar nada; pídemelo y lo hago.

---

## 13. Accesibilidad y privacidad

- Navegación completa con teclado y enlace «Saltar al contenido».
- Etiquetas ARIA en menú, acordeón, filtros y formulario.
- Respeta la preferencia del sistema de *reducir movimiento*.
- **Sin cookies de análisis, publicidad ni seguimiento**, por lo que **no hace falta banner de
  cookies**. Solo se guarda el idioma elegido en el almacenamiento local del navegador.
- La única conexión externa es Google Fonts, documentada en la política de privacidad.
