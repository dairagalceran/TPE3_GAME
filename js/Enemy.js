class Enemy extends Character {

    constructor(){
        super(document.createElement("div"));
                                                    //console.log("new enemy") 
        this.show();
    }

    getName(){
        return "Enemy"
    }

    show(){
                                    //console.log("show enemy") 
        this.getNode().classList.add('enemy')
        this.getNode().addEventListener("animationend", ()=> {  //falta comentar
            this.die();
        });
    }

}