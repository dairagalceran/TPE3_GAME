/**
 * CLASE  AVATAR
 * 
 * Instancia el personaje del OSO  en el div del  DOM 
 * Clase hija de Character
 */

class Avatar extends Character {

    constructor(){
        super(document.getElementById("bear"));
    }

    /**
     * @returns el nombre de la clase para chequeos
     */
    getName(){
        return "Avatar"
    }

    /**
     * Agrega la clase  correr del avatar dinamicamente 
     *  antes limpia las acciones de saltar y  caer
     * */ 
    run(){
        this.clean(); 
        this.getNode().classList.add("runner");
    }
    /**
     * //Si el avatar esta corriendo , saca las funciones 
     * agrega la acción saltar 
     * luego funaliza la animación volviendo a hacer correr el personaje
     */
    
    jump(){
        if(this.getNode().classList.contains("runner")){
            this.clean();
            this.getNode().classList.add("jumper");
            this.getNode().addEventListener("animationend", ()=> {  
                this.run();
            });
        }
    }

    // Límpia las funciones y Reemplaza el avatar que corre por el que cae
    fall(){
        this.clean();
        this.getNode().classList.add("faller");
        this.getNode().addEventListener("animationend", () => {  
            this.run();
        });
    }

    //Remueve las función keyframe que estaban actuando sobre el avatar
    clean(){
        this.getNode().classList.remove("runner");
        this.getNode().classList.remove("jumper");
        this.getNode().classList.remove("faller");
        this.getNode().removeEventListener("animationend", () => {});
    }

    /**
     * 
     * @param {*} character cualquiera sea que esté vivo=> isAlive = true
     * variable a recalcula los valores del avatar
     * variable b recalcula los valores del personaje con el cual colisiona
     * @returns true si verifica las condiciones de coalisión
     */
    collidesWith(character){
        let a = this.getCollisionBounding();
        let b = character.getCollisionBounding();
        return (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x) && (a.y < (b.y+b.height)) && ((a.y + a.height) > b.y)
    }
    
    /**
     * 
     * @returns un valor menor que el de la clase character para mejorar 
     * la experiencia de usuario al achicar el ancho del rectangulo contenedor el Avatar
     */
    getCollisionFactorX(){
        return 0.5
    }

}