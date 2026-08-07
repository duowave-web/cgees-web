# CGE-ES — Sitio web

Web institucional del **Consejo de Guineanos del Exterior en España (CGE-ES)**.
Dominio previsto: **www.cgees.org**

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
> 2. En la resolución, Mamadou Diallo Diallo figura como quien actúa «en nombre y
>    representación de la entidad». La web lo sitúa en la Presidencia: confirma el cargo exacto.

---

## 3. ⚠️ Lo que falta antes de publicar

Todo lo pendiente aparece **resaltado en amarillo con subrayado discontinuo** en la web.

### 📄 `assets/js/layout.js` → bloque `SITIO`

| Campo | Qué poner |
|---|---|
| `telefono` / `telefonoTel` | Teléfono real de atención |
| `horario` | Horario real de atención |
| `banco.iban` | **IBAN de la entidad.** Mientras esté vacío, el bloque de datos bancarios no aparece en la web |
| `banco.bic` / `banco.entidad` | Opcionales: si los dejas vacíos, esas filas no se muestran |
| `whatsapp` | Opcional |
| `redes.*` | URLs de Facebook, Instagram, LinkedIn y YouTube. **Si lo dejas vacío, el icono no aparece** |

El correo ya está puesto: `infocgees@gmail.com`.

### 📄 `quienes-somos.html`

- **Origen y mandato**: añade la referencia exacta de la orden o decreto del Gobierno de Guinea
  que crea el Consejo de Guineanos del Exterior, y la fecha de la votación en la que se eligió
  la Junta Directiva en España. Es el dato que más peso institucional da a toda la web.
- **Junta Directiva**: los cinco `Nombre y apellidos` restantes.

### 📄 `assets/js/contenido.js`
- **Repertorio de asociaciones**: ya están cargadas las 10 de tu hoja de cálculo. Faltan
  algunos datos (ver punto 6) y **todas son de Cataluña**: cuando tengas asociaciones de otras
  comunidades, añádelas ahí.
- **Noticias**: la primera es real (la inscripción registral). Las otras cinco son ejemplos.
  Cuando las sustituyas, pon `noticiasDeEjemplo: false` para quitar el aviso amarillo.

### 📄 `index.html`
- **Fiesta de la Independencia**: fecha, hora y lugar de la próxima edición.

### 📄 `aviso-legal.html` y `privacidad.html`
- Fecha de «Última actualización».
- **Revisión por una persona con formación jurídica** antes de publicar.

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
├── privacidad.html           Privacidad y cookies (RGPD)
├── 404.html                  Página de error
├── robots.txt / sitemap.xml
│
└── assets/
    ├── css/styles.css        TODO el diseño
    ├── img/
    │   ├── logo.svg                 Escudo institucional a color
    │   ├── logo-blanco.svg          El mismo logo, en versión clara para el pie
    │   ├── sello-institucional.svg  Sello redondo para documentos
    │   └── favicon.svg              Icono de la pestaña
    └── js/
        ├── layout.js       Datos de la entidad + menú + cabecera + pie  ← EDITAR AQUÍ
        ├── contenido.js    Noticias y repertorio de asociaciones        ← EDITAR AQUÍ
        ├── i18n.js         Traducción al francés (529 claves)
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

## 6. El repertorio de asociaciones y la protección de datos

Las 10 asociaciones de tu hoja de cálculo están cargadas en `assets/js/contenido.js`.
De cada una se publica **solo lo que es dato de la entidad**: nombre, siglas, localidad,
provincia, año de constitución, área de trabajo y —cuando la dirección es de la asociación y
no de una persona— el correo.

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

### Cambiar el teléfono, la dirección, el horario o el IBAN
`assets/js/layout.js` → bloque `SITIO`. Se actualiza en las 10 páginas a la vez.

### Añadir una asociación al repertorio
`assets/js/contenido.js` → array `asociaciones`:

```js
{ sigla: 'AGB', nombre: 'Asociación Guineana de Barcelona',
  ciudad: 'Barcelona', provincia: 'Barcelona', desde: '2025',
  ambito: 'Cultura', email: '', web: '' },
```

### Publicar una noticia
`assets/js/contenido.js` → array `noticias`. Copia un bloque entero, ponlo **el primero** y
cambia fecha, categoría y textos en los dos idiomas. Aparece sola en portada (las 3 más
recientes) y en Actualidad (todas).
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

## 9. Publicar

**Netlify (lo más sencillo):** entra en [app.netlify.com/drop](https://app.netlify.com/drop),
arrastra la carpeta entera y conecta el dominio en *Domain settings*.

**Hosting clásico:** sube todo a `public_html/` por FTP. No hace falta PHP ni base de datos.

**Después:** comprueba que el HTTPS está activo y da de alta la web en
[Google Search Console](https://search.google.com/search-console) enviando
`https://www.cgees.org/sitemap.xml`.

Si el dominio final no fuera `www.cgees.org`, busca y reemplaza esa cadena en los `.html`,
en `robots.txt` y en `sitemap.xml`.

---

## 10. Datos de terceros usados en la web

**Embajada de la República de Guinea en España y Malta** (página de asuntos consulares):
Calle Luis Muriel, 4 · Madrid · +34 914 352 928 / +34 914 311 004 ·
embajada@guineamadrid.es · [es.ambaguinee.org](https://es.ambaguinee.org/) ·
L–V 9:00–16:00.

> El código postal aparece como **28002** en la web de la propia Embajada y como **28001** en
> el directorio del Ayuntamiento de Madrid. La web usa el 28002. Conviene confirmarlo con
> ellos y, de paso, avisarles de que vamos a enlazarles.

Se edita en `assets/js/layout.js` → `SITIO.embajada`.

---

## 11. Identidad visual

| Color | Código |
|---|---|
| Rojo | `#CE1126` |
| Amarillo | `#FCD116` |
| Verde | `#009E49` |
| Gris oscuro | `#1F2A37` |
| Gris claro | `#E6E6E6` |

**Tipografía:** Montserrat (400–800), desde Google Fonts. Si prefieres no depender de Google
(ver política de privacidad, punto 7), descarga la fuente a `assets/fonts/` y sustituye el
`<link>` de cada `.html` por un `@font-face` en `styles.css`.

**Logo:** el escudo lleva «CONSEIL DES GUINÉENS DE L'EXTÉRIEUR» arriba y «EN ESPAGNE» abajo,
siguiendo la lógica CGE‑ES. Los SVG son vectoriales: se amplían sin perder calidad.
`sello-institucional.svg` es el sello redondo para documentos oficiales y puede llevarse a
una imprenta para fabricar el sello físico.

---

## 12. Accesibilidad y privacidad

- Navegación completa con teclado y enlace «Saltar al contenido».
- Etiquetas ARIA en menú, acordeón, filtros y formulario.
- Respeta la preferencia del sistema de *reducir movimiento*.
- **Sin cookies de análisis, publicidad ni seguimiento**, por lo que **no hace falta banner de
  cookies**. Solo se guarda el idioma elegido en el almacenamiento local del navegador.
- La única conexión externa es Google Fonts, documentada en la política de privacidad.
