const crearMensaje = ( nombre, mensaje ) => {
    console.log("crearMensaje =>>>>>>",mensaje)
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

module.exports = {
    crearMensaje 
}