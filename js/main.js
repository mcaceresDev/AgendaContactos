var lista = document.querySelector("#lista");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const numero = document.querySelector("#numero");
const correo = document.querySelector("#correo");

const db = window.localStorage;

//Menu de pestañas
const despliegaPestana = (e) =>{
    e.preventDefault();
    
    let objetivo = e.target.getAttribute("href");document.querySelectorAll(".contenido-pestanas .bloque")
    .forEach( (elemento) => {
      elemento.classList.remove("activo");
    });
    document.querySelector(objetivo).classList.add("activo");
    
    //-------------------------------------------------------

    let pestana = e.target.parentNode;
    document.querySelectorAll(".navegacion li").forEach( (elemento) => {
        elemento.classList.remove("active");
    });

    pestana.classList.add("active");
}
//Listeners
document.querySelectorAll(".navegacion li a").forEach( (elemento) => {
    elemento.addEventListener("click", despliegaPestana)
});



//****************************** */

var historial = [];
//***************************** */
const recogeDatos = (e) => {
    e.preventDefault();

    let valida = false;
    
    do {
        let Id = Math.round(Math.random() * (5 - 1) + 1);

        if (historial.includes(Id) && historial.length < 5) {
            valida = false;
        }       
        else if(historial.length < 5 ) {
            
            historial.push(Id);
            guardarContacto(db, Id);

            valida = true;
            
        }
        else{
            valida = true;
        
            document.querySelector("#md2").classList.add("visible")
            setTimeout(function(){
                document.querySelector("#md2").classList.remove("visible");
            },2000)
        }

    } while (valida === false);
    
}

//---- Agregar Contactos (Guardarlos)

const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", recogeDatos);


const guardarContacto = (db, Id) => {
    let contacto = {
            id: Id,
            nombre: nombre.value,
            apellido: apellido.value,
            numero: numero.value,
            correo: correo.value
        }
    
    let verifica = verificaContacto(contacto);

    if (verifica === true) {
        let mdError =document.querySelector("#md2");
        
        document.querySelector("#md2 .texto").innerHTML = "<h2>El contacto ya existe en tu lista</h2>" + 
        "<p>El número o correo ya están asociados a un contacto. Verifica y reintenta</p>";
        mdError.classList.add("visible")
        
        setTimeout(function(){
            document.querySelector("#md2").classList.remove("visible");
        },2000)
        
        return;
    }
    else{
        db.setItem(contacto.id, JSON.stringify(contacto));
        
        document.querySelector("#md1").classList.add("visible")
            setTimeout(function(){
                document.querySelector("#md1").classList.remove("visible");
            },2000)
            document.querySelector("#formulario").reset();

        cargarContactos(db);
    }
}

//Validar si existe contacto
function verificaContacto (valores){
    let claves = Object.keys(db);
    
    for(clave of claves){
        let contacto = JSON.parse(db.getItem(clave));
        
        if (contacto.numero == valores.numero || contacto.correo === valores.correo) {
               
            historial.pop();
            return true;
        }
        else{
            return false;
        }
        
    }
}

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
 

function eliminarContacto(e){
    e.stopPropagation();
    let btnGroup = this.parentNode;
    let li = btnGroup.parentNode;
    let contacto = li.parentNode.dataset.ident;
        
    let modalElim = document.querySelector("#md3");
    modalElim.classList.add("visible");
    let btnBorrar = document.querySelector("#md3  .btnBorrar").addEventListener("click", () => {
        db.removeItem(contacto);
        historial.splice(0, contacto - 1);
        cargarContactos(db);
        modalElim.classList.remove("visible");
    }); 
    let btnCancelar = document.querySelector("#md3 .btnCancelar").addEventListener("click", () => modalElim.classList.remove("visible"));

}


function editarContacto(e){
    e.stopPropagation();

    let btnGroup = this.parentNode;
    let li = btnGroup.parentNode;
    let id = parseInt(li.parentNode.dataset.ident);
    
    let contacto = JSON.parse(db.getItem(id));
    
    let Nombres = document.querySelector(".frmEdicion .nombreC");
    let Apellido = document.querySelector(".frmEdicion .apellidoC");
    let Numero = document.querySelector(".frmEdicion .numeroC");
    let Email = document.querySelector(".frmEdicion .emailC");

    Nombres.value = contacto.nombre;
    Apellido.value = contacto.apellido;
    Numero.value = contacto.numero;
    Email.value = contacto.correo;

    document.querySelector("#md4").classList.add("visible");    
    edita(db, id)  
}


const edita = (db, Id) => {
    let Nombres = document.querySelector(".frmEdicion .nombreC");
    let Apellido = document.querySelector(".frmEdicion .apellidoC");
    let Numero = document.querySelector(".frmEdicion .numeroC");
    let Email = document.querySelector(".frmEdicion .emailC");

    
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
            cargarContactos(db);
    });
}

