// Observer
class ContactService {
    db

    constructor(){
        this.db = window.localStorage
    }
    
    getContacts(){
        contactIdList = Object.keys(db)
        contacts      = []

        for (const id of contactIdList) {
            let contact = JSON.parse(this.db.getItem(id))
            contacts.push(contact)
        }

        return contacts
    }

    createContact(contact){
        this.db.setItem(contact.Id, JSON.stringify(contact))
        console.log("Exito");
    }

    setContact(id, contact){
        this.db.setItem(id, JSON.stringify(contact))
    }

    deleteContact(id){
        this.db.removeItem(id)
    }
}