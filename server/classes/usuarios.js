class Usuarios {
    constructor(){
        this.personas=[];
    }

    agregarPersona(id,nombre,sala){
        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona( id ){
        //filter devuelve un array - //siempre me devuelva la primera que encuentre
        console.log('total personas ', this.personas);
        let persona = this.personas.filter(  persona =>   persona.id == id );

        return persona[0];
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id); 

        this.personas = this.personas.filter(persona=> persona.id != id);//devuelve un array con las persona que estan en el chat 
        return personaBorrada;

    }
}

module.exports = {
    Usuarios
}