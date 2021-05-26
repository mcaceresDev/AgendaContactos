



















var lista = document.querySelector("#lista");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const numero = document.querySelector("#numero");
const correo = document.querySelector("#correo");

// var contadorId = 1;

const db = window.localStorage;

const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", guardaDatos = ()  => {  
    // e.preventDefault();
    let contacto = {
        id: contadorId,
        nombre: nombre.value,
        apellido: apellido.value,
        numero: numero.value,
        correo: correo.value
    }
    guardarContacto(db, contacto);
    // agregaFila(contacto);
    contadorId++;
    document.getElementById("formulario").reset();
});


const guardarContacto = (db, contacto) => {
    db.setItem(contacto.id, JSON.stringify(contacto));
    cargarContactos(db);
}

const cargarContactos = (db) => {
    let claves = Object.keys(db);
    // console.log(claves);
    for(clave of claves){
        let contacto = JSON.parse(db.getItem(clave));
        // console.log(contacto.length);
        agregaFila(contacto);

    //     let item = document.createElement("TR");

    // let idContacto = document.createElement("TD")
    // let nombreContacto = document.createElement("TD")
    // let numeroContacto = document.createElement("TD")
    // let correoContacto = document.createElement("TD")
    // let edita = document.createElement("TD");
    // let elimina = document.createElement("TD");

    // idContacto.innerHTML = contacto.id;
    // nombreContacto.innerHTML = `${contacto.nombre} ${contacto.apellido}`;
    // numeroContacto.innerHTML = contacto.numero;
    // correoContacto.innerHTML = contacto.correo;
    // edita.innerHTML = `<button class='btn-edit'><span class="material-icons">edit</span></button>`;
    // elimina.innerHTML = `<button class='btn-danger'><span class="material-icons">delete_outline</span></button>`;

    // item.appendChild(idContacto);
    // item.appendChild(nombreContacto);
    // item.appendChild(numeroContacto);
    // item.appendChild(correoContacto);
    // item.appendChild(edita);
    // item.appendChild(elimina);
    

    // lista.appendChild(item);

    }
}

 
const agregaFila = (contacto) => {
    let item = document.createElement("TR");

    let idContacto = document.createElement("TD")
    let nombreContacto = document.createElement("TD")
    let numeroContacto = document.createElement("TD")
    let correoContacto = document.createElement("TD")
    let edita = document.createElement("TD");
    let elimina = document.createElement("TD");

    idContacto.innerHTML = contacto.id;
    nombreContacto.innerHTML = `${contacto.nombre} ${contacto.apellido}`;
    numeroContacto.innerHTML = contacto.numero;
    correoContacto.innerHTML = contacto.correo;
    edita.innerHTML = `<button class='btn-edit material-icons'>edit</button>`;
    elimina.innerHTML = `<button class='btn-danger'><span class="material-icons">delete_outline</span></button>`;

    item.appendChild(idContacto);
    item.appendChild(nombreContacto);
    item.appendChild(numeroContacto);
    item.appendChild(correoContacto);
    item.appendChild(edita);
    item.appendChild(elimina);
    

    lista.appendChild(item);
};


// const editar = () => {

// };

cargarContactos(db);


const editar = (e) => {
    let nodoTD = e.target.parentNode;
    let nodoTR = nodoTD.parentNode;
    let items = nodoTR.querySelectorAll("td");
    let datos = Array.from(items);

    nombre.value = datos[1].textContent; 
    numero.value = datos[2].textContent;
    correo.value = datos[3].textContent;

    console.log(datos[1].textContent);
    // nodoTR.querySelectorAll("td").forEach(function(elemento){
    //     console.log(elemento.textContent); 
    // });
}

var btnEdita = document.querySelector("button.btn-edit");
btnEdita.addEventListener("click", editar);



