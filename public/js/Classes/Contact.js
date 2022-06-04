//OBSERVER
//Subject
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
    
    notify(data){
        this.observers.forEach((observer) =>{
            observer.refresh(data)
        })
    }

}