# -*- coding: utf-8 -*-
"""Saca el emblema oficial del PDF de la carta gráfica y escribe todos los
archivos que usa la web y los de uso general.

El PDF guarda cada imagen en dos piezas: los colores por un lado —con
NEGRO donde debería no haber nada— y la transparencia aparte, en una
máscara (SMask). Si se extrae solo la primera, el campo blanco del escudo
sale negro. Hay que juntarlas, y eso es lo que hace este script.

    python dev/extraer-logo.py

Necesita PyMuPDF y Pillow (pip install pymupdf pillow) y el PDF de la
carta en la carpeta de Descargas. Si el PDF se mueve, cambia CARTA.
"""
import io, os, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import fitz
from PIL import Image, ImageFilter

CARTA = os.path.expanduser(r'~\Downloads\Charte_logo_CGE-ES.pdf')
RAIZ  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG   = os.path.join(RAIZ, 'assets', 'img')
PNG   = os.path.join(IMG, 'png')


def pieza(doc, ancho, alto):
    """Devuelve en RGBA la pieza del tamaño pedido, juntando color y máscara."""
    for im in doc[0].get_images(full=True):
        xref, smask, w, h = im[0], im[1], im[2], im[3]
        if (w, h) != (ancho, alto):
            continue
        base = Image.open(io.BytesIO(doc.extract_image(xref)['image'])).convert('RGB')
        if not smask:
            raise SystemExit('la pieza %dx%d no trae máscara de transparencia' % (w, h))
        alfa = Image.open(io.BytesIO(doc.extract_image(smask)['image'])).convert('L')
        if alfa.size != base.size:
            alfa = alfa.resize(base.size, Image.LANCZOS)
        base.putalpha(alfa)
        return base.crop(base.getbbox())
    raise SystemExit('no encuentro la pieza %dx%d en el PDF' % (ancho, alto))


def a_lado(im, lado):
    """Reescala manteniendo la proporción, por el lado mayor."""
    if lado is None or lado >= max(im.size):
        return im
    k = lado / max(im.size)
    return im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)


def cuadrado(im, lado, fondo=None, margen=0.06):
    """El escudo es más alto que ancho; para un icono cuadrado se centra
       con aire a los lados."""
    k = (lado * (1 - 2 * margen)) / im.height
    red = im.resize((max(1, round(im.width * k)), round(im.height * k)), Image.LANCZOS)
    base = Image.new('RGBA', (lado, lado), fondo or (0, 0, 0, 0))
    base.paste(red, ((lado - red.width) // 2, (lado - red.height) // 2), red)
    return base


doc = fitz.open(CARTA)
emblema = pieza(doc, 2000, 2000)
escudo  = pieza(doc, 1325, 2000)

os.makedirs(PNG, exist_ok=True)
hechos = []

# ── Los que usa la web ────────────────────────────────────────────────
# El emblema completo va en dos tamaños a propósito:
#
#   logo-192.png  cabecera (52 px), pie (62) y tarjetas (50). Reducir el de
#                 512 para eso era descargar 164 KB y usar una décima parte.
#                 192 cubre hasta pantallas de densidad 3 y pesa 42 KB. Lleva
#                 un poco de máscara de enfoque porque al bajar de 2000 a 192
#                 el texto del aro se empasta.
#   logo.png      512 px, para la página 404 y la vista previa al compartir.
hechos.append((os.path.join(IMG, 'logo-192.png'),
               a_lado(emblema, 192).filter(
                   ImageFilter.UnsharpMask(radius=1.1, percent=55, threshold=2))))
hechos.append((os.path.join(IMG, 'logo.png'), a_lado(emblema, 512)))
# Del escudo, en la web, solo salen los iconos: la Junta quiere el emblema
# redondo en cabecera y pie. El escudo a tamaño grande está en img/png/,
# para fotos de perfil y sellos.
hechos.append((os.path.join(IMG, 'favicon.png'), cuadrado(escudo, 64)))
# El icono de iOS no admite transparencia: el sistema la rellena de negro.
hechos.append((os.path.join(IMG, 'apple-touch-icon.png'),
               cuadrado(escudo, 180, (255, 255, 255, 255), 0.10)))

# ── Los de uso general, para documentos e imprenta ────────────────────
# Sin versión de 2048: el original mide 2000 px y por encima de eso solo se
# estaría inventando detalle.
hechos.append((os.path.join(PNG, 'cge-es-logo-512.png'),  a_lado(emblema, 512)))
hechos.append((os.path.join(PNG, 'cge-es-logo-1024.png'), a_lado(emblema, 1024)))
hechos.append((os.path.join(PNG, 'cge-es-logo-2000.png'), emblema))
hechos.append((os.path.join(PNG, 'cge-es-escudo-512.png'),  a_lado(escudo, 512)))
hechos.append((os.path.join(PNG, 'cge-es-escudo-1024.png'), a_lado(escudo, 1024)))

for ruta, im in hechos:
    im.save(ruta, optimize=True)
    print('  %-34s %4dx%-4d %7.1f KB'
          % (os.path.relpath(ruta, RAIZ).replace(os.sep, '/'),
             im.width, im.height, os.path.getsize(ruta) / 1024))
