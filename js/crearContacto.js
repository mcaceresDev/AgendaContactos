//****************************** */
var historial = [];
//***************************** */
const generaId = (e) => {
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
        
            let mdError = document.querySelector("#md2");
            document.querySelector("#md2 .texto").innerHTML = "<h2>No puedes guardar mas contactos</h2>" + 
            "<p>Has llenado la memoria, elimina algunos contactos y vuelve a intentar</p>";
        
            mdError.classList.add("visible")
            setTimeout(function(){
                mdError.classList.remove("visible");
            },2000)
        }

    } while (valida === false);
    
}

//---- Agregar Contactos (Guardarlos)

const btnAgrega = document.querySelector("#btnAgrega");
btnAgrega.addEventListener("click", generaId);


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
        let mdError = document.querySelector("#md2");
        
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