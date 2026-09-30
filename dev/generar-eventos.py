# -*- coding: utf-8 -*-
"""Prepara los eventos para la web: fotos a WebP y documentos a imagenes.

FOTOS      -> assets/img/eventos/<id>/portada.webp  (1200x675, para la tarjeta)
              assets/img/eventos/<id>/01.webp ...   (carrusel, lado mayor 1500)
DOCUMENTOS -> assets/img/docs/<docid>-<n>.webp      (igual que los de origen)

Los originales NO se copian al sitio: ni las fotos a tamano completo ni los
PDF. Se sirven solo las versiones de web.

Necesita: pip install pymupdf pillow
"""
import fitz, io, json, os, sys
from PIL import Image, ImageOps

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ORIGEN = r'C:\Users\aboub\Desktop\CGE-ES\05_Eventos'
WEB = r'C:\Users\aboub\Desktop\DuoWave\WEB ASOCIACIÓN GUINEA'
DIR_EV = os.path.join(WEB, 'assets', 'img', 'eventos')
DIR_DOC = os.path.join(WEB, 'assets', 'img', 'docs')

PORTADA = (1200, 675)     # 16:9 para la tarjeta de Actualidad
LADO_MAX = 1500           # carrusel
CALIDAD = 78
ANCHO_DOC = 1300
MIN_PORTADA = 800         # por debajo de esto la foto sale borrosa de portada

# id, carpeta, documentos [(docid, archivo, fecha, fuente, titulo_es, titulo_fr)]
# omitir_fotos: para carpetas cuyas fotos estan marcadas REVISAR
EVENTOS = [
 dict(id='ministro-gaoual-barcelona', carpeta='2023-02-28_EV-2023-01_Rencontre-Ministre-Gaoual',
      docs=[('ev-carta-ministro-gaoual', '2023-02-28_CGE-ES_001-Lettre-Bienvenue-Ministre-Gaoual-Diallo_WEB.pdf',
             '2023-02-28', 'CGE-ES', 'Carta de bienvenida al ministro Ousmane Gaoual Diallo',
             "Lettre de bienvenue au ministre Ousmane Gaoual Diallo")]),
 dict(id='presidentes-europa-paris', carpeta='2023-03-19_EV-2023-02_Reunion-Presidents-CGE-Europe-Paris',
      docs=[('ev-informe-paris', '2023-03-18_CGE-France_Rapport-Rencontre-Presidents-Europe-Paris_WEB.pdf',
             '2023-03-18', 'CGE-Francia', 'Informe del encuentro de presidentes del CGE en Europa',
             "Rapport de la rencontre des présidents du CGE en Europe")]),
 dict(id='syli-national-barcelona', carpeta='2023-06-17_EV-2023-03_Match-Syli-National-Barcelona',
      docs=[('ev-comunicado-syli', '2023-06-05_Ambassade_Communique-009-Match-Syli-National-Bresil_WEB.pdf',
             '2023-06-05', 'Embajada de Guinea en Madrid', 'Comunicado 009: partido del Syli National',
             "Communiqué 009 : match du Syli National", 'Ambassade de Guinée à Madrid')]),
 dict(id='forum-diaspora-conakry', carpeta='2023-09-13_EV-2023-04_Forum-Diaspora-Conakry',
      omitir_fotos=True,
      docs=[('ev-circular-3131-forum', '2023-08-07_MAEIAGE_Lettre-Circulaire-3131-Forum-National-Diaspora_WEB.pdf',
             '2023-08-07', 'MAEIAGE', 'Carta circular 3131: Foro Nacional de la Diáspora',
             "Lettre circulaire 3131 : Forum National de la Diaspora")]),
 dict(id='embajador-framoi-mara', carpeta='2024-05-11_EV-2024-01_Rencontre-Ambassadeur-Mara',
      docs=[('ev-invitacion-embajador', '2024-05-11_CGE-ES_Communique-Invitation-Rencontre-Ambassadeur_WEB.pdf',
             '2024-05-11', 'CGE-ES', 'Convocatoria del encuentro con el embajador',
             "Communiqué d'invitation à la rencontre avec l'ambassadeur"),
            ('ev-memorandum-2024', '2024-05-11_CGE-ES_Memorandum-Mai-2024_WEB.pdf',
             '2024-05-11', 'CGE-ES', 'Memorándum entregado al embajador Framoï Mara',
             "Mémorandum remis à l'ambassadeur Framoï Mara")]),
 dict(id='embajador-comunidad-barcelona', carpeta='2024-08-11_EV-2024-02_Rencontre-Ambassadeur-Communaute-Barcelona',
      docs=[]),
 dict(id='nueva-constitucion-madrid', carpeta='2025-08-02_EV-2025-01_Presentacion-Nueva-Constitucion-Madrid',
      docs=[]),
 dict(id='jornada-presidenciales', carpeta='2025-12-28_EV-2025-02_Jornada-Electoral-Presidenciales',
      docs=[('ev-nota-105-barcelona', '2025-12-17_Ambassade_Nota-Verbal-105-Centro-Votacion-Barcelona_WEB.pdf',
             '2025-12-17', 'Embajada de Guinea en Madrid', 'Nota verbal 105: centro de votación de Barcelona',
             "Note verbale 105 : centre de vote de Barcelone", 'Ambassade de Guinée à Madrid'),
            ('ev-comunicado-020-presidenciales', '2025-12-24_Ambassade_Communique-020-Centres-Vote-Presidentielle_WEB.pdf',
             '2025-12-24', 'Embajada de Guinea en Madrid', 'Comunicado 020: centros de voto de las presidenciales',
             "Communiqué 020 : centres de vote de la présidentielle", 'Ambassade de Guinée à Madrid')]),
 dict(id='jornada-legislativas', carpeta='2026-05-31_EV-2026-01_Jornada-Electoral-Legislativas',
      docs=[('ev-nota-039-barcelona', '2026-05-21_Ambassade_Nota-Verbal-039-Centro-Votacion-Barcelona_WEB.pdf',
             '2026-05-21', 'Embajada de Guinea en Madrid', 'Nota verbal 039: centro de votación de Barcelona',
             "Note verbale 039 : centre de vote de Barcelone", 'Ambassade de Guinée à Madrid'),
            ('ev-comunicado-007-legislativas', '2026-05-28_Ambassade_Communique-007-Centres-Vote-Legislatives_WEB.pdf',
             '2026-05-28', 'Embajada de Guinea en Madrid', 'Comunicado 007: centros de voto de las legislativas',
             "Communiqué 007 : centres de vote des législatives", 'Ambassade de Guinée à Madrid'),
            ('ev-papeleta-legislativas', '2026-05-31_CENI_Specimen-Bulletin-Listes-Nationales_WEB.pdf',
             '2026-05-31', 'CENI', 'Modelo de papeleta de las listas nacionales',
             "Spécimen de bulletin des listes nationales")]),
 dict(id='68-aniversario-independencia', carpeta='2026-10-02_EV-2026-02_68e-Anniversaire-Independance',
      docs=[]),
]


