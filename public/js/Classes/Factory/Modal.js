
//Clase creadora
class Modal {

    getInstanceModal(Key, message) {
        let objType = Object.values(ModalTypes)
        let typeClass

        objType.forEach((clase) => {
            if (clase == ModalTypes[Key]) {
                typeClass = new clase()
            }
        })

        return typeClass.render(message)
    }
}

// Creador concreto A
class ModalSuccess {

    render(message) {
        return `<div class="success animate">
                    <span class="material-icons">
                        check_circle
                    </span>
                    <div class="texto">
                        <h2>Contacto Agregado</h2>
                        <p>${message}</p>
                    </div>      
                </div>`
    }
}

// Creador concreto B
class ModalWarning {

    render(message) {
        console.log("renderizando aviso")

        return `<div class="warning animate">
                <span class="material-icons">
                    error_outline
                </span>
                <div class="texto">
                    <h2>Datos Incompletos</h2>
                    <p>${message}</p>
                </div>
            </div>`
    }
}

// Creador concreto C
class ModalError {

    render(message) {
        return `<div class="error animate">
                    <span class="material-icons">
                        error
                    </span>
                    <div class="texto">
                        <h2>No puedes guardar mas contactos</h2>
                        <p>${message}</p>
                    </div>      
                </div>`
    }

}

ModalTypes = {
    success: ModalSuccess,
    error: ModalError,
    warning: ModalWarning
}