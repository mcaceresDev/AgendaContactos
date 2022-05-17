
//Subject
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
            console.log("Sejecuto");
        })
    }

}