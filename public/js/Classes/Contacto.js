
//Sujeto
class Contact {
    
    observers
    
    constructor(){
        this.observers = []
    }

    subscribe(observer){
        this.observers.push(observer)
    }
    
    unsubscribe(observer){
        this.observers.filter(objObserver => objObserver !== observer)
    }
    
    notify(){
        this.observers.forEach((observer) =>{
            observer.getContacts()
        })
    }

}