const http = require('http')
const host = "127.0.0.1"
const port = 80;
const server = http.createServer(function(peticion, respuesta){
    respuesta.writeHead(200,{'Content-Type':'application.txt'})
    respuesta.write('Tablas')
    respuesta.end()
});

server.listen(8080, 'localhost', function(error){
    console.log('Servidor disponible:  htttp://${host}:${port}')
})