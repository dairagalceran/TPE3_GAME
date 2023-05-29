"use strict"

/**
 * Interfaz Gráfica del Usuario => GUI
 * con ella se controla la vista del juego
 */
class StartScreen extends ScreenItem {


    constructor() {
        const node = document.createElement('div');
        node.classList.add('layer')
        node.classList.add('information')
        node.innerHTML = '<h1>BEAR  --  RUNNER</h1> <ul><li><h3>Instructions</h3></li><li>You must jump  the obstacles and collect coins</li><li>Use  space-bar to jump!!!</li><button  id="button-play" type="button" >Play Game</button>'
        super(node)
        this.hide();
    }

    setOnStartClickedListener(onClick){
        const button = this.getNode().querySelector('#button-play');
        button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick()
        })
    }

}




















