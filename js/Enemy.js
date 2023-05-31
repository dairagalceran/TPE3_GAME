const EnemiesValue = {
    FALL: -1
}

/**
 * CLASE  ENEMY
 * Instancia obstáculos de manera aleatoria en el DOM creado dinámicamente y lo muestra 
 * Clase hija de Character
 * 
 */

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
    
    /**
     * 
     * @returns el nombre de la clase para chequeos
     */
    getName(){
        return "Enemy"
    }

    /**
     * Permite mostrar en pantalla el objeto Enemy
     * Saca la animación definida en css
     * die() => cambia el valor del estado de isAlive
     */

    show(){
        super.show();
        this.getNode().addEventListener("animationend", ()=> { 
            this.die();
        });
    }

    /**
     * 
     * @param {*} collided indica que el avatar colisionó con un enemigo
     * @param {*} typeOfenemy pasa por parámerro el tipo de enemigo colisionado 
     * para seleccionar el efecto de sonido 
     */

    setHasCollided(collided , typeOfenemy){
        super.setHasCollided(collided);
        if(collided && typeOfenemy == 'stone'){
            this.crashSound = document.getElementById('crashSound');
            this.crashSound.play();
        }
        if(collided && typeOfenemy == 'tronco'){
            this.woodSound = document.getElementById('woodSound');
            this.woodSound.play();
        }
        if(collided && typeOfenemy == 'cactus'){
            this.painSound = document.getElementById('painSound');
            this.painSound.play();
        }
    }

}