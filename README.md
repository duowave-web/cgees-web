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
python dev/servidor.py
```

Abre `http://localhost:5173`. Para pararlo, `Ctrl + C`.

Es `python -m http.server` con una diferencia que ahorra disgustos: manda
`Cache-Control: no-store`, así que el navegador no se queda con la copia vieja de `main.js` o de
`styles.css`. Sin eso uno cambia algo, recarga, no ve el cambio y se pasa media hora buscando un
error que no existe.

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

### La Fiesta de la Independencia

La edición en curso va **en la portada**, en el bloque de la Fiesta, no en Actualidad:
mientras no se haya celebrado es una convocatoria, no una noticia. Ahí están la fecha, el
lugar, el cartel con el QR del formulario y un botón a Contacto.

Cuando el acto pase, se monta como evento con fotos en Actualidad, igual que los demás.

> El cartel se sirve a 1800 px y con calidad 90, más alta que el resto de imágenes:
> **dentro va un QR** y la compresión agresiva lo deja sin escanear.

### Fichas ocultas

`oculto: true` deja una ficha fuera de la web sin borrarla, para lo que todavía no tiene
material. Ahora lo llevan «Referéndum de la nueva Constitución» y «El CGE-ES queda inscrito en
el Registro Nacional de Asociaciones». Quita el campo y vuelven a salir.

### 13. Los eventos

Los diez eventos están en Actualidad y cada uno tiene su página (`evento.html?id=...`) con el
texto, un carrusel de fotos y los documentos del evento, que se abren en el mismo visor que los
de origen.

En la tarjeta de Actualidad, cuando el evento tiene **portada** la etiqueta y el titular van
*sobre* la foto, con un degradado oscuro por encima: una foto de un acto no tiene un sitio
previsible donde el texto contraste, así que se oscurece de abajo arriba. Sin portada se queda
la banda con el emblema.

Tres eventos **no tienen portada** y es a propósito: el de París porque su única foto mide
452 px y de portada saldría borrosa; el de Conakry porque sus fotos están marcadas `REVISAR`
en el archivo y no se han publicado; y el del embajador Framoï Mara porque no hay fotos.

**Ni las fotos originales ni los PDF se publican.** Se sirven versiones de web: portada de
1200×675, carrusel con el lado mayor a 1500 px y los documentos como imágenes por página.

**Para añadir un evento:**

1. Añádelo a la lista `EVENTOS` de `dev/generar-eventos.py` con su carpeta y sus documentos.
2. Ejecuta `python dev/generar-eventos.py`.
3. Copia la entrada al array `noticias` de `assets/js/contenido.js` con `tipo: 'evento'`, y sus
   documentos al array `documentos`.

Campos propios de un evento: `portada`, `fotos` (array de rutas), `documentos` (array de `id`
del array `documentos`), y `video` con `videoPoster` si hay vídeo.

El vídeo va con `preload="none"`: no se descargan sus megas hasta que alguien le da al play, y
hasta entonces solo se carga el fotograma de cartel, que pesa 28 KB. El de París se recomprimió
de 15,8 a 4,9 MB sin tocar la resolución, porque venía de WhatsApp a un bitrate muy por encima
de lo que 640×352 necesita.

**El visor de documentos tiene barra de opciones**: ampliar y reducir (del 50 % al 300 %),
ajustar al ancho, página completa y dos columnas. Con el visor abierto, `+` y `−` hacen zoom y
`0` lo devuelve al 100 %. El zoom cambia el **ancho** de la hoja, no la escala con
`transform`, porque con `scale()` la hoja se sale del contenedor y el scroll no la alcanza.

### Las cabeceras con imagen

Cinco páginas llevan foto de fondo en la cabecera: El Consejo, Entidades, Asuntos consulares,
Contacto y Actualidad. Están en `assets/img/cabeceras/` y se ponen con la clase
`hero-pagina--foto` más un `background-image` en línea.

