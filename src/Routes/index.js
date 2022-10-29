const http = require('http')
const server = http.createServer(function(peticion, respuesta){
    respuesta.writeHead(200,{'Content-Type':'application.txt'})
    respuesta.write('Tablas')
    respuesta.end()
});

server.listen()