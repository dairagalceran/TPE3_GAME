"use strict"

class EndScreen extends ScreenItem{

    constructor(){
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = ' <img src="images/game-over.png" alt=""> <ul><li><h3>Score:</h3><h3 id="final-score"><h3></li><li</li>  <button  id="button-play-again" type="button" >Play Again</button>';
        super(node);
        
    }


    setOnEndClickedListener(onClick){
        const button = this.getNode().querySelector('#button-play-again');
        console.log("dentro de setonendclicked listener");
        button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick();
        })
    }

}