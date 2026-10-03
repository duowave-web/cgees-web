# -*- coding: utf-8 -*-
"""Emblema circular del CGE-ES, siguiendo la composición de la propuesta
que trajo la Junta.

Esa propuesta es clara y ligera, y eso viene de cuatro cosas concretas que
conviene no perder al tocarla:

  · el campo va BLANCO y la letra del aro en navy sobre blanco, no al
    revés. Es lo que más cambia el carácter del emblema;
  · el borde son dos aros finos, no una banda gruesa;
  · ramas de olivo flanqueando el escudo y una estrella dorada abajo,
    dentro del círculo;
  · el escudo lleva un filete dorado por dentro del contorno navy, y una
    cinta cruzada con el acrónimo.

Sin apretón de manos: lo llevan muchas asociaciones y no distingue.

El texto del aro, el «CGE» y el «ES» son las piezas vectorizadas del
emblema oficial, así que la tipografía es la del original y nada depende
de ninguna fuente instalada.

    python dev/construir-emblemas.py

Escribe los SVG en dev/emblemas/. No toca assets/: el emblema de la web
sigue siendo el oficial hasta que la Junta elija.
"""
import io, math, os, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAL  = os.path.join(RAIZ, 'dev', 'emblemas')

fuente = io.open(os.path.join(RAIZ, 'assets', 'img', 'logo.svg'), encoding='utf-8').read()
P = dict(zip(['estrella1', 'estrella2', 'texto', 'cge', 'es', 'manos'],
             re.findall(r'<path\s+d="([^"]*)"\s+fill="[^"]*"\s*/>', fuente)))

ROJO, AMAR, VERDE = '#D60A07', '#FCC803', '#37960E'
NAVY, NAVY9, ORO  = '#1F2A37', '#0D1B2A', '#D9A520'
VERDE_RAMA        = '#2E7D32'

