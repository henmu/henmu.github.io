import sys
from http.server import SimpleHTTPRequestHandler, HTTPServer

class GzipRequestHandler(SimpleHTTPRequestHandler):
    '''HTTPRequestHandler for gzip files'''

    def end_headers(self):
        '''Set Content-Encoding: gzip for gzipped files'''
        if self.path.endswith('.gz'):
            self.send_header('Content-Encoding', 'gzip')
        super().end_headers()

    def do_GET(self):
        '''Serve gzipped files with the correct Content-Type and Content-Encoding headers'''
        path = self.translate_path(self.path)
        
        # Serve .js.gz as application/javascript
        if path.endswith('.js.gz'):
            self.path = path
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript')
            self.end_headers()
            with open(path, 'rb') as f:
                self.wfile.write(f.read())
        
        # Serve .wasm.gz as application/wasm
        elif path.endswith('.wasm.gz'):
            self.path = path
            self.send_response(200)
            self.send_header('Content-Type', 'application/wasm')
            self.end_headers()
            with open(path, 'rb') as f:
                self.wfile.write(f.read())

        # Serve other .gz files with inferred Content-Type
        elif path.endswith('.gz'):
            self.path = path
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(path[:-3]))  # Guess the type without .gz
            self.end_headers()
            with open(path, 'rb') as f:
                self.wfile.write(f.read())

        else:
            super().do_GET()

def serve(port: int):
    '''Run a local HTTP server'''
    httpd = HTTPServer(('localhost', port), GzipRequestHandler)
    print(f"Serving at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f'usage: {sys.argv[0]} [PORT]')
        sys.exit(1)
    
    try:
        port = int(sys.argv[1])
        serve(port)
    except Exception as e:
        print('Error:', e)
