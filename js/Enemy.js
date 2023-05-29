class Enemy extends Character {

    constructor(){
        const node = document.createElement("div")
        node.classList.add('enemy')
        node.classList.add('stone')
        super(node);
        this.show();
    }

    getName(){
        return "Enemy"
    }

    show(){
        super.show();
        this.getNode().addEventListener("animationend", ()=> { 
            this.die();
        });
    }

}