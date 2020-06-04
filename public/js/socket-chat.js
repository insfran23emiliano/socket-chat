var socket = io();

var params = new URLSearchParams(window.location.search);

if( !params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala  son necesario');
}

var usuario = {
    nombre : params.get('nombre'),
    sala:params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario,function(res){
        console.log("Usuarios conectados", res);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*socket.emit('crearMensaje', {
    nombre: 'Emiliano',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambio de usuarios
//cuando un usuario entra o sale del chat

socket.on('listaPersona', function(mensaje) {

    console.log('listaPersona:', mensaje);

});


socket.on('mensajePrivado',function(mensaje){
    console.log("Mensaje Privado",mensaje)
})