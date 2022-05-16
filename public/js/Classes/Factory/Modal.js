// {
//     icon: 'error',
//     title: 'Oops...',
//     text: 'Something went wrong!',
//     footer: '<a href="">Why do I have this issue?</a>'
// }

//Clase creadora
class Modal {

    getInstanceModal(Key, settingObject) {
        let objType = Object.values(ModalTypes)
        let typeClass

        objType.forEach((clase) => {
            if (clase == ModalTypes[Key]) {
                typeClass = new clase()
            }
        })

        return typeClass.render(settingObject)
    }
}

// Creador concreto A
class ModalSuccess {

    objOptions = {
    icon: 'check_circle',
    title: 'Contacto Agregado',
    message: 'Ahora puedes buscarlo en tu lista de contactos',
    }

    render(objOptions) {
        return `<div class="success animate">
                    <span class="material-icons">
                        ${objOptions == undefined || objOptions.icon == null ? this.objOptions.icon : objOptions.icon}
                    </span>
                    <div class="texto">
                        
                        <h2>${objOptions == undefined ? this.objOptions.title : objOptions.title}</h2>
                        <p>${objOptions == undefined ? this.objOptions.message : objOptions.message}</p>
                    </div>      
                </div>`
    }
}

// Creador concreto B
class ModalWarning {

    objOptions = {
        icon: 'error_outline',
        title: 'Error',
        message: 'Ha ocurrido un error, intentalo mas tarde',
        }
    
        render(objOptions) {
            return `<div class="warning animate">
                        <span class="material-icons">
                            ${objOptions == undefined || objOptions.icon == null ? this.objOptions.icon : objOptions.icon}
                        </span>
                        <div class="texto">
                            
                            <h2>${objOptions == undefined ? this.objOptions.title : objOptions.title}</h2>
                            <p>${objOptions == undefined ? this.objOptions.message : objOptions.message}</p>
                        </div>      
                    </div>`
        }

}

// Creador concreto C
class ModalError {

    objOptions = {
        icon: 'error',
        title: 'Error',
        message: 'Ha ocurrido un error. Vuelve a intentarlo luego',
        }
    
        render(objOptions) {
            return `<div class="error animate">
                        <span class="material-icons">
                            ${objOptions == undefined || objOptions.icon == null ? this.objOptions.icon : objOptions.icon}
                        </span>
                        <div class="texto">
                            
                            <h2>${objOptions == undefined ? this.objOptions.title : objOptions.title}</h2>
                            <p>${objOptions == undefined ? this.objOptions.message : objOptions.message}</p>
                        </div>      
                    </div>`
        }
}

// Creador concreto D
class ModalConfirm {

    objOptions = {
        icon: 'cancel',
        title: '¿Estas seguro?',
        message: 'No podras recuperar este contacto. Se eliminará por completo',
        }

    render(objOptions) {

        return `<div class="confirm animate">
                    <span class="material-icons">
                        ${objOptions == undefined || objOptions.icon == null ? this.objOptions.icon : objOptions.icon}
                    </span>
                    <div class="texto">
                        <h2>${objOptions == undefined ? this.objOptions.title : objOptions.title}</h2>
                        <p>${objOptions == undefined ? this.objOptions.message : objOptions.message}</p>
                    </div>      
                    <span>
                        <button class="btnBorrar">Aceptar</button>
                        <button class="btnCancelar">Cancelar</button>
                    </span>
                </div>`
    }
}

ModalTypes = {
    success: ModalSuccess,
    error: ModalError,
    warning: ModalWarning,
    confirm: ModalConfirm
}