# -*- coding: utf-8 -*-
"""Propuestas de emblema circular para el CGE-ES.

Todas parten del escudo —la idea de la propuesta que trajo la Junta— y
reutilizan las piezas vectorizadas del emblema oficial: el texto del aro,
el «CGE» y el «ES». La tipografía es la del original, no una imitación con
otra fuente, y nada depende de ninguna fuente instalada.

Sin apretón de manos: lo llevan muchas asociaciones y no distingue.

    python dev/construir-emblemas.py

Escribe los SVG en dev/emblemas/. Ninguno toca assets/: el emblema de la
web sigue siendo el oficial hasta que la Junta elija.
"""
import io, math, os, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAL  = os.path.join(RAIZ, 'dev', 'emblemas')

fuente = io.open(os.path.join(RAIZ, 'assets', 'img', 'logo.svg'), encoding='utf-8').read()
P = dict(zip(['estrella1', 'estrella2', 'texto', 'cge', 'es', 'manos'],
             re.findall(r'<path\s+d="([^"]*)"\s+fill="[^"]*"\s*/>', fuente)))

ROJO, AMAR, VERDE = '#D60A07', '#FCC803', '#37960E'
NAVY, NAVY9, ORO  = '#1F2A37', '#0D1B2A', '#FCC803'

C = 256.0                      # centro del lienzo de 512
NL = chr(10)
CIERRE = NL + '</svg>' + NL
CAB = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"'
       + NL + '     role="img" aria-labelledby="t">' + NL
       + '<title id="t">%s</title>' + NL)


def bbox(d):
    n = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
    return min(n[0::2]), min(n[1::2]), max(n[0::2]), max(n[1::2])


def encajar(d, cx, cy, ancho):
    """Mueve y escala un trazo para centrarlo en (cx,cy) con ese ancho."""
    x0, y0, x1, y1 = bbox(d)
    k = ancho / (x1 - x0)
    return 'transform="translate(%.2f %.2f) scale(%.4f)"' % (
        cx - (x0 + (x1 - x0) / 2) * k, cy - (y0 + (y1 - y0) / 2) * k, k)


def desde_centro(k):
    """Escala un trazo respecto al centro del emblema, sin moverlo."""
    return 'transform="translate(%.2f %.2f) scale(%.4f)"' % (C * (1 - k), C * (1 - k), k)


