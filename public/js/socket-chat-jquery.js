var params = new URLSearchParams(window.location.search);


//refencias de jquery
var divUsuario = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


var nombre =params.get('nombre');
var sala = params.get('sala');
//funciones para renderizar usuarios
function renderizarUsuarios( personas ){
    console.log('personas: ',personas);

    var html = '';

    html +='<li>'
    html +=    '<a href="javascript:void(0)" class="active"> Chat de <span> '+params.get('sala')+'</span></a>'
    html += '</li>'
    
    for (let i = 0; i < personas.length; i++) {
        html +='<li>'
        html +='<a data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[i].nombre+ '<small class="text-success">online</small></span></a>'
        html +='</li>'
    }

    divUsuario.html(html);
}

function renderizarMensaje(mensaje, yo){
    var html='';
    console.log('123 ',mensaje)

    var fecha = new Date(mensaje.fecha);

    var hora = fecha.getHours() +':'+ fecha.getMinutes();
    var adminClass = 'info';

    if(mensaje.nombre== 'Administrador'){
        adminClass = 'danger';
    }
    if(yo){
        html+='<li class="reverse">'
        html+=' <div class="chat-content">'
        html+='<h5>'+mensaje.nombre+'</h5>'
        html+='  <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>'
        html+='</div>'
        html+=' <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html+=' <div class="chat-time">'+hora+'</div>'
        html+='</li>'
    }else{
        html+='<li class="animated fadeIn">'

        if(mensaje.nombre !== 'Administrador'){
            html+='<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }
        html+='<div class="chat-content">'
        html+=' <h5>'+mensaje.nombre+'</h5>'
        html+='<div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>'
        html+='</div>'
        html+='<div class="chat-time">'+hora+'</div>'
        html+='</li>'
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listener
divUsuario.on('click','a',function(){
     var id =$(this).data('id');

     if(id)   console.log('id',id);
});

formEnviar.on('submit', function(e){
    e.preventDefault();
    
    console.log(txtMensaje.val())//trim saca los espacio de tras y adelante
    if(!txtMensaje.val().trim().length){
        return
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre:nombre,
        mensaje: txtMensaje.val()
    }, function(resp) {
        txtMensaje.val('').focus();
        renderizarMensaje(resp,true);
        scrollBottom();
    });
  

})