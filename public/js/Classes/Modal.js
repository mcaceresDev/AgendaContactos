//FACTORY
//Clase creadora
class Modal {

    getInstanceModal(modalKey, settingModal) {
        let modalTypes = Object.values(modalStore)
        let modal

        modalTypes.forEach((type) => {
            if (type == modalStore[modalKey]) {
                modal = new type()
            }
        })

        return modal.render(settingModal)
    }
}

// Creador concreto A
class ModalSuccess {

    objOptions = {
    icon: 'check_circle',
    title: 'Operación exitosa',
    message: 'Tu solicitud fue realizada',
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
        title: 'Aviso',
        message: 'Debes ejecutar con cuidado esta acción',
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
        message: 'Verifica todo antes de realizar esta acción',
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

const modalStore = {
    success: ModalSuccess,
    error:   ModalError,
    warning: ModalWarning,
    confirm: ModalConfirm
}