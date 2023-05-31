//Constante de los valores definidos para cada premio

const RewardsValue ={
    COIN: 2,
    STAR: 4,
    REMAINING_LIVES: 10
}

/**
 * CLASE  REWARD
 * 
 * Instancia PREMIOS  de manera aleatoria en el DOM creado dinámicamente y loS muestra 
 * Clase hija de Character
 */

class Reward extends Character {


    constructor(){
        const node = document.createElement("div");
        super(node);
        node.classList.add(this.__generateRandomRewardType());
        this.show();
    }


    /**función privada */
    __generateRandomRewardType(){
        let max = 4;
        let min= 1;
        let selectReward = Math.floor(Math.random() * (max - min) + min);

        switch(selectReward){
            case 1:
                this.type = 'coin';
                break;
            case 2:
                this.type = 'star';
                break;
            case 3:
                this.type ='heart';
                break;
            default:
                'coin';
        }
        return this.type;
    }

    /**
     * 
     * @returns el nombre de la clase para chequeos
     */
    getName(){
        return "Reward";
    }

    /**
     * Permite mostrar en pantalla el objeto REWARD
     * Saca la animación definida en css
     * die() => cambia el valor del estado de isAlive
     */

    show(){
        super.show()
        this.getNode().addEventListener("animationend" , () => {
            this.die();
        });
    }

    /**
     * 
     * @param {*} collided indica que el avatar colisionó con un PREMIO
     * y agrega dinamicamente el efecto que hace rotar los premios y salir 
     * en diagonal hacia la izquierda y arriba de la pantalla
     */
    setHasCollided(collided){
        super.setHasCollided(collided); // de la clase Character
        if(collided){
            this.getNode().style.animation = "collect 4s ease-out, reward 5s linear forwards";  
        }
    }

    /**
     * toma el sonido del DOM para personalizar los efectos
     * cuando un premio colisiona con el avatar
     * o cuando se gana una vida
    */

    setHasCollidedSound(collided , typeOfReward){
        super.setHasCollided(collided);
        if(collided && typeOfReward == 'coin' || typeOfReward == 'star'){
            this.rewardSound = document.getElementById('rewardSound');
            this.rewardSound.play();
        }
        if(collided && typeOfReward == 'heart'){
            this.heartSound = document.getElementById('heartSound');
            this.heartSound.play();
        }
    }
}