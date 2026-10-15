# -*- coding: utf-8 -*-
"""Mete en la web el registro consolidado de entidades guineanas.

    python dev/importar-entidades.py [ruta-del-excel.xlsx]

Lee la hoja «Con NIF» del registro y reescribe el array `asociaciones` de
assets/js/contenido.js entre sus dos marcas. Necesita openpyxl
(pip install openpyxl).

QUÉ SE PUBLICA Y QUÉ NO
───────────────────────
La propia hoja lo dice: la fila 2 separa «INFORMACIÓN PUBLICABLE · ficha
web» (columnas A-M) de «INFORMACIÓN NO PUBLICABLE · uso interno»
(columnas O-Y). Este script solo lee las primeras, y ni siquiera todas:

  · El NOMBRE DE LA PRESIDENCIA no se copia. La hoja lo marca como
    publicable, pero es el nombre de una persona y publicarlo requiere su
    consentimiento. Está en 34 de las 54 entidades, así que son 34
    consentimientos. Mientras no consten, no se escribe: ojo, que
    contenido.js se sirve entero al navegador, así que lo que se guarda
    aquí queda publicado aunque no se pinte en pantalla.

  · Los teléfonos, las direcciones postales y los correos personales
    están en el bloque no publicable y no se tocan.

Lo que sí entra: nombre, sigla, tipo, NIF, año de constitución, número y
organismo de registro, municipio, provincia, comunidad autónoma y el
correo de contacto cuando es de la entidad.
"""
import io, os, re, sys, unicodedata
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import openpyxl

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCEL = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    r'~\Downloads\2026-10-01_CGE-ES_Registro-Entidades-Guineanas-Espana-Consolidado_INT.xlsx')
DESTINO = os.path.join(RAIZ, 'assets', 'js', 'contenido.js')

# Columnas de la hoja (0 = columna A)
COL = dict(num=0, nombre=1, sigla=2, tipo=3, nif=4, creacion=5, registro=6,
           organismo=7, municipio=8, provincia=9, ca=10, email=11)

# Entidades sin NIF: la Junta pidió publicarlas igual, pero solo con
# nombre y provincia, sin ficha.
SIN_FICHA_SIN_NIF = True


def texto(v):
    if v is None:
        return ''
    s = str(v).strip()
    return '' if s.lower() in ('none', 'nan', '-', '—') else s


def anio(v):
    """De la fecha de creación solo interesa el año."""
    s = texto(v)
    if not s:
        return ''
    m = re.search(r'(1[89]\d{2}|20\d{2})', s)
    return m.group(1) if m else ''


def normaliza(s):
    s = unicodedata.normalize('NFKD', s.lower())
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]', '', s)


