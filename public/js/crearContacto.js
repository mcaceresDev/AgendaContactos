
//Consulta los Elementos guardados segun su id y devuelve un id nuevo.
const generateId = () => {
    let idList = Object.keys(db)
    let lastId

    if (idList.length == 0) {
        lastId = 1
    }
    else {
        lastId = Math.max(...idList) + 1
    }
    return lastId
}

//Muestra el contenedor de modal generico y lo oculta al pasar 2 segundos
const showModal = () => {
    modalContainer.classList.add("visible")
    setTimeout(function () {
        modalContainer.classList.remove("visible");
    }, 2000)
}


const getContacts = ()=>{
    let contactIdList = Object.keys(db)
    let contacts      = []

    for (const id of contactIdList) {
        let contact = JSON.parse(db.getItem(id))
        contacts.push(contact)
    }

    return contacts
}


//Lleva la logica correspondiente para guardar contactos. Contruye diferentes objetos
// en base los eventos condicionales
const createContact = (e) => {
    e.preventDefault();

    const Subject = new Contact()
    
    let contacto = {
        id: generateId(),
        nombre: nombre.value,
        apellido: apellido.value,
        numero: numero.value,
        correo: correo.value
    }
    
    const valid = new Validator(contacto)
    const modal = new Modal
    
    if (valid.emptyFields()) {
        
        let modalSettings = {
            title: "Datos incompletos",
            message: "Campos Vacíos. Los campos Nombre, Telefono y Correo son obligatorios"
        }
        modalContainer.innerHTML = modal.getInstanceModal("warning", modalSettings)
        showModal()
        return
    }
    
    else if (valid.existContact()) {
        
        let modalSettings = {
            title: "El contacto ya existe",
            message: "El número o correo ya están asociados a un contacto. Verifica y vuelve a intentar"
        }
        modalContainer.innerHTML = modal.getInstanceModal("error", modalSettings)
        showModal()
        return
    }
    
    else if (valid.maxLimitContacts()) {
        
        let modalSettings = {
            icon: 'cancel',
            title: "Memoria llena",
            message: "Has llenado la memoria, elimina algunos contactos"
        }
        modalContainer.innerHTML = modal.getInstanceModal("error", modalSettings)
        showModal()
        return
    }
    
    else {
        const Observer = new ContactService()
        Observer.createContact(contacto)

        Subject.subscribe(Observer)
        Subject.notify(getContacts())
                
        modalContainer.innerHTML = modal.getInstanceModal("success")
        showModal()
        document.querySelector("#formulario").reset();
    }
}

//---- Agregar Contactos (Guardarlos)
const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", createContact);