Las imágenes tienen **el motivo a la derecha y se oscurecen hacia la izquierda**, que es donde
va el texto. Aun así el CSS pone encima un velo propio: sin él, sobre una zona clara el blanco
se pierde. Si cambias una imagen, respeta ese encuadre o el titular deja de leerse.

Las seis páginas principales llevan imagen. **Servicios y Asuntos consulares comparten la
foto del escritorio** con recortes distintos: solo había cinco imágenes para seis páginas. Si
aparece una más, se sustituye la de Servicios.

Las páginas legales (aviso legal y privacidad) se quedan con el fondo navy, a propósito.

### La foto de grupo de Origen y mandato

En «El Consejo» → Origen y mandato hay una foto a lo ancho
(`assets/img/consejo/grupo-origen.webp`). Se puede ampliar en el mismo visor de los documentos:
el `<button data-ampliar-imagen>` que la envuelve existe solo para eso, y el CSS le quita todo
lo que lo haría parecer un botón.

**El original es cuadrado (2000 × 2000) y está recortado a mano**, del 20,5 % al 88,5 % de la
altura, para dejarlo en 1600 × 1088. Ese recorte no es arbitrario: quita los fluorescentes del
techo y la mesa del primer plano, y **deja entero el retrato del presidente de la República que
está en la pared del fondo**, arriba a la derecha. Si se vuelve a recortar, hay que respetarlo.

Es del día de la constitución del Consejo, el 8 de octubre de 2022, y así lo dice el pie.

**Se ve a 620 px, no a todo el ancho**, pero el archivo es de 1600 px a propósito: es el que se
abre en el visor, y ahí se quiere ver de cerca. No lo recomprimas al tamaño en que se muestra.

### El vídeo de fondo del hero

La portada lleva un vídeo de fondo en `assets/video/hero-fondo.mp4`. Tres cosas que conviene
no romper si se cambia:

- **Sin pista de audio.** No es solo por educación: un vídeo con audio no arranca solo en
  ningún navegador. Se quita al convertir (`-an`).
- **El velo de `.hero::before`** es lo que mantiene legible el texto blanco. Va por delante del
  vídeo, más denso a la izquierda, donde está el texto, y se aclara a la derecha para que se vea
  la imagen. Si se quita, sobre un fotograma claro el titular desaparece.
- Con `prefers-reduced-motion` el vídeo se esconde y queda el poster: un bucle detrás del
  titular es justo lo que molesta a quien activa ese ajuste.
- **El encuadre está ajustado a mano** (`object-position`), y es lo más delicado del bloque.
  La bandera ondea en la franja `x 968-1187` del fotograma de 1280 —medida fotograma a
  fotograma, porque la cámara se desplaza unos 40 px a lo largo del bucle— y el hueco del hero
  casi nunca es 16:9, así que `cover` recorta y con el encuadre centrado la bandera se salía.

  Echando la cuenta, centrada solo cabe entera si el hueco es **más ancho que 1,52 veces su
  altura**. Por eso el corte va **por proporción y no por ancho**:

  - hueco ancho (proporción de pantalla > 3/2) → `50% 22%`
  - el resto (`@media (max-aspect-ratio: 3/2)`) → `97% 50%`, pegado a la derecha

  Un móvil de pie (0,46), una tableta de pie (0,85) y un iPad tumbado (1,33) tienen el mismo
  problema aunque midan cosas muy distintas: con un corte por píxeles la tableta se quedaba con
  la bandera cortada. El `22 %` de la primera regla es el que aguanta además las ventanas
  anchas y bajas (1400x500, 2000x560), donde el recorte vertical se come media altura del
  fotograma. Comprobado en veintiocho tamaños, de un iPhone SE a un 3440x1440.

  **Si se cambia el vídeo hay que volver a medir la bandera y revisar los dos valores.**

