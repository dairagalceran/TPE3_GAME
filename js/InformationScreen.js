"use strict"

class InformationScreen extends ScreenItem {


    constructor(){
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = ' <ul><li>BE READY!!!</li> <li>Use  space-bar to jump and  earn points </li> <li>It also allows you to avoid obstacles and prevent lives</li> <li class="text-value"> <img src="/images/assets/coin-resized.png" alt="">  ='  + RewardsValue.COIN+'</li> <li class="text-value"> <img src="/images/assets/star.png" alt=""> = 2</li> <li class="text-value">  <img src="/images/assets/life.png" alt=""> = 4 </li> </ul> <button  id="button-play" type="button" >START</button>'
        super(node);
        this.hide();
    }

    setOnPlayClickedListener(onClick){
        const button = this.getNode().querySelector('#button-play');
        //button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick();
        })
    }
}
    