def fotos_de(carpeta):
    ruta = os.path.join(ORIGEN, carpeta)
    return [f for f in sorted(os.listdir(ruta))
            if f.lower().endswith(('.jpeg', '.jpg', '.png'))]


meta = []
total_kb = 0

for ev in EVENTOS:
    destino = os.path.join(DIR_EV, ev['id'])
    os.makedirs(destino, exist_ok=True)
    kb = 0
    salidas = []
    portada = None

    if not ev.get('omitir_fotos'):
        for i, nombre in enumerate(fotos_de(ev['carpeta']), 1):
            with Image.open(os.path.join(ORIGEN, ev['carpeta'], nombre)) as im:
                im = ImageOps.exif_transpose(im).convert('RGB')
                ancho_original = im.width

                # carrusel
                g = im.copy()
                g.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
                f = os.path.join(destino, '%02d.webp' % i)
                g.save(f, 'WEBP', quality=CALIDAD, method=5)
                kb += os.path.getsize(f) / 1024
                salidas.append('%02d.webp' % i)

                # portada: la primera foto que sea lo bastante grande
                if portada is None and ancho_original >= MIN_PORTADA:
                    c = ImageOps.fit(im, PORTADA, Image.LANCZOS, centering=(0.5, 0.42))
                    f = os.path.join(destino, 'portada.webp')
                    c.save(f, 'WEBP', quality=CALIDAD, method=5)
                    kb += os.path.getsize(f) / 1024
                    portada = 'portada.webp'

    docs = []
    for d in ev['docs']:
        docid, archivo, fecha, fuente, t_es, t_fr = d[:6]
        fuente_fr = d[6] if len(d) > 6 else None
        doc = fitz.open(os.path.join(ORIGEN, ev['carpeta'], archivo))
        for n, pg in enumerate(doc, 1):
            esc = ANCHO_DOC / pg.rect.width
            pix = pg.get_pixmap(matrix=fitz.Matrix(esc, esc))
            im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
            f = os.path.join(DIR_DOC, '%s-%d.webp' % (docid, n))
            im.save(f, 'WEBP', quality=76, method=5)
            kb += os.path.getsize(f) / 1024
        docs.append(dict(id=docid, fecha=fecha, fuente=fuente, fuenteFr=fuente_fr,
                         paginas=doc.page_count, es=t_es, fr=t_fr))
        doc.close()

    meta.append(dict(id=ev['id'], portada=portada, fotos=salidas, docs=docs))
    total_kb += kb
    print('%-32s %2d fotos  %s  %d doc  %6.0f KB'
          % (ev['id'], len(salidas), 'portada' if portada else '—      ', len(docs), kb))

print('-' * 78)
print('TOTAL %.1f MB · %d fotos · %d documentos'
      % (total_kb / 1024, sum(len(m['fotos']) for m in meta),
         sum(len(m['docs']) for m in meta)))

io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'eventos_meta.json'),
        'w', encoding='utf-8').write(json.dumps(meta, ensure_ascii=False, indent=1))