**El hero ocupa la pantalla entera** menos la cabecera
(`min-height: calc(100svh - var(--alto-header))`), para que el vídeo no quede cortado con la
siguiente sección asomando. Va con `min-height` y no `height`: si el contenido crece —un
titular más largo, una pantalla muy baja— el hero se estira en lugar de recortarlo. Y con
`100svh`, no `100vh`, porque en móvil `vh` no descuenta la barra del navegador y da un salto
al hacer scroll; la línea con `vh` que va justo antes es el respaldo para navegadores viejos.

**El bucle es de ida y vuelta**: el vídeo va seguido de sí mismo al revés, así que el último
fotograma es igual al primero y el salto del loop no se ve. Medido: los dos fotogramas se
diferencian en 2,8 sobre 255. Si se cambia el vídeo hay que volver a generarlo así; el comando
está en el historial de commits.

Pesa 1 MB: 20 segundos, sin audio y recomprimido desde los 3,4 MB del original.

### El móvil

La web se revisó entera a 375 px (y a 330, que es lo más estrecho que se puede probar aquí) con
dos criterios, y las reglas están todas juntas al final de `styles.css`, en el apartado
«23. Repaso del móvil»:

- **En el móvil se toca con el dedo.** Todo lo que se pueda pulsar llega a 40 px de alto, o a
  24 como mínimo absoluto, que es lo que pide la norma (WCAG 2.5.8). Se estira el área de toque
  con relleno, **no la letra**: el aspecto no cambia. Afectó a los botones de idioma (eran
  36x25), las migas de pan (15 px de alto), los enlaces «Leer más», los correos del repertorio,
  los enlaces del pie (18 px), la casilla del consentimiento (19 px) y los puntos del carrusel,
  que eran dianas de 8 px y ahora son un área de 22 con el punto dibujado dentro.
- **Nada de letra por debajo de 12 px.** Lo que en el escritorio pasa por etiqueta pequeña, en
  un teléfono no se lee.

Aparte de eso, en el móvil:

- **El hero baja el texto al pie** (`align-items: flex-end`) y el velo pasa a ir de arriba
  abajo, claro donde está la bandera y denso donde está el texto. La bandera cae en el tercio
  superior del fotograma: con el contenido centrado, el titular se le ponía justo encima y daba
  igual que entrara entera, porque no se veía. En tableta no hace falta, porque allí la bandera
  queda en la mitad derecha y el texto no pasa de 60 caracteres por línea.
- **El visor de documentos se queda solo con el zoom.** Los tres botones de vista no servían de
  nada en un teléfono: «dos columnas» ya se colapsa a una sola, y a lo ancho de una pantalla
  estrecha la hoja entera cabe de todos modos, así que «página completa» y «ajustar al ancho»
  hacían lo mismo. La barra pasó de 171 px a 136.
- **El correo del Consejo parte por donde haga falta** (`overflow-wrap: anywhere` en
  `.ficha dd`). Es una sola palabra de 33 caracteres: en una pantalla estrecha se salía de la
  ficha y la ficha lo recortaba, justo donde se va a buscar la dirección.

### 14. Los documentos de origen

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

Cada hoja **reserva el hueco de un A4 antes de cargar** (`aspect-ratio` en el CSS, que main.js
sustituye por la proporción real en cuanto la imagen está). Sin eso las hojas medían cero hasta
tener su imagen, y pasaban dos cosas: los rótulos de «3 / 15» se apilaban unos encima de otros,
y el navegador se creía que las quince páginas estaban a la vista y se las descargaba todas de
golpe, que en un móvil son megas para nada. La proporción real hace falta porque hay documentos
apaisados y alguno con una página cruzada.

**Para añadir un documento nuevo:**

1. Añádelo a la lista `DOCS` de `dev/generar-documentos.py`, con su `id`, su ruta, su fecha,
   la fuente y el título en los dos idiomas.
2. Ejecuta `python dev/generar-documentos.py`. Necesita PyMuPDF y Pillow
   (`pip install pymupdf pillow`).
3. Copia la entrada al array `documentos` de `assets/js/contenido.js`.

