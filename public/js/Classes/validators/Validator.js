class Validator {
    db
    idList
    _contacto

    constructor(contacto) {
        this._contacto = contacto
        this.db = window.localStorage
        this.idList = Object.keys(db)
    }

    emptyFields() {
        if (this._contacto.nombre == "" || this._contacto.telefono == "" || this._contacto.correo == "") {
            // let mdWarning = document.querySelector("#md0");

            // mdWarning.classList.add("visible")
            // setTimeout(function () {
            //     mdWarning.classList.remove("visible");
            // }, 2000)
            console.log("Campos vacíos");
            let mensaje = "Campos vacíos"
            return true;
        }
    }

    maxLimitContacts() {

        if (this.idList.length >= 5) {
            console.log("Ya no puedes guardar mas");
            let mensaje = "Ya no puedes guardar mas"
            return mensaje
        }
    }

    existContact () {
        let claves = Object.keys(db);
        // recorremos las claves (id) de los contactos   
        for (clave of claves) {
            let contacto = JSON.parse(db.getItem(clave));
    
            //si el numero o el correo ya existen eliminamos el ultimo Id guardado en el historial
            if (contacto.numero == this._contacto.numero || contacto.correo === this._contacto.correo) {  
                console.log("el contacto ya existe")
                let mensaje = "el contacto ya existe"
                return mensaje;
            }
            else {
                return false;
            }
        }
    }

    generaId () {
        let idList = Object.keys(db)
        if (idList[0] !== undefined) {
            
        } else {
            
        }
    }

}