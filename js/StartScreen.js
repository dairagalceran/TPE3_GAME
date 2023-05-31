/**
 * Clase hija de ScreenItem
 */
"use strict"

class StartScreen extends ScreenItem {

     /**
     * al instanciar un objeto de la clase se crea el div en el html
     * se agregan las clases que dan estilo al html renderizado
     * agrega a la pantalla los elementos del html
     * llama al nodo de la clase padre y no se muestra en pantalla
     */
    constructor() {
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = '<h1>BEAR  --  RUNNER</h1> <ul><li><h3>HAVE FUN!!!</h3></li><h3></h3>- - - - - - - - - - - - <li>COLLECT TREASURES AND AVOID FALLING </li>  <li>  WHILE WALKING THROUGH THE FOREST </li> </ul> <button  id="button-start" type="button" >Play Game</button>'
        super(node);
        this.hide();
    }

    /**
     * Método que agrega el evento click al botón creado dinámicamente al instanciar this objeto
     * para que se muestre la pantalla información al presionarlo
     * @param {*} onClick 
     */

    setOnStartClickedListener(onClick){
        const button = this.getNode().querySelector('#button-start');
        button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick();
        })
    }

}




















