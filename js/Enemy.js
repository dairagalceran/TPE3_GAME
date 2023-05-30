class Enemy extends Character {

    constructor(){
        const node = document.createElement("div")
        node.classList.add('enemy')
        super(node);
        node.classList.add(this.__generateRandomEnemyType());
        this.show();
    }

    /**función privada */
    __generateRandomEnemyType(){
        let max = 4;
        let min= 1;
        let selectEnemy = Math.floor(Math.random() * (max - min) + min);

        switch(selectEnemy){
            case 1:
                this.type = 'stone'
                break;
            case 2:
                this.type = 'cactus';
                break;
            case 3:
                this.type ='tronco';
                break;
            default:
                'stone';
        }
        return this.type;
    }
    
    getName(){
        return "Enemy"
    }
/*
    cargarEfectoSonido(){
        const efectoCaida =  document.createElement("audio");
        efectoCaida.src = sounds/kidding-11;
        efectoCaida.setAttribute("preload", "auto");
        //efectoCaida.style.display = "none";
        return efectoCaida;
    }
    */

    show(){
        super.show();
        this.getNode().addEventListener("animationend", ()=> { 
            this.die();
        });
    }

}