def escapa(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")


# ── Los ámbitos venían a mano y la hoja no los trae: se conservan ─────
def ambitos_anteriores():
    s = io.open(DESTINO, encoding='utf-8').read()
    previos = {}
    for m in re.finditer(r"nombre:\s*'([^']+)'[^}]*?ambito:\s*'([^']*)'", s, re.S):
        if m.group(2):
            previos[normaliza(m.group(1))] = m.group(2)
    for m in re.finditer(r"sigla:\s*'([^']+)'[^}]*?ambito:\s*'([^']*)'", s, re.S):
        if m.group(2):
            previos.setdefault(normaliza(m.group(1)), m.group(2))
    return previos


def main():
    wb = openpyxl.load_workbook(EXCEL, data_only=True)
    if 'Con NIF' not in wb.sheetnames:
        raise SystemExit('la hoja «Con NIF» no está en %s' % os.path.basename(EXCEL))
    ws = wb['Con NIF']

    # Comprobación de seguridad: que la fila 2 siga marcando dónde acaba
    # lo publicable. Si alguien reordena columnas, este script tiene que
    # dejar de funcionar en vez de publicar lo que no debe.
    marcas = {r.coord: texto(ws.cell(2, r.min_col).value)
              for r in ws.merged_cells.ranges if r.min_row == 2}
    if 'A2:M2' not in marcas or 'PUBLICABLE' not in marcas.get('A2:M2', '').upper():
        raise SystemExit('la hoja ha cambiado de estructura: revisa qué columnas son publicables')

    previos = ambitos_anteriores()
    filas = [f for f in ws.iter_rows(min_row=4, values_only=True) if texto(f[COL['nombre']])]

    # Un NIF no puede ser de dos entidades: si se repite, no se publica en
    # ninguna de las dos hasta que se aclare cuál es cuál.
    cuenta = {}
    for f in filas:
        n = texto(f[COL['nif']])
        if n:
            cuenta[n] = cuenta.get(n, 0) + 1
    repetidos = {n for n, c in cuenta.items() if c > 1}

    entidades, avisos = [], []
    for f in filas:
        nif = texto(f[COL['nif']])
        # «Activo» en la casilla del NIF es un valor descolocado, no un NIF
        if nif and not re.match(r'^[A-Z]\d{7}[A-Z0-9]$', nif, re.I):
            avisos.append('nº %s (%s): «%s» no parece un NIF'
                          % (f[COL['num']], texto(f[COL['nombre']])[:38], nif))
            nif = ''
        if nif and nif in repetidos:
            avisos.append('nº %s (%s): NIF %s repetido, no se publica'
                          % (f[COL['num']], texto(f[COL['nombre']])[:38], nif))
            nif = ''

        nombre = texto(f[COL['nombre']])
        # La ficha la decide tener NIF de verdad, no que la casilla esté
        # escrita: en una pone «Activo», que no es un NIF. Las dos del NIF
        # repetido sí conservan ficha: el NIF existe, lo que no sabemos es
        # de cuál de las dos.
        tiene_nif_en_registro = bool(nif) or (texto(f[COL['nif']]) in repetidos)
        reg = texto(f[COL['registro']])
        org = texto(f[COL['organismo']])
        entidades.append(dict(
            nif=nif,
            sigla=texto(f[COL['sigla']]),
            nombre=nombre,
            tipo=texto(f[COL['tipo']]).capitalize(),
            ciudad=texto(f[COL['municipio']]),
            provincia=texto(f[COL['provincia']]),
            ca=texto(f[COL['ca']]),
            desde=anio(f[COL['creacion']]),
            registro=(reg + (' · ' + org if org else '')) if reg else '',
            email=texto(f[COL['email']]),
            web='',
            ambito=previos.get(normaliza(nombre), previos.get(normaliza(texto(f[COL['sigla']])), '')),
            ficha=tiene_nif_en_registro or not SIN_FICHA_SIN_NIF,
        ))

    entidades.sort(key=lambda e: (not e['ficha'], normaliza(e['nombre'])))

    lineas = []
    for e in entidades:
        campos = ', '.join("%s: '%s'" % (k, escapa(e[k])) for k in
                           ('nif', 'sigla', 'nombre', 'tipo', 'ciudad', 'provincia',
                            'ca', 'desde', 'registro', 'email', 'web', 'ambito'))
        lineas.append('    { %s, ficha: %s },' % (campos, 'true' if e['ficha'] else 'false'))

    s = io.open(DESTINO, encoding='utf-8').read()
    ini = s.index('  asociaciones: [')
    fin = s.index('\n  ]', ini) + len('\n  ]')
    nuevo = ('  asociaciones: [' + chr(10) + chr(10).join(lineas) + chr(10) + '  ]')
    io.open(DESTINO, 'w', encoding='utf-8', newline='').write(s[:ini] + nuevo + s[fin:])

    con, sin = sum(1 for e in entidades if e['ficha']), sum(1 for e in entidades if not e['ficha'])
    print('  entidades escritas: %d  (%d con ficha, %d solo nombre y provincia)'
          % (len(entidades), con, sin))
    print('  con correo: %d   con sigla: %d   con ámbito conservado: %d'
          % (sum(1 for e in entidades if e['email']),
             sum(1 for e in entidades if e['sigla']),
             sum(1 for e in entidades if e['ambito'])))
    if avisos:
        print()
        print('  A REVISAR EN LA HOJA:')
        for a in avisos:
            print('    · ' + a)


if __name__ == '__main__':
    main()
