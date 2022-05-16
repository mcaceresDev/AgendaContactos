// Observer
class ContactService {
    db

    constructor(){
        this.db = window.localStorage
        
    }

    refresh(data){ 
        lista.innerHTML = " ";

        data.map((contacto)=>{
            let item = document.createElement("ul");
            item.classList.add("contacto");
                
            item.innerHTML = `<li>${contacto.nombre} ${contacto.apellido} 
            <span> 
                   <button data-ident=${contacto.id} class="material-icons btnEdita">edit</button> 
                   <button data-ident=${contacto.id} class="material-icons btnElimina">delete_outline</button> 
            </span> </li>
            <li>${contacto.numero}</li>
            <li>${contacto.correo}</li>`; 
            lista.appendChild(item);
        })

        document.querySelectorAll(".btnEdita").forEach(function(elemento){
            elemento.addEventListener("click", getContact);
        });
        document.querySelectorAll(".btnElimina").forEach(function(elemento){
            elemento.addEventListener("click", eliminarContacto);
        });
    }
    
    getContacts(){
        let contactIdList = Object.keys(this.db)
        let contacts      = []

        for (const id of contactIdList) {
            let contact = JSON.parse(this.db.getItem(id))
            contacts.push(contact)

        }
        contacts = contacts.sort(this.SortContacts)

        return contacts
    }

    SortContacts(x, y){
        if (x.nombre < y.nombre) {return -1;}
        return 0;
    }

    createContact(contact){
        this.db.setItem(contact.id, JSON.stringify(contact))
        console.log("Exito");
        console.log(contact);
        
    }

    setContact(id, contact){
        this.db.setItem(id, JSON.stringify(contact))
    }

    deleteContact(id){
        this.db.removeItem(id)
    }
}