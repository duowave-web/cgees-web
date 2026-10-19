# -*- coding: utf-8 -*-
"""Genera el mapa de España por comunidades autónomas para la web.

    python dev/generar-mapa-ccaa.py

Baja un GeoJSON público de las comunidades autónomas, lo proyecta a
coordenadas de pantalla, lo simplifica y escribe assets/js/mapa-ccaa.js
con un trazo SVG por comunidad.

DE DÓNDE SALEN LAS FRONTERAS
────────────────────────────
Del proyecto Click That Hood (MIT), que publica los límites de las
comunidades a partir de fuentes públicas. Es un archivo de 1,3 MB: se lee
en memoria y NO se guarda en el repositorio; lo que se guarda es el
resultado ya simplificado, que ronda los 60 KB.

Si el enlace deja de funcionar, cualquier GeoJSON de comunidades vale:
solo hay que ajustar NOMBRES al campo que traiga.

DECISIONES QUE HAY QUE CONOCER PARA TOCARLO
───────────────────────────────────────────
· Canarias se dibuja en un recuadro aparte, abajo a la izquierda, como en
  cualquier mapa de prensa. Con su posición real el mapa sería tres
  cuartas partes de océano.
· Se tiran los islotes por debajo de un umbral de superficie, salvo en
  Baleares y Canarias, donde las islas SON el territorio. Galicia trae
  1.509 piezas y casi todas son rocas.
· La proyección es equirectangular con la x corregida por el coseno de la
  latitud media de España. A esta escala no se distingue de una Mercator
  y ahorra dependencias.
"""
import io, json, math, os, sys, urllib.request
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = ('https://raw.githubusercontent.com/codeforgermany/click_that_hood/'
       'main/public/data/spain-communities.geojson')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(RAIZ, 'assets', 'js', 'mapa-ccaa.js')

ANCHO, ALTO = 1000.0, 740.0        # lienzo del SVG
MARGEN = 14.0
TOLERANCIA = 0.55                  # simplificación, en píxeles del lienzo
AREA_MINIMA = 1.2                  # islotes por debajo de esto, fuera
AREA_MINIMA_ISLAS = 0.25           # en Baleares y Canarias se baja el listón

# Nombre en el GeoJSON -> nombre que usa la web, y su abreviatura
NOMBRES = {
    'Andalucia':          ('Andalucía', 'AND'),
    'Aragon':             ('Aragón', 'ARA'),
    'Asturias':           ('Principado de Asturias', 'AST'),
    'Baleares':           ('Illes Balears', 'BAL'),
    'Canarias':           ('Canarias', 'CNR'),
    'Cantabria':          ('Cantabria', 'CNT'),
    'Castilla-Leon':      ('Castilla y León', 'CYL'),
    'Castilla-La Mancha': ('Castilla-La Mancha', 'CLM'),
    'Cataluña':           ('Cataluña', 'CAT'),
    'Ceuta':              ('Ceuta', 'CEU'),
    'Extremadura':        ('Extremadura', 'EXT'),
    'Galicia':            ('Galicia', 'GAL'),
    'La Rioja':           ('La Rioja', 'RIO'),
    'Madrid':             ('Comunidad de Madrid', 'MAD'),
    'Melilla':            ('Melilla', 'MEL'),
    'Murcia':             ('Región de Murcia', 'MUR'),
    'Navarra':            ('Comunidad Foral de Navarra', 'NAV'),
    'Pais Vasco':         ('País Vasco', 'PVA'),
    'Valencia':           ('Comunitat Valenciana', 'CVA'),
}

# Las que son demasiado pequeñas para que quepa el número dentro: se
# marcan con un punto y la etiqueta al lado.
MINUSCULAS = {'Ceuta', 'Melilla'}


def anillos(geom):
    """Devuelve la lista de anillos exteriores, venga como venga."""
    t, c = geom['type'], geom['coordinates']
    if t == 'Polygon':
        return [c[0]]
    if t == 'MultiPolygon':
        return [p[0] for p in c]
    return []


def area(pts):
    s = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2.0


