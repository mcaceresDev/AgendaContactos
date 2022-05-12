// Observer
class ContactService {
    db
    fnCargaContactos

    constructor(fn){
        this.db = window.localStorage
        this.fnCargaContactos = fn
    }

    refresh(data){
        lista.innerHTML = " ";

        data.map((contacto)=>{
            let item = document.createElement("ul");
            item.classList.add("contacto");
    
            item.innerHTML = `<li>${contacto.nombre} ${contacto.apellido} 
            <span> 
                   <button class="material-icons btnEdita">edit</button> 
                   <button class="material-icons btnElimina">delete_outline</button> 
            </span> </li>
            <li>${contacto.numero}</li>
            <li>${contacto.correo}</li>`; 
            lista.appendChild(item);
        })
    }
    
    getContacts(){
        let contactIdList = Object.keys(this.db)
        let contacts      = []

        for (const id of contactIdList) {
            let contact = JSON.parse(this.db.getItem(id))
            contacts.push(contact)
        }

        return contacts
    }

    createContact(contact){
        this.db.setItem(contact.id, JSON.stringify(contact))
        console.log("Exito");
    }

    setContact(id, contact){
        this.db.setItem(id, JSON.stringify(contact))
    }

    deleteContact(id){
        this.db.removeItem(id)
    }
}