**No cambies el `id` de un documento ya publicado**: es el nombre de sus archivos de imagen.

Los diez documentos de origen llevan **`origen: true`** y son los únicos que salen en «El
Consejo». Los documentos de los eventos están en el mismo array pero sin ese campo: se ven en
la página de su evento y nada más.

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
├── evento.html               Plantilla de la página de un evento (?id=...)
├── privacidad.html           Privacidad y cookies (RGPD)
├── 404.html                  Página de error
├── robots.txt / sitemap.xml
│
└── assets/
    ├── css/styles.css        TODO el diseño
    ├── img/
    │   ├── logo-192.png            Emblema redondo (cabecera, pie, tarjetas)
    │   ├── logo.png                 Emblema redondo a 512 (404 y vista previa)
    │   ├── favicon.png              Icono de la pestaña (el escudo)
    │   ├── apple-touch-icon.png     Icono de iOS (el escudo, fondo blanco obligado)
    │   └── png/                     El emblema para documentos (ver punto 12)
    └── js/
        ├── layout.js       Datos de la entidad + menú + cabecera + pie  ← EDITAR AQUÍ
        ├── contenido.js    Noticias y repertorio de asociaciones        ← EDITAR AQUÍ
        ├── i18n.js         Traducción al francés (437 claves)
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

Las **54 entidades** publicadas salen del registro consolidado de la Junta
(`2026-10-01_CGE-ES_Registro-Entidades-Guineanas-Espana-Consolidado_INT.xlsx`), **hoja «Con NIF»**.
La hoja «Sin NIF» no se publica.

Se cargan con:

```bash
python dev/importar-entidades.py ruta/al/registro.xlsx
```

El script reescribe el array `asociaciones` de `contenido.js`. Si se vuelve a recibir el Excel
actualizado, se ejecuta otra vez y ya está: **no edites las entidades a mano**, se perderían al
siguiente volcado. Lo único que el script conserva de lo anterior es el **ámbito de actuación**
(Cultura, Solidaridad…), porque no viene en la hoja y estaba puesto a mano en cinco.

### Qué se publica

La hoja lo dice ella misma: la fila 2 separa **«INFORMACIÓN PUBLICABLE · ficha web»**
(columnas A-M) de **«INFORMACIÓN NO PUBLICABLE · uso interno»** (columnas O-Y). El importador
solo lee las primeras, y aun así **deja fuera una**:

> **El nombre de la presidencia no se publica**, aunque la hoja lo marque como publicable. Es el
> nombre de una persona, y publicarlo requiere su consentimiento: son 34 personas. Si la Junta
> reúne esos consentimientos, se añade quitando una línea del importador.
>
> Ojo con esto: **`contenido.js` se sirve entero al navegador**. Lo que se guarda ahí queda
> publicado aunque no se pinte en pantalla, así que no vale con «cargarlo y no mostrarlo».

Lo que sí entra: nombre, sigla, tipo, NIF, año de constitución, número y organismo de registro,
municipio, provincia, comunidad autónoma y el correo cuando es de la entidad. De los 14 correos
de la hoja, ninguno es personal: todos llevan el nombre de la asociación.

### Las tres sin NIF

`Luz de Koumba`, `Femmes Battantes de Barcelone` y `AMUCAR` están en la hoja «Con NIF» pero sin
NIF. Por decisión de la Junta se publican igual, **solo con nombre y provincia**: sin NIF no hay
nada que se pueda dar por comprobado, así que no se les monta ficha. En el código es
`ficha: false`.

### El mapa de España

Debajo del listado hay dos mapas de comunidades autónomas: **cuántas entidades** hay en cada una
—pulsando una comunidad se filtra el listado— y **cuánta población guineana** según el INE. Los
dos usan el mismo dibujo.

**Las fronteras están en `assets/js/mapa-ccaa.js`, que es un archivo generado: no lo edites a
mano.** Se rehace con:

```bash
python dev/generar-mapa-ccaa.py
```

