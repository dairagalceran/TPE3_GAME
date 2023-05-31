/**
 * Clase hija de ScreenItem
 */
"use strict"

class EndScreen extends ScreenItem{

    /**
     * al instanciar un objeto de la clase se crea el div en el html
     * se agregan las clases que dan estilo al html renderizado
     * agrega las imagenes y sus valores
     * llama al nodo de la clase padre y no se muestra en pantalla
     */
    constructor(){
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = ' <img src="images/game-over.png" alt=""> <ul><li><h3>Score: </h3></li><h3 id="final-score"><h3> <li</li>  <button  id="button-play-again" type="button" >Play Again</button>';
        super(node);
        this.hide();
    }

    /**
     * Setea el puntaje final en la pantalla final del juego que informa el usuario el valor obtenido
     * @param {*} finalScore 
     */
    setFinalScore(finalScore){
        document.getElementById("final-score").textContent = finalScore
    }

    /**
     * Método que agrega el evento click al botón creado dinámicamente al instanciar this objeto
     * para reiniciar otro juego
     * @param {*} onClick 
     */

    setOnPlayAgainClickedListener(onClick){
        const button = this.getNode().querySelector('#button-play-again');
        button.removeEventListener('click',null); //limpia los eventListener 
        button.addEventListener('click' , () => {
            onClick();
        })
    }

}