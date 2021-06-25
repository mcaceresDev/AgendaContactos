/*-------------------------------------*/
// VARIABLES GLOBALES
/*-------------------------------------*/
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
