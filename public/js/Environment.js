// SINGLETON
class Environment {

    // Elementos HTML
    contactsContainer = document.querySelector("#lista");
    db                = window.localStorage;
    formElement       = document.querySelector("#formulario")
    modalContainer    = document.querySelector("#md0");
    txtName           = document.querySelector("#nombre");
    txtLastName       = document.querySelector("#apellido");
    txtNumber         = document.querySelector("#numero");
    txtEmail          = document.querySelector("#correo");
    editContactId     = 0

    /*-------------------------------------*/
    // FUNCIONES GLOBALES
    /*-------------------------------------*/
    paginate = (e) => {
        e.preventDefault();
    
        let page = e.target.getAttribute("href");
        let tab = e.target.parentNode;

        document.querySelectorAll(".contenido-pestanas .bloque")
            .forEach(pageElement => pageElement.classList.remove("activo"));
            
        document.querySelector(page).classList.add("activo");
    
        document.querySelectorAll(".navegacion li").forEach(tabElement => tabElement.classList.remove("active"));
    
        tab.classList.add("active");
        this.resetElements()
    }
    
    
    resetElements = () => {
        this.editContactId = 0
        document.querySelector("#formulario").reset()
        document.querySelector("#btnAgrega").classList.remove("oculto");
        document.querySelector("#btnEdita").classList.add("oculto");
    }
    
}


// CREANDO OBJETO ENIRONMENT PARA ACCEDER A VARIABLES Y METODOS BASE GLOBALES
const env = new Environment()
const { contactsContainer,
    db,
    formElement,
    modalContainer,
    txtName,
    txtLastName,
    txtNumber,
    txtEmail,
    editContactId } = env
 
    
//LISTENERS
document.querySelectorAll(".navegacion li a").forEach((elemento) => {
    elemento.addEventListener("click", env.paginate)
});
