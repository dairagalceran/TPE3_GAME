class Reward extends Character {


    constructor(){
        const node = document.createElement("div");
        super(node);
        node.classList.add(this.__generateRandomRewardType());
        
        this.show();
    }

    __generateRandomRewardType(){
        return "reward"
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