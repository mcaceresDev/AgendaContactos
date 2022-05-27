class Validator {
    idContacts
    _contacto

    constructor(contacto) {
        this._contacto = contacto
        this.idContacts = Object.keys(db)
    }

    hasEmptyFields() {
        if (this._contacto.nombre == "" || this._contacto.telefono == "" || this._contacto.correo == "") {
            return true;
        }
    }

    canSaveContact() {
        if (this.idContacts.length >= 5) return false
    }

    isContactSaved() {
        let contactsIds = Object.keys(db);
        // recorremos las claves (id) de los contactos   
        for (let id of contactsIds) {
            let contacto = JSON.parse(db.getItem(id));

            //si el numero o el correo ya existen eliminamos el ultimo Id guardado en el historial
            if (this._contacto.numero == contacto.numero || this._contacto.correo == contacto.correo ) {        
                return true;
            }
        }
        return false;
    }

    generateId() {

        let lastId = this.idContacts.length == 0 ? 1 : Math.max(...this.idContacts) + 1
        return lastId
    }

}
