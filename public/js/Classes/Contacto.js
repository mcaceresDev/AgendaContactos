
//Sujeto
class Contact {
    
    observers
    
    constructor(){
        this.observers = []
    }

    subscribe(observer){
        this.observers.push(observer)
        console.log("Suscrito");
    }
    
    unsubscribe(observer){
        this.observers.filter(objObserver => objObserver !== observer)
    }
    
    notify(data){
        this.observers.forEach((observer) =>{
            observer.refresh(data)
        })
    }

}

// class Observer{
    
//     fn

//     constructor(fn){
//         this.fn = fn;
//     }

//     refresh(contactos){
//         this.fn(contactos)
//     }
// }