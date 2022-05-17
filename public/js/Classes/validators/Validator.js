class Validator {
    db
    idContacts
    _contacto

    constructor(contacto) {
        this._contacto = contacto
        this.db = window.localStorage
        this.idContacts = Object.keys(db)
    }

    emptyFields() {
        if (this._contacto.nombre == "" || this._contacto.telefono == "" || this._contacto.correo == "") {
            
            return true;
        }
    }

    maxLimitContacts() {

        if (this.idContacts.length >= 5) {
            return true
        }
    }

    existContact() {
        let claves = Object.keys(db);

        // recorremos las claves (id) de los contactos   
        for (let clave of claves) {
            let contacto = JSON.parse(db.getItem(clave));

            //si el numero o el correo ya existen eliminamos el ultimo Id guardado en el historial
            if (this._contacto.numero == contacto.numero || this._contacto.correo == contacto.correo ) {        
                return true;
            }
        }
        
        return false;
        
    }

    generateId() {
        
        let lastId

        if (this.idContacts.length == 0) {
            lastId = 1
        }
        else {
            lastId = Math.max(...idContacts) + 1
        }

        return lastId
    }

}