El script baja un GeoJSON público de las comunidades (proyecto Click That Hood, licencia MIT),
lo proyecta a coordenadas de pantalla, lo simplifica y escribe un trazo por comunidad. El
original pesa 1,3 MB y se lee en memoria —no se guarda en el repositorio—; lo que queda son
47 KB, que es lo que descarga quien visita la página.

Tres cosas que conviene saber antes de tocarlo:

- **Canarias va en un recuadro aparte**, abajo a la derecha. Con su posición real el mapa sería
  tres cuartas partes de océano. El recuadro va a la derecha y no a la izquierda, que es lo
  habitual en prensa, porque a la izquierda el hueco es de Portugal y Andalucía llega hasta el
  borde. Si se cambia de sitio, el propio script avisa si el recuadro pisa tierra.
- **La cifra va dentro de la comunidad cuando cabe, y cuando no, sale fuera** con una línea que
  la une a su sitio. Si cabe o no se calcula de verdad: el script mide, para cada comunidad, el
  punto de dentro más alejado del borde y cuánto hueco hay a su alrededor. Por eso en Ceuta,
  Melilla, Canarias y La Rioja la cifra sale fuera y en Cantabria no.
- **En el móvil las cifras del dibujo se ocultan** y el dato lo lleva la lista de debajo. A 330
  píxeles de ancho una cifra escrita sobre el mapa se queda en diez píxeles de alto: no hay
  manera de leerla. La lista además se pulsa con el dedo sin tener que acertar en La Rioja, y es
  la forma en que un lector de pantalla recorre el mapa.

Los nombres de las comunidades del mapa tienen que coincidir con los de la columna «comunidad
autónoma» del Excel. Si el INE o el registro cambiaran de forma de nombrarlas, se ajusta la
tabla `NOMBRES` del script, no el archivo generado.

### La población del INE

La cifra de población guineana sale de la **tabla 02005 del INE**, nacionalidad «Guinea» —que es
Guinea Conakry, distinta de «Guinea Ecuatorial» y de «Guinea-Bissau»—. Se actualiza con:

```bash
python dev/importar-ine.py
```

Coge siempre el año más reciente de la tabla y lo deja anotado junto al dato, porque **una cifra
de población sin año no dice nada**. Ahora mismo son datos de 2022.

### Lo que hay que arreglar en la hoja

- **El NIF `G72397672` está repetido** en la nº 35 (Associació Alfabet N.Ko, Mataró) y la nº 40
  (Asociación de Nacionales Guineanos/as y Simpatizantes, Torre Pacheco). Un NIF no puede ser de
  dos entidades: el importador **no lo publica en ninguna de las dos** hasta que se aclare. Las
  dos conservan su ficha con el resto de datos.
- **La nº 52 (Femmes Battantes de Barcelone) tiene «Activo» en la casilla del NIF**, que es un
  valor de otra columna.
- Faltan **40 correos de contacto** de 54. Quien quiera escribir a una entidad sin correo
  publicado puede hacerlo al Consejo.

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
`assets/css/styles.css`, sección 1. Son los seis de la carta gráfica del logo: `--navy #003566`
(el azul institucional, el que manda), `--oro #C9A13B`, `--rojo #CE1126`, `--amarillo #FCD116`,
`--verde #009460` y `--gris-mapa #9EA3A8`. **No inventes tonos nuevos**; y antes de mover
cualquiera, lee el punto 12: hay tres decisiones que vienen de medir el contraste, no del gusto.

---

## 8. Hacer que el formulario envíe correos de verdad

**Ahora mismo el formulario NO envía nada.** Abre el programa de correo del visitante con el
mensaje ya redactado, y es él quien tiene que pulsar Enviar. Con la web ya publicada, esto es lo
más urgente que queda por arreglar.

Son cinco minutos y **no hay que tocar código**:

1. Entra en <https://formspree.io> y crea una cuenta gratuita con
   `conseil.guineen.espagne@gmail.com`.
