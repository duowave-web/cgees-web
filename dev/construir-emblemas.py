# -*- coding: utf-8 -*-
"""Propuestas de emblema circular para el CGE-ES.

Todas reutilizan las piezas vectorizadas del emblema oficial —el texto del
aro, «CGE», «ES» y el apretón de manos—, de modo que la letra es la del
original y no una imitación con otra fuente. Lo que cambia es la
composición y el reparto del color.

    python dev/construir-emblemas.py

Escribe los SVG en dev/emblemas/. Ninguno toca assets/: se eligen primero.
"""
import io, os, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAL  = os.path.join(RAIZ, 'dev', 'emblemas')

# ── Piezas del emblema oficial ─────────────────────────────────────────
fuente = io.open(os.path.join(RAIZ, 'assets', 'img', 'logo.svg'), encoding='utf-8').read()
_p = re.findall(r'<path\s+d="([^"]*)"\s+fill="[^"]*"\s*/>', fuente)
P = dict(zip(['estrella1', 'estrella2', 'texto', 'cge', 'es', 'manos'], _p))

# Colores: los del emblema oficial y el navy del sitio
ROJO, AMAR, VERDE = '#D60A07', '#FCC803', '#37960E'
NAVY, NAVY9 = '#1F2A37', '#0D1B2A'

def bbox(d):
    """Caja aproximada de un trazo: vale porque las curvas van dentro de
       sus puntos de control."""
    n = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
    xs, ys = n[0::2], n[1::2]
    return min(xs), min(ys), max(xs), max(ys)

def encajar(d, cx, cy, ancho=None, alto=None):
    """Mueve y escala un trazo para centrarlo en (cx,cy) con el tamaño dado."""
    x0, y0, x1, y1 = bbox(d)
    w, h = x1 - x0, y1 - y0
    k = min(ancho / w if ancho else 9e9, alto / h if alto else 9e9)
    if k > 8e9: k = 1.0
    tx = cx - (x0 + w / 2) * k
    ty = cy - (y0 + h / 2) * k
    return 'transform="translate(%.2f %.2f) scale(%.4f)"' % (tx, ty, k)

CIERRE = chr(10) + '</svg>' + chr(10)

CAB = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"\n'
       '     role="img" aria-labelledby="t">\n<title id="t">%s</title>\n')

def bandas(cx, cy, r, ids):
    """Disco partido en las tres franjas verticales de la bandera."""
    return (
      '<clipPath id="%s"><circle cx="%g" cy="%g" r="%g"/></clipPath>'
      '<g clip-path="url(#%s)">'
        '<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>'
        '<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>'
        '<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>'
      '</g>' % (ids, cx, cy, r, ids,
                cx - r, cy - r, 2 * r / 3, 2 * r, ROJO,
                cx - r / 3, cy - r, 2 * r / 3, 2 * r, AMAR,
                cx + r / 3, cy - r, 2 * r / 3, 2 * r, VERDE))

