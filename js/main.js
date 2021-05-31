
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
    let btnBorrar = document.querySelector("#md3  .btnBorrar").addEventListener("click", () => {
        db.removeItem(contacto);
        // historial.splice(contacto - 1, 1);
        console.log(contacto - 1);
        cargarContactos(db);
        modalElim.classList.remove("visible");
    }); 
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












