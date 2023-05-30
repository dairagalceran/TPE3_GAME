"use strict"

class StartScreen extends ScreenItem {

    constructor() {
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = '<h1>BEAR  --  RUNNER</h1> <ul><li><h3>HAVE FUN!!!</h3></li><h3></h3>- - - - - - - - - - - - <li>COLLECT TREASURES AND AVOID FALLING </li>  <li>  WHILE WALKING THROUGH THE FOREST </li> </ul> <button  id="button-start" type="button" >Play Game</button>'
        super(node);
        this.hide();
    }



    setOnStartClickedListener(onClick){
        const button = this.getNode().querySelector('#button-start');
       // button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick();
        })
    }

}




















