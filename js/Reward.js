class Reward extends Character{

    constructor(){
        super(document.getElementById("rewardItems"));
        this.show();
    }

    getName(){
        return "Reward";
    }

    getTypeOfReward(){
        let objMax =4;
        let objMin =1;

        let randomSelectReward = Math.floor(Math.random() * (objMax - objMin) +1);
        switch(randomSelectReward){
            case 1: 
                this.type = "coin";
                //this.points =1;
            break;
            case 2:
                this.type = "star";
               // this.points=2;
            break;
            case 3:
                this.type = "live";
                //this.point = lives;
                break;
            default: "coin;"
        }
    
        return this.type ;
    }

    show(){
        let typeOfReward = this.getTypeOfReward();
        this.getNode().classList.add(typeOfReward);
        this.getNode().addEventListener("animationend" , () => {
            this.die();
            //destruir imagen
        });
    }
}