C  = 256.0
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
        rr = r if i % 2 == 0 else r * 0.45
        pts.append('%.2f %.2f' % (cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return '<polygon points="%s" fill="%s"/>' % (' '.join(pts), color)


# ══════════════════════════════════════════════════════════════════════
#  Ramas de olivo
# ──────────────────────────────────────────────────────────────────────
#  Van sobre un arco centrado en el propio emblema, que es como están en
#  la propuesta: abrazan el escudo siguiendo la curva del aro. El tallo es
#  ese arco, y las hojas se reparten a lo largo alternando hacia dentro y
#  hacia fuera, cada una girada en la dirección de la curva y menguando
#  hacia la punta.
# ══════════════════════════════════════════════════════════════════════
def rama(a0, a1, radio=150.0, hojas=9, largo=33.0, ancho=13.5, color=VERDE_RAMA):
    g = []
    x0, y0 = C + radio * math.cos(math.radians(a0)), C + radio * math.sin(math.radians(a0))
    x1, y1 = C + radio * math.cos(math.radians(a1)), C + radio * math.sin(math.radians(a1))
    barrido = 1 if a1 > a0 else 0
    g.append('<path d="M%.2f %.2f A%.1f %.1f 0 0 %d %.2f %.2f" fill="none" stroke="%s" '
             'stroke-width="4.5" stroke-linecap="round"/>'
             % (x0, y0, radio, radio, barrido, x1, y1, color))
    for i in range(hojas):
        t = (i + 0.5) / hojas
        a = math.radians(a0 + (a1 - a0) * t)
        fuera = 1 if i % 2 == 0 else -1
        k = 1.0 - 0.30 * t
        hx = C + (radio + fuera * largo * 0.42) * math.cos(a)
        hy = C + (radio + fuera * largo * 0.42) * math.sin(a)
        giro = math.degrees(a) + (90 if a1 > a0 else -90) + fuera * 26
        g.append('<ellipse cx="%.2f" cy="%.2f" rx="%.2f" ry="%.2f" fill="%s" '
                 'transform="rotate(%.1f %.2f %.2f)"/>'
                 % (hx, hy, largo * k / 2, ancho * k / 2, color, giro, hx, hy))
    return ''.join(g)


# ══════════════════════════════════════════════════════════════════════
#  El escudo: las tres franjas, filete dorado por dentro del contorno
#  navy y la cinta cruzada con el acrónimo, con las puntas en pico.
# ══════════════════════════════════════════════════════════════════════
ESCUDO = 'M256 120 L370 159 L370 299 Q370 370 256 416 Q142 370 142 299 L142 159 Z'


def escudo(ide, cx, cy, alto, cinta=True):
    x0, y0, x1, y1 = bbox(ESCUDO)
    k = alto / (y1 - y0)
    tx, ty = cx - (x0 + (x1 - x0) / 2) * k, cy - (y0 + (y1 - y0) / 2) * k
    g = ['<g transform="translate(%.2f %.2f) scale(%.4f)">' % (tx, ty, k),
         '<clipPath id="%s"><path d="%s"/></clipPath>' % (ide, ESCUDO),
         '<g clip-path="url(#%s)">'
         '<rect x="142" y="112" width="76" height="312" fill="%s"/>'
         '<rect x="218" y="112" width="76" height="312" fill="%s"/>'
         '<rect x="294" y="112" width="76" height="312" fill="%s"/>'
         '</g>' % (ide, ROJO, AMAR, VERDE),
         # El filete dorado va recortado por la propia silueta, así que
         # solo se ve la mitad de dentro del trazo: de 24 de grosor
         # quedan 12 por dentro, y el contorno navy —8, o sea 4 hacia
         # dentro— deja asomar 8. Con 12 y 9 el navy se lo comía entero.
         '<path d="%s" fill="none" stroke="%s" stroke-width="24" clip-path="url(#%s)"/>'
         % (ESCUDO, ORO, ide),
         '<path d="%s" fill="none" stroke="%s" stroke-width="8"/>' % (ESCUDO, NAVY),
         '</g>']
    if cinta:
        semi = (x1 - x0) / 2 * k + 15
        alt  = 38.0
        yc   = cy + alto * 0.05
        # Cinta con las puntas en cola de pez: el pico se recorta DENTRO
        # de cada extremo, no de una punta a la otra. Escrito del tirón,
        # la línea entre los dos picos se llevaba por delante la mitad
        # inferior de la cinta y quedaba una flecha negra.
        T, B, L, R = yc - alt / 2, yc + alt / 2, cx - semi, cx + semi
        g.append('<path d="M%.1f %.1f L%.1f %.1f L%.1f %.1f L%.1f %.1f '
                 'L%.1f %.1f L%.1f %.1f Z" fill="%s"/>'
                 % (L, T, R, T, R - 13, yc, R, B, L, B, L + 13, yc, NAVY9))
        g.append('<path %s d="%s" fill="#fff"/>'
                 % (encajar(P['cge'], cx - 22, yc, 58), P['cge']))
        g.append('<rect x="%.1f" y="%.1f" width="10" height="4.5" fill="#fff"/>'
                 % (cx + 11, yc - 2))
        g.append('<path %s d="%s" fill="#fff"/>'
                 % (encajar(P['es'], cx + 41, yc, 34), P['es']))
    return ''.join(g)


# ══════════════════════════════════════════════════════════════════════
def emblema(ramas=True, pequeno=False, negativo=False, ide='x'):
    fondo = NAVY9 if negativo else '#fff'
    tinta = '#fff' if negativo else NAVY

    c = ['<circle cx="256" cy="256" r="250" fill="%s"/>' % fondo]
    if pequeno:
        # Un solo aro y gordo. Con los dos aros finos de la versión grande,
        # a 44 px eran dos hilos de medio píxel: el círculo desaparecía y
        # quedaba un escudo flotando, que es justo lo que no se quería.
        c.append('<circle cx="256" cy="256" r="239" fill="none" stroke="%s" '
                 'stroke-width="22"/>' % tinta)
    else:
        # Dos aros finos, como en la propuesta.
        c += ['<circle cx="256" cy="256" r="245.5" fill="none" stroke="%s" stroke-width="7"/>'
              % tinta,
              '<circle cx="256" cy="256" r="233" fill="none" stroke="%s" stroke-width="2.5"/>'
              % tinta]

    if not pequeno:
        # El texto oficial llega hasta r249,3 de 250 y pisaría los aros:
        # escalado al 90 % desde el centro pasa a ocupar r175-224.
        c.append('<path %s d="%s" fill="%s"/>' % (desde_centro(0.90), P['texto'], tinta))
        # Los dos puntos que separan el arco de arriba del de abajo, en el
        # ángulo donde el emblema oficial pone sus dos estrellas.
        a = math.radians(40.9)
        for signo in (1, -1):
            c.append('<circle cx="%.2f" cy="%.2f" r="7" fill="%s"/>'
                     % (C + signo * 199 * math.cos(a), C + 199 * math.sin(a), tinta))
        if ramas:
            c.append(rama(112, 203))     # izquierda, de abajo hacia arriba
            c.append(rama(68, -23))      # derecha, en espejo

    # El escudo va un poco por encima del centro geométrico para dejar
    # hueco a la estrella, como en la propuesta. En formato pequeño crece
    # y se queda solo, sin cinta ni ramas: a 44 px lo demás es ruido.
    c.append(escudo(ide, C, C - (0 if pequeno else 16),
                    326.0 if pequeno else 208.0, cinta=not pequeno))

    if not pequeno:
        c.append(estrella(C, C + 142, 19, ORO))

    return ''.join(c)


JUEGO = [('f1-fiel', dict(ramas=True)), ('f2-sin-ramas', dict(ramas=False))]

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
        print('  %-36s %5.1f KB' % (nombre + suf + '.svg', len(svg) / 1024))
