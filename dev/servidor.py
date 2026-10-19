# -*- coding: utf-8 -*-
"""Servidor de pruebas para ver la web en local.

    python dev/servidor.py [puerto]

Es `python -m http.server` con una diferencia que importa: manda
`Cache-Control: no-store` en todo. Sin eso el navegador se queda con la
copia vieja de main.js o de styles.css y uno acaba mirando una página que
ya no existe, convencido de que el cambio no funciona.

No usar esto para publicar: es solo para mirar en local.
"""
import os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class SinCache(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=RAIZ, **k)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

    def log_message(self, formato, *a):
        # El log normal escupe una línea por archivo; solo interesan los fallos.
        if a and str(a[1])[0] in '45':
            sys.stderr.write('  %s %s\n' % (a[1], a[0]))


if __name__ == '__main__':
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    print('  http://localhost:%d  (sin caché)' % puerto)
    ThreadingHTTPServer(('127.0.0.1', puerto), SinCache).serve_forever()
