/**
 * Clase hija de ScreenItem
 * Clase  padre de la cual extienden Avatar, Reward y Enemy
 * objetos de los cuales se determina el estado de bolleano de vida
 * determinar si colisionó y modificar en menos el área de cada 
 * objeto instanciado
 * 
 */

class Character extends ScreenItem {
    
    constructor(domNode){
        super(domNode);
        this.isAlive = true;
        this.hasCollided = false;
    };

    /**
     * 
     * @returns el nombre de la clase 
     */
    getName(){
        throw Error("Define Name")
    }

    /**
     * 
     * @returns devuelve el valor del parametro para determinar si ha sido colisionado
     */

    getIsAlive(){
        return this.isAlive;
    }

    /**
     * modifica el valor de isAlive
     */
    die(){
        this.isAlive = false;
    }

    /**
     * 
     * @returns el valor para achicar el ancho del rectángulo 
     */

    getCollisionFactorX(){
        return 0.8
    }

    /**
     * 
     * @returns el valor para achicar el alto del rectángulo 
     */

    getCollisionFactorY(){
        return 0.8
    }


    /**
     * Toma los valores desde el DOM del rectangulo de cada objeto 
     * getBoundingClientRect() devuelve(x, y, width , height)
     * width , heiht: se achican las dimensiones
     * x, y se traslada al centro de gravedad del rectángulo
     * @returns los nuevos valores de  x, y, width , height
     */

    getCollisionBounding(){
        let rect = this.domNode.getBoundingClientRect();
        const  width = rect.width * this.getCollisionFactorX();
        const  height = rect.height * this.getCollisionFactorY();
        const dY = (rect.height - height) / 2;
        const dX = (rect.width - width) / 2;
        return {width, height, x: rect.x + dX, y:rect.y + dY }
    }

    /**
     * Setea el valor de la variable hasCollided con el valor pasado por el parámetro collided
     */

    setHasCollided(collided){
        this.hasCollided = collided; 
    }

    /**
     * 
     * @returns el valor de hasCollided
     */
    getHasCollided(){
        return this.hasCollided;
    }
}
