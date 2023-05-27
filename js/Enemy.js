class Enemy extends Character {

    constructor(){
        super(document.createElement("div"));
        this.show();
    }

    getName(){
        return "Enemy"
    }


    getTypeOfEnemy(){
        let objMax =4;
        let objMin =1;
        let randomSelectEnemy = Math.floor(Math.random() * (objMax - objMin) + 1);
        switch(randomSelectEnemy){
            case 1: 
                this.type = "stone";
            break;
            case 2:
                this.type = "cactus";
                break;
            case 3:
                this.type = "tronco";
                break;
            default: "stone;"
        }
        return this.type;
    }


    show(){
        let typeOfEnemy = this.getTypeOfEnemy();                 
        this.getNode().classList.add(typeOfEnemy);
        this.getNode().addEventListener("animationend", ()=> {  //falta comentar
            this.die();
        });
    }

}