def simplificar(pts, tol):
    """Douglas-Peucker. Con los islotes ya fuera, baja el peso a la mitad
       sin que se note el cambio de forma.

       OJO: los anillos del GeoJSON vienen cerrados, con el ultimo punto
       igual al primero. Si se le pasan asi, el segmento de referencia mide
       cero, todas las distancias salen cero y la pieza se queda en dos
       puntos: el mapa entero cabria en 3 KB y no se veria nada. El punto
       de cierre se quita aqui; el trazo ya se cierra con la Z."""
    if len(pts) > 1 and pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 5:
        return pts

    def rec(ini, fin):
        peor, idx = 0.0, 0
        ax, ay = pts[ini]
        bx, by = pts[fin]
        dx, dy = bx - ax, by - ay
        largo = math.hypot(dx, dy) or 1e-9
        for i in range(ini + 1, fin):
            px, py = pts[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / largo
            if d > peor:
                peor, idx = d, i
        if peor > tol:
            return rec(ini, idx)[:-1] + rec(idx, fin)
        return [pts[ini], pts[fin]]

    sys.setrecursionlimit(10000)
    return rec(0, len(pts) - 1)


def dentro(p, anillo):
    """Punto en polígono, por el método del rayo."""
    x, y = p
    d, n = False, len(anillo)
    j = n - 1
    for i in range(n):
        xi, yi = anillo[i]
        xj, yj = anillo[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi:
            d = not d
        j = i
    return d


def al_borde(p, anillo):
    """Distancia del punto al borde más cercano."""
    x, y = p
    mejor = 1e18
    n = len(anillo)
    for i in range(n):
        ax, ay = anillo[i]
        bx, by = anillo[(i + 1) % n]
        dx, dy = bx - ax, by - ay
        L = dx * dx + dy * dy
        t = 0.0 if L == 0 else max(0.0, min(1.0, ((x - ax) * dx + (y - ay) * dy) / L))
        px, py = ax + t * dx, ay + t * dy
        d = (x - px) ** 2 + (y - py) ** 2
        if d < mejor:
            mejor = d
    return math.sqrt(mejor)


def polo(anillo):
    """El punto de dentro que queda más lejos del borde, y a qué distancia.

       Es donde va la cifra. El centro de la caja NO sirve: Valencia es un
       arco y Cataluña un triángulo, y en las dos el centro de la caja cae
       en el mar. Este punto es además el que más sitio deja al número, así
       que de paso dice si la comunidad es demasiado pequeña para llevarlo
       dentro.

       Rejilla gruesa y luego afinado alrededor del mejor candidato: para
       19 comunidades sobra, y evita traer una dependencia."""
    xs = [p[0] for p in anillo]
    ys = [p[1] for p in anillo]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    mejor, md = ((x0 + x1) / 2, (y0 + y1) / 2), -1.0
    paso = max((x1 - x0), (y1 - y0)) / 26.0 or 1.0
    while paso > 0.6:
        rx0 = max(x0, mejor[0] - paso * 3) if md >= 0 else x0
        rx1 = min(x1, mejor[0] + paso * 3) if md >= 0 else x1
        ry0 = max(y0, mejor[1] - paso * 3) if md >= 0 else y0
        ry1 = min(y1, mejor[1] + paso * 3) if md >= 0 else y1
        y = ry0
        while y <= ry1:
            x = rx0
            while x <= rx1:
                if dentro((x, y), anillo):
                    d = al_borde((x, y), anillo)
                    if d > md:
                        md, mejor = d, (x, y)
                x += paso
            y += paso
        paso /= 2.2
    return mejor, md


def main():
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    crudo = urllib.request.urlopen(req, timeout=180).read()
    print('  GeoJSON: %.1f MB en memoria' % (len(crudo) / 1024 / 1024))
    g = json.loads(crudo.decode('utf-8'))

    # ── Proyección ───────────────────────────────────────────────────
    # Península y Baleares por un lado; Canarias, aparte y luego movida.
    def proyecta(lon, lat, k):
        return (lon * k, -lat)

    K = math.cos(math.radians(40.0))

    piezas = {}      # nombre web -> lista de anillos proyectados
    for f in g['features']:
        bruto = f['properties'].get('name')
        if bruto not in NOMBRES:
            raise SystemExit('comunidad no reconocida en el GeoJSON: %r' % bruto)
        nombre, abrev = NOMBRES[bruto]
        piezas[nombre] = [[proyecta(x, y, K) for x, y in anillo]
                          for anillo in anillos(f['geometry'])]

    def caja(listas):
        xs = [p[0] for l in listas for p in l]
        ys = [p[1] for l in listas for p in l]
        return min(xs), min(ys), max(xs), max(ys)

    # Canarias se saca del conjunto para encajarla en su recuadro
    canarias = piezas.pop('Canarias')
    x0, y0, x1, y1 = caja([a for v in piezas.values() for a in v])

    # Se escala para llenar el ancho y el alto del lienzo sale de ahí: así
    # no queda lienzo vacío a los lados, que en una caja de la web se nota
    # como un hueco raro debajo del título.
    esc = (ANCHO - 2 * MARGEN) / (x1 - x0)
    alto = (y1 - y0) * esc + 2 * MARGEN

    def a_lienzo(p):
        return ((p[0] - x0) * esc + MARGEN, (p[1] - y0) * esc + MARGEN)

    salida, etiquetas, salida_puntos = {}, {}, {}

    def procesa(nombre, listas, transform, minima):
        anillos_ok = []
        for anillo in listas:
            pl = [transform(p) for p in anillo]
            if area(pl) < minima:
                continue
            anillos_ok.append(simplificar(pl, TOLERANCIA))
        if not anillos_ok:
            return
        anillos_ok.sort(key=area, reverse=True)
        d = ''
        for a in anillos_ok:
            d += 'M' + 'L'.join('%.1f %.1f' % (x, y) for x, y in a) + 'Z'
        salida[nombre] = d
        salida_puntos[nombre] = anillos_ok
        etiquetas[nombre] = polo(anillos_ok[0])

    for nombre, listas in piezas.items():
        bruto = [k for k, v in NOMBRES.items() if v[0] == nombre][0]
        minima = AREA_MINIMA_ISLAS if bruto == 'Baleares' else AREA_MINIMA
        if bruto in MINUSCULAS:
            minima = 0.0
        procesa(nombre, listas, a_lienzo, minima)

    # ── Canarias, en el hueco del Mediterráneo ───────────────────────
    # Abajo a la derecha, debajo de Murcia, que es donde hay mar vacío.
    # En los mapas de prensa suele ir abajo a la izquierda, pero ahí el
    # hueco es de Portugal y Andalucía llega hasta el borde: no cabe.
    cx0, cy0, cx1, cy1 = caja(canarias)
    CAJA_ANCHO, CAJA_ALTO = 268.0, 96.0
    CAJA_X, CAJA_Y = ANCHO - CAJA_ANCHO - MARGEN, alto - CAJA_ALTO - MARGEN

    # Si una revisión de las fronteras moviera la costa, el recuadro se
    # comería tierra y nadie se daría cuenta hasta verlo publicado.
    for nombre, anillos_ok in salida_puntos.items():
        for anillo in anillos_ok:
            for px, py in anillo:
                if (CAJA_X - 6 <= px <= CAJA_X + CAJA_ANCHO + 6 and
                        CAJA_Y - 6 <= py <= CAJA_Y + CAJA_ALTO + 6):
                    raise SystemExit(
                        'el recuadro de Canarias pisa %s en (%.0f, %.0f): '
                        'muévelo o hazlo más pequeño' % (nombre, px, py))

    esc_c = min(CAJA_ANCHO / (cx1 - cx0), CAJA_ALTO / (cy1 - cy0)) * 0.90
    off_x = CAJA_X + (CAJA_ANCHO - (cx1 - cx0) * esc_c) / 2
    off_y = CAJA_Y + (CAJA_ALTO - (cy1 - cy0) * esc_c) / 2

    procesa('Canarias', canarias,
            lambda p: ((p[0] - cx0) * esc_c + off_x, (p[1] - cy0) * esc_c + off_y),
            AREA_MINIMA_ISLAS)

    # ── Dónde va la cifra cuando no cabe dentro ──────────────────────
    # Ceuta y Melilla no tienen sitio ninguno, y en el mapa de entidades
    # tampoco lo tienen La Rioja ni Canarias. A esas la cifra se les saca
    # fuera, alejándola del centro del mapa, que es la dirección en la que
    # hay mar o margen. Lleva una línea fina y un recuadro blanco detrás,
    # por si cae sobre la comunidad vecina.
    fuera = {}
    cx, cy = ANCHO / 2.0, alto / 2.0
    for nombre, ((ex, ey), radio) in etiquetas.items():
        vx, vy = ex - cx, ey - cy
        largo = math.hypot(vx, vy)
        if largo < 40:                      # Madrid, que está en el centro:
            vx, vy, largo = 0.0, -1.0, 1.0  # hacia arriba
        salto = max(radio, 6) + 46
        fx = ex + vx / largo * salto
        fy = ey + vy / largo * salto
        fuera[nombre] = (min(max(fx, 34.0), ANCHO - 34.0),
                         min(max(fy, 24.0), alto - 24.0))

    # Tres no los arregla la regla de arriba, y es por su naturaleza:
    # Canarias porque su cifra caeria dentro de su propio recuadro, y las
    # dos ciudades autonomas porque estan en Africa, en el borde de abajo
    # del lienzo, y alejarse del centro las saca del dibujo. Las tres van
    # al mar libre que queda bajo Andalucia.
    fuera.update({
        'Canarias': (CAJA_X - 56.0, CAJA_Y + CAJA_ALTO / 2),
        'Ceuta':    (208.0, alto - 52.0),
        'Melilla':  (560.0, alto - 20.0),
    })

    # ── A JavaScript ─────────────────────────────────────────────────
    # El orden de la lista es el orden en que se dibujan: las pequeñas
    # tienen que ir las últimas para quedar encima y poder pulsarlas.
    orden = sorted(salida, key=lambda n: -etiquetas[n][1])
    filas = []
    for nombre in orden:
        abrev = [v[1] for v in NOMBRES.values() if v[0] == nombre][0]
        (ex, ey), radio = etiquetas[nombre]
        fx, fy = fuera[nombre]
        filas.append("  { n: '%s', a: '%s', x: %.1f, y: %.1f, r: %.0f, "
                     "fx: %.1f, fy: %.1f, d: '%s' }"
                     % (nombre, abrev, ex, ey, radio, fx, fy, salida[nombre]))

    cab = [
      '/* Mapa de España por comunidades autónomas.',
      '   GENERADO por dev/generar-mapa-ccaa.py a partir de un GeoJSON público',
      '   (Click That Hood, MIT). NO editar a mano: se pierde al volver a',
      '   generarlo.',
      '',
      '   Canarias va en un recuadro aparte, abajo a la derecha, que es donde',
      '   queda mar vacío: con su posición real el mapa sería tres cuartas',
      '   partes de océano.',
      '',
      '     n   nombre de la comunidad, igual que en el registro de entidades',
      '     a   abreviatura de tres letras',
      '     x,y el punto de dentro más alejado del borde, que es donde va la',
      '         cifra. El centro de la caja no vale: en Valencia y en Cataluña',
      '         cae en el mar',
      '     r   cuánto sitio hay alrededor de ese punto, en unidades del',
      '         lienzo. Por debajo de unas 20 la cifra no cabe dentro y hay que',
      '         sacarla fuera: le pasa a Ceuta, Melilla y a las comunidades',
      '         pequeñas del norte',
      '     fx,fy donde va la cifra cuando no cabe dentro: fuera del dibujo,',
      '         alejandose del centro del mapa, con una linea fina que la une',
      '         a su comunidad',
      '     d   el trazo. Van de mayor a menor hueco, porque el orden de la',
      '         lista es el orden en que se dibujan y las pequeñas tienen que',
      '         quedar encima para poder pulsarlas */',
      'window.CGE_MAPA = {',
      "  viewBox: '0 0 %d %d'," % (ANCHO, round(alto)),
      '  recuadroCanarias: { x: %.0f, y: %.0f, ancho: %.0f, alto: %.0f },'
        % (CAJA_X, CAJA_Y, CAJA_ANCHO, CAJA_ALTO),
      '  ccaa: [',
    ]
    NL = chr(10)
    js = NL.join(cab) + NL + (',' + NL).join(filas) + NL + '  ]' + NL + '};' + NL
    io.open(DESTINO, 'w', encoding='utf-8', newline='').write(js)

    print('  lienzo: %d x %d' % (ANCHO, round(alto)))
    print('  comunidades: %d' % len(salida))
    print('  mapa-ccaa.js: %.1f KB' % (len(js) / 1024))
    for nombre in orden:
        print('    %-30s hueco %4.0f' % (nombre, etiquetas[nombre][1]))


if __name__ == '__main__':
    main()
