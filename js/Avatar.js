class Avatar extends Character {

    constructor(){
        super(document.getElementById("bear"));
    }

    getName(){
        return "Avatar"
    }

    //Agrega la clase del avatar  desde el DOM 
    run(){
        this.clean(); //mejorar que de se destruyan al salir de pantalla
        this.getNode().classList.add("runner");
    }

    //Si el avatar esta corriendo lo reemplaza por saltar 
    jump(){
        if(this.getNode().classList.contains("runner")){
            this.clean();
            this.getNode().classList.add("jumper");
            this.getNode().addEventListener("animationend", ()=> {  //falta comentar
                this.run();
            });
        }
    }

    // Reemplaza el avatar que corre por el que cae
    fall(){
        this.clean();
        this.getNode().classList.add("faller");
        this.getNode().addEventListener("animationend", () => {  //falta comentar
            this.run();
        });
    }

    //Remueve la función que estaba actuando sobre el avatar
    clean(){
        this.getNode().classList.remove("runner");
        this.getNode().classList.remove("jumper");
        this.getNode().classList.remove("faller");
        this.getNode().removeEventListener("animationend", () => {});
    }

    collidesWith(character){
        let a = this.getCollisionBounding();
        let b = character.getCollisionBounding();
        return (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x) && (a.y < (b.y+b.height)) && ((a.y + a.height) > b.y)
    }
    
    getCollisionFactorX(){
        return 0.5
    }

}