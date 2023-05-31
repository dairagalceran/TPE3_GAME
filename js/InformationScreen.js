/**
 * Clase hija de ScreenItem
 */
"use strict"

class InformationScreen extends ScreenItem {

    /**
     * al instanciar un objeto de la clase se crea el div en el html
     * se agregan las clases que dan estilo al html renderizado
     * muestra por pantalla los elementos del html con la información del juego
     * llama al nodo de la clase padre y no se muestra en pantalla
     */
    constructor(){
        const node = document.createElement('div');
        node.classList.add('layer');
        node.classList.add('information');
        node.innerHTML = ' <ul><li>BE READY!!!</li> <li>Use  space-bar to jump and  earn points. </li> <li class="text-value"> <img src="/images/assets/coin-resized.png" alt="">  ='+ RewardsValue.COIN+'</li> <li class="text-value"> <img src="/images/assets/star.png" alt=""> = '+ RewardsValue.STAR+'</li> <li class="text-value"> <li>Use  space-bar to jump and win a life. Add points with remainig lives.</li> <li class="text-value" ><img src="/images/assets/bear-life.png" alt="">  = '+RewardsValue.REMAINING_LIVES+'</li> <li>Use  space-bar to jump and avoid obstacles, don´t lose points and lives.</li> <li class="text-value">  <img src= "/images/assets/cactus.png"> <img src= "/images/assets/stone-resized.png"> <img src= "/images/assets/tronco.png"> = '+ EnemiesValue.FALL+' </li> </ul> <button  id="button-play" type="button" >START</button>'
        super(node);
        this.hide();
    }

    /**
     * Método que agrega el evento click al botón creado dinámicamente al instanciar this objeto
     * para iniciar el juego
     * @param {*} onClick 
     */
    setOnPlayClickedListener(onClick){
        const button = this.getNode().querySelector('#button-play');
        //button.removeEventListener('click',null);
        button.addEventListener('click' , () => {
            onClick();
        })
    }
}
    
