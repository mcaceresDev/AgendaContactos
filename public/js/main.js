const Observer = new ContactService()
Observer.refresh(Observer.getContacts())

let editContactId = 0
 
/*--------------------------------------*/ 
// ELIMINACION DE CONTACTOS
/*--------------------------------------*/
function eliminarContacto(e){
    e.stopPropagation();
    let btnGroup = this.parentNode;
    let li = btnGroup.parentNode;
    let contacto = parseInt(li.parentNode.dataset.ident);
        
    let modalElim = document.querySelector("#md3");
    modalElim.classList.add("visible");
    //Agregamos el listener al boton de borrar del modal para que ejecute la funcion de eliminacion
    let btnBorrar = document.querySelector("#md3 .btnBorrar").addEventListener("click", () => {
        db.removeItem(contacto);
        let index = contacto-1;
        
        historial.splice(historial.indexOf(index), 1);
        // cargarContactos(db);
        modalElim.classList.remove("visible");
        location.reload();
    }); 
    //agregamos el listener para cerrar el modal en caso de no querer borrar el contacto
    let btnCancelar = document.querySelector("#md3 .btnCancelar").addEventListener("click", () => modalElim.classList.remove("visible"));
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
    Subject.notify(getContacts())

    document.querySelector("#btnAgrega").classList.remove("oculto");
    document.querySelector("#btnEdita").classList.add("oculto");

    let modalSettings = {
        title: "Contacto actualizado",
        message: "La información del contacto ha sido actualizada"
    }
    modalContainer.innerHTML = modal.getInstanceModal("success", modalSettings)
    showModal()
}

/*--------------------------------------*/ 
//**********  BUSQUEDA DINAMICA DE CONTACTOS ****************/
/*--------------------------------------*/

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