2. Crea un formulario nuevo. Te dará una dirección del estilo
   `https://formspree.io/f/xxxxxxxx`.
3. Abre `contacto.html`, busca `data-endpoint=""` y pega ahí esa dirección:
   `data-endpoint="https://formspree.io/f/xxxxxxxx"`.
4. Sube el cambio. A partir de ese momento los mensajes llegan al correo del Consejo y el
   visitante ve «Hemos recibido tu consulta» sin salir de la web.

El plan gratuito da 50 mensajes al mes, que para empezar sobra.

### Mientras tanto

El método actual tiene un fallo que no se ve: **`mailto:` no avisa de si ha funcionado**. En un
móvil sin aplicación de correo configurada —que es medio público— al pulsar «Enviar mensaje» no
pasa absolutamente nada, y la persona se queda creyendo que ha escrito.

Por eso el aviso no da por hecho que se haya abierto nada: dice que *si no se ha abierto*, copie
el mensaje, y ofrece un botón para copiarlo. Y si el navegador bloquea el portapapeles, el botón
se convierte en un cuadro con el mensaje entero ya seleccionado, para copiarlo a mano. **Lo que
no puede pasar es que el visitante pulse algo y no ocurra nada.**

Eso es un parche, no la solución. La solución es el endpoint de arriba.

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

**La web está publicada en <https://www.cge-es.org>** desde el 10 de octubre de 2026. Se sirve
desde GitHub Pages, con el dominio de Hostinger apuntando allí. No hay FTP, ni panel, ni nada que
subir a mano: **se publica haciendo `git push`**, y en un par de minutos está en el dominio.

### Cómo está montado

| Pieza | Dónde | Valor |
|---|---|---|
| Dominio | Hostinger (`hpanel.hostinger.com`) | `cge-es.org` |
| Nameservers | Hostinger | `apollo.dns-parking.com`, `athena.dns-parking.com` |
| `A` `@` | Zona DNS | `185.199.108.153` · `.109.153` · `.110.153` · `.111.153` |
| `CNAME` `www` | Zona DNS | `duowave-web.github.io` |
| Dominio del sitio | Archivo `CNAME` del repositorio | `www.cge-es.org` |
| Certificado | GitHub, automático | Let's Encrypt, se renueva solo |

Las cuatro IP son las de GitHub Pages. **El dominio bueno es `www.cge-es.org`**: `cge-es.org` a
secas redirige al www, y eso lo hace GitHub solo por tener las cuatro A apuntando a su red.

**Antes de esto el dominio estaba aparcado** con un `A @ 2.57.91.91` y un `CNAME www` que
apuntaba al propio dominio. Si alguna vez hay que deshacer el cambio, esos son los dos valores a
restaurar. No había registros MX ni TXT, así que el correo —que es Gmail y no va por el
dominio— nunca estuvo en juego.

### El interruptor de verdad: el `noindex`

Hasta la publicación, todas las páginas llevaban `<meta name="robots" content="noindex">`. Eso
**le pide a Google que no indexe la web**, así que podía estar perfectamente colgada del dominio
y seguir sin existir para nadie que la buscara. Al publicar se quitó de las nueve páginas de
contenido.

Siguen con `noindex` a propósito **`evento.html` y `noticia.html`** —son plantillas que se
rellenan con `?id=`, y sin ese parámetro no son más que un armazón vacío— y la **`404.html`**.

### Si el despliegue no llega al dominio

Pasó dos veces: se hace `push`, el commit está en GitHub y el sitio sigue con lo anterior. **Lo
primero a mirar no es el código, es el despliegue:**

```bash
gh run list --limit 3 --repo duowave-web/cgees-web
```

Si el último sale `cancelled` o se queda encolado sin runner, el atajo que funciona es pedirle a
Pages un build directamente, que no pasa por Actions:

```bash
gh api -X POST repos/duowave-web/cgees-web/pages/builds
```

