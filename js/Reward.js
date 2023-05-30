class Reward extends Character {


    constructor(){
        const node = document.createElement("div");
        super(node);
        node.classList.add(this.__generateRandomRewardType());
        this.show();
    }

    /*__generateRandomRewardType(){
        return "reward"
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
                this.type ='live';
                break;
            default:
                'coin';
        }
        return this.type;
    }

    getName(){
        return "Reward";
    }

    show(){
        super.show()
        this.getNode().addEventListener("animationend" , () => {
            this.die();
        });
    }
}