def estrella(cx, cy, r, color):
    import math
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.42
        pts.append('%.2f %.2f' % (cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return '<polygon points="%s" fill="%s"/>' % (' '.join(pts), color)

# ══════════════════════════════════════════════════════════════════════
# Estructura común: un aro con el nombre, un hueco blanco y un centro.
# Tres zonas y nada más. El emblema actual falla a tamaño pequeño porque
# tiene todo el disco saturado —aro rojo, aro amarillo, centro verde— y a
# 44 px eso es una mancha. El hueco blanco es lo que lo aligera.
# ══════════════════════════════════════════════════════════════════════

def aro(color, pequeno, negativo=False):
    """Aro exterior con el texto oficial.

       En formato pequeño el texto se cae: a 44 px no se lee y solo
       ensucia.

       En negativo el aro se vuelve blanco y la letra navy. Hace falta
       porque el pie de la web es navy: un aro navy sobre fondo navy
       desaparece, y el emblema se queda flotando sin contorno."""
    fondo = '#fff' if negativo else color
    tinta = color if negativo else '#fff'
    c = ['<circle cx="256" cy="256" r="250" fill="%s"/>' % fondo,
         '<circle cx="256" cy="256" r="188.4" fill="#fff"/>']
    if not pequeno:
        c += ['<path d="%s" fill="%s"/>' % (P['texto'], tinta),
              estrella(418.9, 397, 17, AMAR if not negativo else color),
              estrella(93.1, 397, 17, AMAR if not negativo else color)]
    return c

# ── A · Anillo tricolor ───────────────────────────────────────────────
#    El color va en un anillo de bandera y el apretón de manos se queda
#    en un disco blanco, en navy.
#
#    La primera versión ponía las manos en blanco directamente sobre las
#    franjas, y sobre el amarillo desaparecían: blanco sobre #FCC803 es
#    1,3:1 de contraste. El disco blanco lo resuelve y además deja el
#    centro tranquilo, que es lo que se agradece a tamaño pequeño.
def A(pequeno=False, color=None, negativo=False):
    ide = 'a%d' % (0 if pequeno else 1)
    c = aro(color or NAVY, pequeno, negativo)
    c += [bandas(256, 256, 168, ide),
          '<circle cx="256" cy="256" r="110" fill="#fff"/>',
          '<path %s d="%s" fill="%s"/>' % (encajar(P['manos'], 256, 256, 150, 150),
                                           P['manos'], NAVY)]
    return ''.join(c)

# ── B · Escudo ligero ─────────────────────────────────────────────────
#    La idea de la propuesta que trae, sin el peso: fuera los dos mapas,
#    las ramas de olivo y la cinta. Queda el escudo con las tres franjas
#    y el acrónimo. En formato pequeño el acrónimo también se cae.
def B(pequeno=False, negativo=False):
    ESC = 'M256 120 L370 159 L370 299 Q370 370 256 416 Q142 370 142 299 L142 159 Z'
    c = aro(NAVY, pequeno, negativo)
    ide = 'b%d' % (0 if pequeno else 1)
    # Sin el texto del aro, el escudo puede crecer hasta llenar el círculo.
    # A 44 px, con el tamaño que tiene en la versión grande, se quedaba en
    # una rayita tricolor vertical.
    if pequeno:
        c.append('<g transform="translate(256 256) scale(1.46) translate(-256 -256)">')
    c += ['<clipPath id="%s"><path d="%s"/></clipPath>' % (ide, ESC),
          '<g clip-path="url(#%s)">'
            '<rect x="142" y="112" width="76" height="312" fill="%s"/>'
            '<rect x="218" y="112" width="76" height="312" fill="%s"/>'
            '<rect x="294" y="112" width="76" height="312" fill="%s"/>'
          '</g>' % (ide, ROJO, AMAR, VERDE),
          '<path d="%s" fill="none" stroke="%s" stroke-width="8"/>' % (ESC, NAVY)]
    if not pequeno:
        c += ['<rect x="142" y="243" width="228" height="68" fill="%s"/>' % NAVY9,
              '<path %s d="%s" fill="#fff"/>' % (encajar(P['cge'], 218, 277, 92, None), P['cge']),
              '<rect x="272" y="272" width="15" height="7" fill="#fff"/>',
              '<path %s d="%s" fill="#fff"/>' % (encajar(P['es'], 322, 277, 54, None), P['es'])]
    # En formato pequeño el escudo se queda con las tres franjas y nada
    # más: a 44 px cualquier cosa dentro de él es un borrón.
    if pequeno:
        c.append('</g>')
    return ''.join(c)

# Hubo una cuarta, «aro tricolor»: el color en un arco del aro y el
# apretón de manos grande en navy sobre campo blanco. Se descartó porque a
# 44 px las manos en navy eran una mancha negra sin forma. La prueba está
# en el historial de commits.

JUEGO = [('a-corazon-navy',  lambda **k: A(**k)),
         ('a-corazon-rojo',  lambda **k: A(color=ROJO, **k)),
         ('b-escudo',        lambda **k: B(**k))]

TITULO = 'Conseil des Guinéens de l’Étranger — Espagne'
FORMATOS = [('', dict()),                      # completo
            ('-pequeno', dict(pequeno=True)),  # cabecera y favicon
            ('-negativo', dict(negativo=True)),         # sobre fondo oscuro
            ('-pequeno-negativo', dict(pequeno=True, negativo=True))]
for nombre, fn in JUEGO:
    for suf, kw in FORMATOS:
        svg = CAB % TITULO + fn(**kw) + CIERRE
        ruta = os.path.join(SAL, nombre + suf + '.svg')
        io.open(ruta, 'w', encoding='utf-8', newline='').write(svg)
        print('  %-30s %5.1f KB' % (os.path.basename(ruta), len(svg) / 1024))