def estrella(cx, cy, r, color):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.42
        pts.append('%.2f %.2f' % (cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return '<polygon points="%s" fill="%s"/>' % (' '.join(pts), color)


def arcos_tricolor(r_ext, r_int, giro=-90):
    """Borde exterior partido en tres tramos con los colores de la bandera.

       Va con tres trazos de arco gruesos y no con sectores recortados:
       así el grosor es exacto y no hacen falta máscaras."""
    # Orden al revés a propósito. Dibujando en el sentido de las agujas
    # desde arriba, poner rojo-amarillo-verde deja el rojo a la derecha y
    # el verde a la izquierda, al contrario que en la bandera. Con
    # verde-amarillo-rojo el rojo cae en el lado izquierdo y el verde en
    # el derecho, que es como se lee la bandera.
    rm, gr, c = (r_ext + r_int) / 2, r_ext - r_int, []
    for k, col in enumerate([VERDE, AMAR, ROJO]):
        a0 = math.radians(giro + k * 120)
        a1 = math.radians(giro + (k + 1) * 120 + 0.6)   # un pelo de solape
        x0, y0 = C + rm * math.cos(a0), C + rm * math.sin(a0)
        x1, y1 = C + rm * math.cos(a1), C + rm * math.sin(a1)
        c.append('<path d="M%.2f %.2f A%.1f %.1f 0 0 1 %.2f %.2f" fill="none" stroke="%s" '
                 'stroke-width="%.1f"/>' % (x0, y0, rm, rm, x1, y1, col, gr))
    return ''.join(c)


# ══════════════════════════════════════════════════════════════════════
#  El escudo. Es el mismo dibujo en todas; lo que cambia de una propuesta
#  a otra es el aro exterior y si el campo de dentro va relleno o blanco.
# ══════════════════════════════════════════════════════════════════════
ESCUDO = 'M256 120 L370 159 L370 299 Q370 370 256 416 Q142 370 142 299 L142 159 Z'


def escudo(ide, escala=1.0, acronimo=True, contorno=None):
    g = ['<g transform="translate(%.2f %.2f) scale(%.4f) translate(%.2f %.2f)">'
         % (C, C, escala, -C, -C),
         '<clipPath id="%s"><path d="%s"/></clipPath>' % (ide, ESCUDO),
         '<g clip-path="url(#%s)">'
         '<rect x="142" y="112" width="76" height="312" fill="%s"/>'
         '<rect x="218" y="112" width="76" height="312" fill="%s"/>'
         '<rect x="294" y="112" width="76" height="312" fill="%s"/>'
         '</g>' % (ide, ROJO, AMAR, VERDE),
         '<path d="%s" fill="none" stroke="%s" stroke-width="8"/>' % (ESCUDO, contorno or NAVY)]
    if acronimo:
        g += ['<rect x="142" y="243" width="228" height="68" fill="%s"/>' % NAVY9,
              '<path %s d="%s" fill="#fff"/>' % (encajar(P['cge'], 218, 277, 92), P['cge']),
              '<rect x="272" y="272" width="15" height="7" fill="#fff"/>',
              '<path %s d="%s" fill="#fff"/>' % (encajar(P['es'], 322, 277, 54), P['es'])]
    g.append('</g>')
    return ''.join(g)


def emblema(rim=False, campo=None, aro_color=None, pequeno=False, negativo=False, ide='x'):
    """rim    → borde exterior con los tres colores de la bandera
       campo  → color de relleno del interior (None = blanco)
       aro    → color de la banda que lleva el nombre"""
    aro_color = aro_color or NAVY
    fondo = '#fff' if negativo else aro_color
    tinta = aro_color if negativo else '#fff'

    # El borde tricolor tiene que ser GRUESO para que sirva de algo: con
    # 14 unidades de 512 no llegaba a un píxel a 44 px, que es donde se
    # quería el color. Con 26 se ve a 44 y se adivina a 22.
    #
    # Eso obliga a recolocar el texto del aro, porque el original llega
    # hasta r249,3 de 250 y no deja sitio para nada por fuera. Escalado al
    # 86 % desde el centro pasa a ocupar r167-214, y la banda se baja a
    # r154-224 para que quede centrado en ella.
    r_rim = 224.0
    k      = 0.86 if rim else 1.0
    r_aro  = r_rim if rim else 250.0
    r_int  = (154.0 if rim else 188.4) if not pequeno else (190.0 if rim else 205.0)

    # En formato pequeño no hay texto que respetar, así que el escudo
    # crece. Pero la banda oscura no se quita del todo: sin ella el escudo
    # llegaba al borde y a 44 px el conjunto era un borrón tricolor, sin
    # la silueta que lo hace reconocible. Un anillo de unas 35 unidades
    # basta para separar el escudo del aro de color.

    c = ['<circle cx="256" cy="256" r="250" fill="%s"/>' % fondo]
    if rim:
        c.append(arcos_tricolor(250.0, r_rim))
        c.append('<circle cx="256" cy="256" r="%.1f" fill="%s"/>' % (r_rim, fondo))
    c.append('<circle cx="256" cy="256" r="%.1f" fill="%s"/>' % (r_int, campo or '#fff'))

    if not pequeno:
        c.append('<path %s d="%s" fill="%s"/>' % (desde_centro(k), P['texto'], tinta))
        rr = (r_aro + r_int) / 2
        a = math.radians(40.9)                  # el ángulo de las dos del original
        for signo in (1, -1):
            c.append(estrella(C + signo * rr * math.cos(a), C + rr * math.sin(a), 15, ORO))

    # El escudo llega a r160 desde el centro (la punta de abajo), así que
    # se escala para que quepa en su campo con un poco de aire.
    # Sobre campo relleno el contorno navy del escudo se confunde con el
    # fondo y la silueta se pierde: queda un bloque de color sin forma.
    # En dorado se ve, y además es el contorno que llevaba la propuesta
    # que trajo la Junta.
    c.append(escudo(ide, escala=(r_int - 10) / 160.0, acronimo=not pequeno,
                    contorno=ORO if campo else None))
    return ''.join(c)


JUEGO = [
    # El aro exterior con los tres colores, que es lo que se pidió:
    # «un poco más colorido y relleno».
    ('e1-aro-tricolor', dict(rim=True)),
    # Lo mismo, con el interior relleno en navy: el escudo destaca más y
    # el emblema queda macizo en vez de hueco.
    ('e2-aro-tricolor-relleno', dict(rim=True, campo=NAVY)),
    # Solo el campo relleno, sin borde tricolor, para ver cuánto aporta
    # cada cosa por separado.
    ('e3-campo-relleno', dict(campo=NAVY)),
    # Con el aro del rojo oficial en vez de navy. Sin borde tricolor: el
    # verde del borde pegado al rojo del aro se ensuciaba.
    ('e4-aro-rojo', dict(campo=NAVY, aro_color=ROJO)),
]

TITULO = 'Conseil des Guinéens de l’Étranger — Espagne'
FORMATOS = [('', dict()),
            ('-pequeno', dict(pequeno=True)),              # cabecera y favicon
            ('-negativo', dict(negativo=True)),            # sobre fondo oscuro
            ('-pequeno-negativo', dict(pequeno=True, negativo=True))]

for nombre, base in JUEGO:
    for suf, kw in FORMATOS:
        ide = re.sub(r'[^a-z0-9]', '', nombre) + suf.replace('-', '')
        svg = CAB % TITULO + emblema(ide=ide, **dict(base, **kw)) + CIERRE
        io.open(os.path.join(SAL, nombre + suf + '.svg'), 'w',
                encoding='utf-8', newline='').write(svg)
        print('  %-40s %5.1f KB' % (nombre + suf + '.svg', len(svg) / 1024))
