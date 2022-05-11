
const generaId = (e) => {
    e.preventDefault();
    if (nombre.value == "" || numero.value == "" || correo.value == "") {
        let mdWarning = document.querySelector("#md0");

        mdWarning.classList.add("visible")
        setTimeout(function () {
            mdWarning.classList.remove("visible");
        }, 2000)
        return;
    }

    let valida = false;

    do {
        // generamos un numero aleatorio del 1 al 5
        let Id = Math.round(Math.random() * (5 - 1) + 1);

        // validamos que este no se encuentre en el historial de contactos
        // y que el historial no haya sobrepasado su capacidad
        if (historial.includes(Id) && historial.length < 5) {
            valida = false;
        }
        else if (historial.length < 5) {
            // si no existe en el historial lo ingresamos a este y guardamos el contacto
            historial.push(Id);
            guardarContacto(db, Id);

            valida = true;

        }
        else {
            valida = true;
            // si se ha pasado el limite de contactos permitidos enviamos el mensaje al usuario
            let mdError = document.querySelector("#md2");
            document.querySelector("#md2 .texto").innerHTML = "<h2>No puedes guardar mas contactos</h2>" +
                "<p>Has llenado la memoria, elimina algunos contactos y vuelve a intentar</p>";

            mdError.classList.add("visible")
            setTimeout(function () {
                mdError.classList.remove("visible");
            }, 2000)
        }

    } while (valida === false);

}



const guardarContacto = (db, Id) => {
    // creamos un objeto con las claves y valores que tendra el contacto
    //los valores de las claves vienen del contenido de las cajas del formulario
    let contacto = {
        id: Id,
        nombre: nombre.value,
        apellido: apellido.value,
        numero: numero.value,
        correo: correo.value
    }
    // mandamos a llamar la funcion que verifica si el contacto existe en la BD
    let verifica = false //verificaContacto(contacto);

    if (verifica === true) {
        let mdError = document.querySelector("#md2");

        document.querySelector("#md2 .texto").innerHTML = "<h2>El contacto ya existe en tu lista</h2>" +
            "<p>El número o correo ya están asociados a un contacto. Verifica y reintenta</p>";
        mdError.classList.add("visible")

        setTimeout(function () {
            document.querySelector("#md2").classList.remove("visible");
        }, 2000)

        return;
    }
    else {
        // Si el contacto es nuevo ingresamos los datos al localStorage pasando nuestro objeto a string
        db.setItem(contacto.id, JSON.stringify(contacto));

        document.querySelector("#md1").classList.add("visible")
        setTimeout(function () {
            document.querySelector("#md1").classList.remove("visible");
        }, 2000)
        document.querySelector("#formulario").reset();

        cargarContactos(db);
    }
}

//Validar si existe contacto
const existContact = (newContact) => {
    let claves = Object.keys(db);
    // recorremos las claves (id) de los contactos   
    for (clave of claves) {
        let contacto = JSON.parse(db.getItem(clave));

        //si el numero o el correo ya existen eliminamos el ultimo Id guardado en el historial
        if (contacto.numero == newContact.numero || newContact.correo === newContact.correo) {

            return true;
        }
        else {
            return false;
        }
    }
}

const inicial = () => {
    const Subject = new Contact()
    const Observer = new ContactService()

    const idList = Object.keys(db)
    contacto = {
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        telefono: txtNumero.value,
        correo: txtCorreo.value
    }    
    if (contacto.nombre == "" || contacto.telefono == "" || contacto.correo == "") {
        let mdWarning = document.querySelector("#md0");
        
        mdWarning.classList.add("visible")
        setTimeout(function () {
            mdWarning.classList.remove("visible");
        }, 2000)
        
        return;
    }
    else if (idList.length >= 5){
        console.log("Ya no puedes guardar mas");
        return
    }

    existContact(contacto)    
}

const test = (e) =>{
    e.preventDefault();
    console.log("ejecutando...");


    let idList = Object.keys(db)
    let lastId = 1

    if (idList) {
        lastId = Math.max(idList) + 1
    }

    let contacto = {
        id: lastId,
        nombre: nombre.value,
        apellido: apellido.value,
        numero: numero.value,
        correo: correo.value
    }

    const valid = new Validator(contacto)
    if (valid.emptyFields()) {
        return
    } 
    else if (valid.existContact()) {
        valid.existContact()
        return
    }
    else if (valid.maxLimitContacts()) {
        maxLimitContacts()
        return
    }
    else{
        const Subject = new Contact()
        const Observer = new ContactService()
        Observer.createContact(contacto)
        Subject.subscribe(Observer)
    }   

}
//---- Agregar Contactos (Guardarlos)
//*********************************************************** */
//*********************************************************** */

const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", test);

//*********************************************************** */
//*********************************************************** */

// let lastId = Math.max(idList)
// lastId = lastId + 1
// Observer.createContact(contacto)
// Subject.subscribe(Observer)