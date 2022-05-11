
//Clase creadora
class Modal {

    getInstanceModal(Key, message){
        let objType = Object.values()
        let typeClass = objType.forEach((clase)=>{
            if (clase == Key) {
                return clase
            }
        })

        return new ModalTypes.typeClass.render(message)
        // return new ModalTypes[Keys]().render()
    }
}

// Creador concreto A
class ModalSuccess {
   
    // _message

    // constructor(message){
    //     this._message = message
    // }

    render(message) {
        // response = {
        //     code: 200,
        //     msg: this._message
        // }

        return `<h2>Éxito</h2>
                <p>${message}</p>`
    }
}

// Creador concreto B
class ModalWarning {
   
    // _message

    // constructor(message){
    //     this._message = message
    // }
    
    render(message) {
        console.log("renderizando aviso")
        return `<h2>Advertencia</h2>
                <p>${message}</p>`
    }

}

// Creador concreto C
class ModalError {
    
    // _message

    // constructor(message){
    //     this._message = message
    // }

    render(message) {
        return `<h2>Error</h2>
                <p>${message}</p>`
    }

}

ModalTypes = {
    success: ModalSuccess,
    error:   ModalError,
    warning: ModalWarning
}