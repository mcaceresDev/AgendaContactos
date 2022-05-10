
// Generar Listado de Contactos Guardados
const cargarContactos =  (db) => {
    let claves = Object.keys(db);
    lista.innerHTML = " ";
    
    for(clave of claves){
        let contacto = JSON.parse(db.getItem(clave));
        
        let item = document.createElement("ul");
        item.classList.add("contacto");
        item.setAttribute("data-ident", contacto.id);

        item.innerHTML = `<li>${contacto.nombre} ${contacto.apellido} 
        <span> 
               <button class="material-icons btnEdita">edit</button> 
               <button class="material-icons btnElimina">delete_outline</button> 
        </span> </li>
        <li>${contacto.numero}</li>
        <li>${contacto.correo}</li>`; 
        lista.appendChild(item);
        
    }

    document.querySelectorAll(".contacto").forEach(function(contact){
        contact.addEventListener("click", function() {
            this.classList.toggle("completo")
        })
    });
    document.querySelectorAll(".btnEdita").forEach(function(elemento){
        elemento.addEventListener("click", editarContacto);
    });
    document.querySelectorAll(".btnElimina").forEach(function(elemento){
        elemento.addEventListener("click", eliminarContacto);
    });
}

cargarContactos(db);
 
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
function editarContacto(e){
    e.stopPropagation();

    let btnGroup = this.parentNode;
    let li = btnGroup.parentNode;
    let id = parseInt(li.parentNode.dataset.ident);
    
    let contacto = JSON.parse(db.getItem(id));
    
    let Nombres = document.querySelector("#nombreC");
    let Apellido = document.querySelector("#apellidoC");
    let Numero = document.querySelector("#numeroC");
    let Email = document.querySelector("#emailC");

    Nombres.value = contacto.nombre;
    Apellido.value = contacto.apellido;
    Numero.value = contacto.numero;
    Email.value = contacto.correo;

    document.querySelector("#md4").classList.add("visible");    
    edita(db, id)  

}


const edita = (db, Id) => {
    let Nombres = document.querySelector("#nombreC");
    let Apellido = document.querySelector("#apellidoC");
    let Numero = document.querySelector("#numeroC");
    let Email = document.querySelector("#emailC");

    
    document.querySelector("#reemplaza").addEventListener("click", function(e){
            e.preventDefault();

            let contacto = {
                id: Id,
                nombre: Nombres.value,
                apellido: Apellido.value,
                numero: Numero.value,
                correo: Email.value
            }

            db.setItem(contacto.id, JSON.stringify(contacto));
            document.querySelector("#md4").classList.remove("visible");
            location.reload();
            // cargarContactos(db);
    });
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

// METODOS NUEVOS
const inicial = () => {
    const Subject = new Contact()

    contacto = {
        nombre: "Manuel",
        apellido: "Caceres",
        telefono: 84569712,
        correo: "algo@algo.com"
    }

    const Observer = new ContactService()
    Observer.createContact(contacto)
    
    Subject.subscribe(Observer)
    // const idList = Object.keys(db)
    // let lastId   = Math.max(idList)

    // if (lastId >= 5 ) {
    //     console.log("Ya no puedes guardar mas");
    // } 
    // else{
    //     lastId = lastId + 1
    //     console.log(`Se crea el contacto con id = ${lastId}`);
    // }
}

inicial()










