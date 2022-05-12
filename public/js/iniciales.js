/*-------------------------------------*/
// VARIABLES GLOBALES
/*-------------------------------------*/
const lista = document.querySelector("#lista");
const txtNombre = document.querySelector("#nombre");
const txtApellido = document.querySelector("#apellido");
const txtNumero = document.querySelector("#numero");
const txtCorreo = document.querySelector("#correo");
const formulario = document.querySelector("#formulario")
const modalContainer = document.querySelector("#md0");
const db = window.localStorage;

//Menu de pestañas
const despliegaPestana = (e) =>{
    e.preventDefault();
    
    let objetivo = e.target.getAttribute("href");
    document.querySelectorAll(".contenido-pestanas .bloque")
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
