class Character{
    
    constructor(domNode){
        this.setDomNode(domNode);
        this.isAlive = true;
        this.hasCollided = false;
    };

    getName(){
        throw Error("Define Name")
    }

    setDomNode(domNode){
        this.domNode = domNode;
    }

    getPosition(){ 
        let rect = this.domNode.getBoundingClientRect();
        return {x: rect.x, y: rect.y}; 
    }

    getSize() {
        let rect = this.domNode.getBoundingClientRect();
        return {width: rect.width, height: rect.height}; 
    }

    getNode(){
        return this.domNode;
    }

    getIsAlive(){
        return this.isAlive;
    }

    die(){
        this.isAlive = false;
    }

    getCollisionFactorX(){
        return 0.8
    }

    getCollisionFactorY(){
        return 0.8
    }

    getCollisionBounding(){
        let rect = this.domNode.getBoundingClientRect();
        const  width = rect.width * this.getCollisionFactorX();
        const  height = rect.height * this.getCollisionFactorY();
        const dY = (rect.height - height) / 2;
        const dX = (rect.width - width) / 2;
        return {width, height, x: rect.x + dX, y:rect.y + dY }
    }

    setHasCollided(collided){
        this.hasCollided = collided; 
    }

    getHasCollided(){
        return this.hasCollided;
    }
}
