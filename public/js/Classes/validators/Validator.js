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
        return false
    }

    canSaveContact() {
        return (this.idContacts.length >= 5) ? false : true
    }

    isContactSaved() {
        // recorremos las claves (id) de los contactos   
        for (let id of this.idContacts) {
            let contacto = JSON.parse(db.getItem(id));

            //valida si el numero o el correo ya existen 
            if (this._contacto.numero == contacto.numero || this._contacto.correo == contacto.correo ) {        
                return true;
            }
        }
        return false;
    }

}
