# -*- coding: utf-8 -*-
"""Convierte los diez documentos de origen a imagenes por pagina.

El PDF NO se copia al sitio: solo se publican las imagenes. Asi se puede
mirar el documento sin que el archivo este ahi para descargarlo. No es
inviolable —cualquiera puede guardar una imagen con el boton derecho— pero
el documento en si no se sirve.
"""
import fitz, io, os, sys, json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ORIGEN = r'C:\Users\aboub\Desktop\CGE-ES'
DESTINO = r'C:\Users\aboub\Desktop\DuoWave\WEB ASOCIACIÓN GUINEA\assets\img\docs'
ANCHO, CALIDAD = 1300, 76

# (id, archivo, fecha, fuente, titulo_es, titulo_fr)
DOCS = [
 ('tdr-assises-nationales',
  r'04_Actualidad\2022-03-00_MATD_Termes-de-Reference-Assises-Nationales_WEB.pdf',
  '2022-03', 'MATD',
  'Términos de referencia de las Asambleas Nacionales',
  'Termes de référence des Assises Nationales'),
 ('tdr-renovacion-mesas',
  r'04_Actualidad\2022-06-00_MAEIAGE_Termes-de-Reference-Renouvellement-Bureaux-CGE_WEB.pdf',
  '2022-06', 'MAEIAGE',
  'Términos de referencia para renovar las mesas del CGE',
  'Termes de référence pour le renouvellement des bureaux du CGE'),
 ('lettre-circulaire-1875',
  r'04_Actualidad\2022-08-05_MAEIAGE_Lettre-Circulaire-1875-Renouvellement-Bureaux-CGE_WEB.pdf',
  '2022-08-05', 'MAEIAGE',
  'Carta circular 001875: renovación de las mesas del CGE',
  'Lettre circulaire 001875 : renouvellement des bureaux du CGE'),
 ('comunicado-012',
  r'04_Actualidad\2022-08-00_Ambassade_Communique-012-Visioconference-6aout2022_WEB.pdf',
  '2022-08', 'Embajada de Guinea en Madrid',
  'Comunicado 012: videoconferencia del 6 de agosto de 2022',
  'Communiqué 012 : visioconférence du 6 août 2022'),
 ('comunicado-013',
  r'04_Actualidad\2022-08-09_Ambassade_Communique-013-Prorogation-Liste-Bureau_WEB.pdf',
  '2022-08-09', 'Embajada de Guinea en Madrid',
  'Comunicado 013: prórroga del plazo para presentar listas',
  'Communiqué 013 : prorogation du délai de dépôt des listes'),
 ('nota-014',
  r'04_Actualidad\2022-08-09_Ambassade_Note-014-Criteres-Eligibilite_WEB.pdf',
  '2022-08-09', 'Embajada de Guinea en Madrid',
  'Nota 014: criterios de elegibilidad',
  'Note 014 : critères d\'éligibilité'),
 ('comunicado-017',
  r'04_Actualidad\2022-09-19_Ambassade_Communique-017-Election-Bureau-CGE_WEB.pdf',
  '2022-09-19', 'Embajada de Guinea en Madrid',
  'Comunicado 017: elección de la mesa del CGE',
  'Communiqué 017 : élection du bureau du CGE'),
 ('acta-congreso-constitutivo',
  r'02_El_Consejo\2022-10-08_CGE-ES_PV-Congres-Constitutif_WEB.pdf',
  '2022-10-08', 'CGE-ES',
  'Acta del congreso constitutivo del CGE-ES',
  'Procès-verbal du congrès constitutif du CGE-ES'),
 ('nota-045-acuse-acta',
  r'04_Actualidad\2022-10-25_Ambassade_Note-045-Accuse-Reception-PV-Congres_WEB.pdf',
  '2022-10-25', 'Embajada de Guinea en Madrid',
  'Nota 045: acuse de recibo del acta del congreso',
  'Note 045 : accusé de réception du procès-verbal du congrès'),
 ('convenio-cge-europa',
  r'02_El_Consejo\2023-08-25_CGE-Europe_Convention-Entente-Coordination_WEB.pdf',
  '2023-08-25', 'CGE-Europa',
  'Convenio de entendimiento y coordinación del CGE en Europa',
  'Convention d\'entente et de coordination du CGE en Europe'),
]

os.makedirs(DESTINO, exist_ok=True)
meta, total_kb = [], 0

for ident, archivo, fecha, fuente, t_es, t_fr in DOCS:
    ruta = os.path.join(ORIGEN, archivo)
    doc = fitz.open(ruta)
    kb = 0
    for i, pg in enumerate(doc, 1):
        esc = ANCHO / pg.rect.width
        pix = pg.get_pixmap(matrix=fitz.Matrix(esc, esc))
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        salida = os.path.join(DESTINO, '%s-%d.webp' % (ident, i))
        im.save(salida, 'WEBP', quality=CALIDAD, method=5)
        kb += os.path.getsize(salida) / 1024
    meta.append({'id': ident, 'fecha': fecha, 'fuente': fuente,
                 'paginas': doc.page_count, 'es': t_es, 'fr': t_fr})
    total_kb += kb
    print('%-28s %2d pág  %6.0f KB' % (ident, doc.page_count, kb))
    doc.close()

print('-' * 52)
print('TOTAL: %d documentos, %d páginas, %.1f MB'
      % (len(meta), sum(m['paginas'] for m in meta), total_kb / 1024))

io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'docs_meta.json'),
        'w', encoding='utf-8').write(json.dumps(meta, ensure_ascii=False, indent=1))
