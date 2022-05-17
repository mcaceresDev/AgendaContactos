const Observer = new ContactService()
Observer.refresh(Observer.getContacts())

let editContactId = 0


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
    const modal = new Modal()
    
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
        Subject.notify(Observer.getContacts())
                
        modalContainer.innerHTML = modal.getInstanceModal("success")
        showModal()
        document.querySelector("#formulario").reset();
    }
}

//---- Agregar Contactos (Guardarlos)
const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", createContact);

 
/*--------------------------------------*/ 
// ELIMINACION DE CONTACTOS
/*--------------------------------------*/
function eliminarContacto(e){
    e.stopPropagation();
    let contactId = parseInt(e.target.dataset.ident);

    const modal = new Modal()
    modalContainer.innerHTML = modal.getInstanceModal("confirm")
    modalContainer.classList.add("visible")

    //Agregamos el listener al boton de borrar del modal para que ejecute la funcion de eliminacion
    let btnBorrar = document.querySelector(".btnBorrar").addEventListener("click", () => {
        db.removeItem(contactId);
        modalContainer.classList.remove("visible");

        const Subject = new Contact()
        const Observer = new ContactService()
        Subject.subscribe(Observer)
        Subject.notify(getContacts())

        let modalSettings = {
            title: "Operación Exitosa",
            message: "El contacto ha sido eliminado"
        }
        modalContainer.innerHTML = modal.getInstanceModal("success", modalSettings)
        showModal()
    }); 
    //agregamos el listener para cerrar el modal en caso de no querer borrar el contacto
    let btnCancelar = document.querySelector("#md3 .btnCancelar")
    btnCancelar.addEventListener("click", () => modalContainer.classList.remove("visible"));
}

/*--------------------------------------*/ 
// EDICION DE CONTACTOS
/*--------------------------------------*/
function getContact(e){
    e.stopPropagation();
    let id = parseInt(e.target.dataset.ident);
    let contacto = JSON.parse(db.getItem(id))
    
    nombre.value   = contacto.nombre;
    apellido.value = contacto.apellido;
    numero.value   = contacto.numero;
    correo.value   = contacto.correo;

    document.querySelector("#btnAgrega").classList.add("oculto");
    document.querySelector("#btnEdita").classList.remove("oculto");
    document.querySelector("#btnEdita").addEventListener("click", editarContacto)
    
    //Redireccionando al formulario para editar
    document.querySelector("#bloque-list").classList.remove("activo")
    document.querySelector("#bloque-form").classList.add("activo")
    document.querySelector("#listado-items").parentNode.classList.remove("active")
    document.querySelector("#pestana-form").parentNode.classList.add("active")
    
    editContactId = id
    
}


const editarContacto = (e) => {
    e.preventDefault()
    const modal = new Modal
    let newContact = {
        id: editContactId,
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        numero: txtNumero.value,
        correo: txtCorreo.value
    }

    const Subject = new Contact()
    const Observer = new ContactService()
    
    Observer.createContact(newContact)
    Subject.subscribe(Observer)
    Subject.notify(Observer.getContacts())

    document.querySelector("#btnAgrega").classList.remove("oculto");
    document.querySelector("#btnEdita").classList.add("oculto");

    let modalSettings = {
        title: "Contacto actualizado",
        message: "La información del contacto ha sido actualizada"
    }
    modalContainer.innerHTML = modal.getInstanceModal("success", modalSettings)
    showModal()
}

/*-----------------------------------------------------------*/ 
/************** BUSQUEDA DINAMICA DE CONTACTOS **************/
/*---------------------------------------------------------*/

document.getElementById("searchBox").addEventListener("keyup", buscar);

function buscar(e) {
        
    let texto = e.target.value.toLowerCase();
    
    document.querySelectorAll('#lista ul').forEach(function(item){
        
        if(item.textContent.toLowerCase().includes(texto)){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    });
    
}

