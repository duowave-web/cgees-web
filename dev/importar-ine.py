# -*- coding: utf-8 -*-
"""Trae del INE la población guineana en España por comunidad autónoma.

    python dev/importar-ine.py

Lee la tabla 02005 del INE («Población extranjera por Nacionalidad,
comunidades, Sexo y Año»), se queda con la nacionalidad «Guinea» —que en
esa tabla es Guinea Conakry, distinta de «Guinea Ecuatorial» y de
«Guinea-Bissau»— y escribe el resultado en el bloque `poblacionINE` de
assets/js/contenido.js.

El CSV del INE son 12 MB con todas las nacionalidades: se lee en memoria
y se filtra, no se guarda en disco.

CUANDO EL INE PUBLIQUE UN AÑO NUEVO, se vuelve a ejecutar y ya está: el
script coge siempre el periodo más reciente de la tabla y lo deja
anotado, porque el dato sin el año no significa nada.
"""
import io, os, re, sys, urllib.request
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = ('https://www.ine.es/jaxi/files/_px/es/csv_bdsc/t20/e245/p08/l0/'
       '02005.csv_bdsc?nocab=1')
FUENTE = 'https://www.ine.es/jaxi/Tabla.htm?path=/t20/e245/p08/l0/&file=02005.px'
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(RAIZ, 'assets', 'js', 'contenido.js')

# El INE nombra las comunidades con un número delante y en orden inverso
# («Madrid, Comunidad de»). Aquí se traducen a la forma que usa la web.
NOMBRES = {
    '01': 'Andalucía',                   '02': 'Aragón',
    '03': 'Principado de Asturias',      '04': 'Illes Balears',
    '05': 'Canarias',                    '06': 'Cantabria',
    '07': 'Castilla y León',             '08': 'Castilla-La Mancha',
    '09': 'Cataluña',                    '10': 'Comunitat Valenciana',
    '11': 'Extremadura',                 '12': 'Galicia',
    '13': 'Comunidad de Madrid',         '14': 'Región de Murcia',
    '15': 'Comunidad Foral de Navarra',  '16': 'País Vasco',
    '17': 'La Rioja',                    '18': 'Ceuta',
    '19': 'Melilla',
}


def numero(s):
    s = s.strip().replace('.', '')
    return int(s) if s.isdigit() else 0


def main():
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    crudo = urllib.request.urlopen(req, timeout=180).read()
    print('  CSV del INE: %.1f MB en memoria' % (len(crudo) / 1024 / 1024))
    texto = crudo.decode('utf-8-sig', errors='replace')

    filas = [l.split(';') for l in texto.split(chr(10))[1:] if l.strip()]
    gui = [f for f in filas if len(f) > 5 and f[0].strip() == 'Guinea']
    if not gui:
        raise SystemExit('la tabla ya no trae la nacionalidad «Guinea»: revisa el INE')

    anio = sorted({f[4].strip() for f in gui})[-1]
    print('  año más reciente de la tabla: %s' % anio)

    por_ca, total = {}, 0
    for f in gui:
        if f[3].strip() != 'Ambos sexos' or f[4].strip() != anio:
            continue
        ca = f[2].strip()
        if not ca:
            if f[1].strip() == 'Total Nacional':
                total = numero(f[5])
            continue
        m = re.match(r'^(\d{2})\s', ca)
        if not m or m.group(1) not in NOMBRES:
            raise SystemExit('comunidad no reconocida en el CSV: %r' % ca)
        por_ca[NOMBRES[m.group(1)]] = numero(f[5])

    suma = sum(por_ca.values())
    if total and suma != total:
        print('  AVISO: las comunidades suman %d y el total nacional es %d' % (suma, total))
    print('  %d comunidades, %d personas' % (len(por_ca), suma))

    lineas = ['      \'%s\': %d,' % (k, v)
              for k, v in sorted(por_ca.items(), key=lambda x: -x[1])]
    bloque = (
        '  /* Población guineana en España por comunidad autónoma.\n'
        '     Fuente: INE, tabla 02005, nacionalidad «Guinea» (Conakry), ambos\n'
        '     sexos. Lo trae dev/importar-ine.py: no editar a mano.\n'
        '     El año va aquí porque un dato de población sin año no dice nada. */\n'
        '  poblacionINE: {\n'
        '    anio: \'%s\',\n'
        '    total: %d,\n'
        '    fuente: \'%s\',\n'
        '    porCa: {\n%s\n    }\n'
        '  },\n' % (anio, suma, FUENTE, chr(10).join(lineas)))

    s = io.open(DESTINO, encoding='utf-8').read()
    if 'poblacionINE:' in s:
        ini = s.index('  /* Población guineana en España')
        fin = s.index('\n  },\n', ini) + len('\n  },\n')
        s = s[:ini] + bloque + s[fin:]
    else:
        anc = '  asociaciones: ['
        s = s.replace(anc, bloque + chr(10) + anc, 1)
    io.open(DESTINO, 'w', encoding='utf-8', newline='').write(s)
    print('  escrito en contenido.js')


if __name__ == '__main__':
    main()