Y ten en cuenta que GitHub Pages manda `Cache-Control: max-age=600`: aunque el sitio ya esté
actualizado, tu navegador puede seguir diez minutos con la versión vieja. **Ctrl+F5.**

### Lo que queda por hacer

- **Darla de alta en [Google Search Console](https://search.google.com/search-console)** y enviar
  `https://www.cge-es.org/sitemap.xml`. Hasta que no se haga, Google tardará mucho más en
  encontrarla.
- **El formulario de contacto sigue siendo `mailto:`** (ver punto 8): abre el programa de correo
  del visitante en vez de enviar nada. Ahora que la web es pública, esto se nota más.
- **Los textos legales** (aviso legal y privacidad) están redactados pero **no los ha revisado un
  abogado**.

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

### El logo

El emblema oficial es el aprobado por la Junta en **octubre de 2026** y viene definido por la
**carta gráfica** (`Charte_logo_CGE-ES.pdf`, documento interno). Los archivos:

| Archivo | Qué es | Dónde se usa |
|---|---|---|
| `assets/img/logo-192.png` | Emblema completo, 192 px | Cabecera (52 px), pie (62) y tarjetas de actualidad sin foto (50) |
| `assets/img/logo.png` | Emblema completo, 512 px | Página 404 y vista previa al compartir |
| `assets/img/favicon.png` | **Escudo**, 64 px | Pestaña del navegador |
| `assets/img/apple-touch-icon.png` | **Escudo**, 180 px, fondo blanco | Icono al guardar en la pantalla de inicio |

**En la web va el emblema redondo, por decisión de la Junta.** La carta gráfica reserva el escudo
solo para todo lo que baje de 3 cm o 150 px —ahí caerían la cabecera y el pie—, pero se prefirió
el circular, que es el que identifica a la entidad. El escudo se queda en los dos iconos, donde
el redondo no se distinguiría: a 16 px, el aro con el nombre es una mancha.

El emblema es cuadrado, así que las medidas del CSS son cuadradas. **El escudo no lo es**
(336 × 512): si alguna vez se vuelve a usar en la web, hay que mandarlo por la altura con el
ancho en `auto`, o sale aplastado.

**Dos tamaños del mismo emblema, a propósito.** En la cabecera se ve a 52 px: servir ahí el de
512 era descargar 164 KB para usar una décima parte. El de 192 pesa 42 KB, cubre hasta pantallas
de densidad 3 (62 × 3 = 186) y lleva un poco de máscara de enfoque, porque al bajar de 2000 a
192 el texto del aro se empasta.

El icono de iOS lleva fondo blanco a propósito: Apple no admite transparencia y la rellena de
negro.

**Los archivos salen del PDF de la carta** con `python dev/extraer-logo.py`. El PDF guarda cada
imagen en dos piezas —los colores por un lado, con NEGRO donde debería no haber nada, y la
transparencia aparte, en una máscara `SMask`—, así que extrayendo solo la primera el campo blanco
del escudo sale negro. El script las junta.

> **Pendiente:** la carta dice que el logo debería existir también en SVG, y para la web sería lo
> suyo. No lo tenemos: en el PDF solo hay PNG. Cuando aparezca el SVG, sustituye los dos archivos
> y listo, no hay que tocar nada más. Mientras tanto el PNG de 2000 px da de sobra: en la web no
> se usa por encima de 150.

**Nunca deformar, recolorear, recortar ni añadirle elementos**, dice la carta. Y el logo existe
**solo en francés**, también en la versión española de la web.

### Los colores

Los seis de la carta, tal cual. **No inventar tonos nuevos**: si hace falta un intermedio, se saca
de estos.

| Color | Código | Papel en la web |
|---|---|---|
| Azul CGE-ES | `#003566` | El institucional y el que manda: enlaces, botones, cabeceras, pie |
| Dorado | `#C9A13B` | Filetes y detalles. **Solo sobre fondo oscuro** |
| Rojo | `#CE1126` | Bandera e idioma activo |
| Amarillo | `#FCD116` | Bandera y foco sobre fondo oscuro |
| Verde | `#009460` | Bandera y lo que significa «conseguido» |
| Gris | `#9EA3A8` | Neutro ligado al mapa del emblema |

Están en `styles.css` como `--navy` (el azul), `--oro`, `--rojo`, `--amarillo`, `--verde` y
`--gris-mapa`. **El azul sigue llamándose `--navy`** porque es lo que es, un azul marino, y así no
hubo que tocar las 74 reglas que ya lo usaban.

Tres cosas que se midieron y condicionan dónde va cada color:

- **El dorado sobre blanco da 2,6:1 y no se puede leer.** Sobre el azul oscuro del pie da 5,5:1,
  así que ahí sí: los títulos de columna del pie van en dorado, que es además como lo usa el
  emblema, de filete sobre el azul. En texto sobre blanco, nunca.
- **El botón dorado se ACLARA al pasar el ratón, no se oscurece.** Con el dorado oscuro el texto
  azul se queda en 3,4:1; aclarando sube a 6,3:1.
- **El anillo de foco pasó de amarillo a azul.** En amarillo sobre blanco daba 1,47:1: estaba
  ahí, pero no se veía, que para un indicador de foco es igual que no estar. En azul da 12:1, y
  sobre los fondos oscuros —hero, pie, visor— se vuelve amarillo, que ahí da 8,4:1.

**El verde ya no es el color de interacción.** Lo era en la versión anterior (botones, enlaces,
pestaña activa, foco); ahora lo es el azul, porque es el del emblema. El verde se quedó en la
bandera y en lo semántico: entidades cotejadas, logros, aviso de formulario enviado.

El **idioma activo** del selector va con los colores de su bandera (España y Francia), no con los
de la web.

**Tipografía:** Montserrat (400–800), desde Google Fonts. Si prefieres no depender de Google
(ver política de privacidad, punto 7), descarga la fuente a `assets/fonts/` y sustituye el
`<link>` de cada `.html` por un `@font-face` en `styles.css`.

> La carta pide **Oswald** para el nombre y el sigla, pero eso es la tipografía *del logo*, que ya
> va dibujada dentro de la imagen. La web usa Montserrat para su propio texto. Si algún día se
> quiere Oswald también en los titulares de la web, se cambia en un sitio.

### Volver al diseño anterior

La versión con el emblema del apretón de manos y la gama verde está guardada en la etiqueta
**`v1-emblema-antiguo`** y en la rama **`emblema-antiguo`**, las dos en GitHub:

```bash
git checkout v1-emblema-antiguo            # mirarla
git checkout -b vuelta-atras v1-emblema-antiguo   # retomarla como rama
```

### Versiones en PNG para documentos

En `assets/img/png/`, con **fondo transparente**:

| Archivo | Tamaño | Para qué |
|---|---|---|
| `cge-es-logo-512.png` | 512 px | Firmas de correo, redes sociales |
| `cge-es-logo-1024.png` | 1024 px | Documentos, presentaciones |
| `cge-es-logo-2000.png` | 2000 px | Imprenta, carteles, camisetas |
| `cge-es-escudo-512.png` | 512 px de alto | Foto de perfil, sellos pequeños |
| `cge-es-escudo-1024.png` | 1024 px de alto | Bordados, placas |

**No hay versión de 2048**: el original mide 2000 px y por encima de eso solo se estaría
inventando detalle. Los regenera `python dev/extraer-logo.py` junto con los de la web.


## 13. Accesibilidad y privacidad

- Navegación completa con teclado y enlace «Saltar al contenido».
- Etiquetas ARIA en menú, acordeón, filtros y formulario.
- Respeta la preferencia del sistema de *reducir movimiento*.
- **Sin cookies de análisis, publicidad ni seguimiento**, por lo que **no hace falta banner de
  cookies**. Solo se guarda el idioma elegido en el almacenamiento local del navegador.
- La única conexión externa es Google Fonts, documentada en la política de privacidad.
