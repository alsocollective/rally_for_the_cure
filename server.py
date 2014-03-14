import SimpleHTTPServer
import SocketServer


class MyRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = MyRequestHandler
server = SocketServer.TCPServer(('127.0.0.1', 8080), Handler)
try:
	server.serve_forever()
except KeyboardInterrupt:
	print "I tried to exit"
	exit()
except:
	print "something else went wrong"
	exit()