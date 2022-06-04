editContactId     = 0

// SINGLETON
class Environment {
    static instance
    // Elementos HTML
    contactsContainer = document.querySelector("#lista");
    db                = window.localStorage;
    formElement       = document.querySelector("#formulario")
    modalContainer    = document.querySelector("#md0");
    txtName           = document.querySelector("#nombre");
    txtLastName       = document.querySelector("#apellido");
    txtNumber         = document.querySelector("#numero");
    txtEmail          = document.querySelector("#correo");

    /*-------------------------------------*/
    // FUNCIONES GLOBALES
    /*-------------------------------------*/
    constructor(){

        if (Environment.instance) {
            return Environment.instance;
        }
        
        Environment.instance = Environment;
    }
    
    //Manipula las pestañas del menu de la aplicacion
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
        editContactId = 0
        this.formElement.reset()
        document.querySelector("#btnAgrega").classList.remove("oculto");
        document.querySelector("#btnEdita").classList.add("oculto");
    }
    
}


// CREANDO OBJETO ENIRONMENT PARA ACCEDER A VARIABLES Y METODOS BASE GLOBALES
const env = new Environment();
const { contactsContainer,
    db,
    formElement,
    modalContainer,
    txtName,
    txtLastName,
    txtNumber,
    txtEmail } = env
 
    
//LISTENERS
document.querySelectorAll(".navegacion li a").forEach((elemento) => {
    elemento.addEventListener("click", env.paginate)
});
