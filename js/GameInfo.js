/**
 * Clase hija de ScreenItem
 */

class GameInfo extends ScreenItem {

     /**
     * al instanciar un objeto de la clase se crea el div en el html
     * se agregan las clases que dan estilo al html renderizado
     * llama al nodo de la clase padre y no se muestra en pantalla
     */
    constructor(){
        const node = document.createElement('div');
        node.classList.add('screen-info');
        node.innerHTML = '<div id="pointGame"><p><span id="score"></span></p></div> <div id=""><p><span id="lives"></span></p></div> <div id=""><span id="time"></span><p></p></div>';
        super(node);
        this.hide();
    }

    /**
     * Setea el puntaje del juego en la pantalla de juego a medida que lo solicita la clase Game en cada loop
     * @param {*} points 
     */
    setPoints(points){
        document.getElementById('score').textContent = "SCORE: "+points;
    }

    /**
     * Setea  la cantidad de vidas /créditos restantes para contunuar el juego 
     * muestra en pantalla  a medida que lo solicita la clase Game en cada loop
     * @param {*} points 
     */
    setLives(lives){
        document.getElementById('lives').textContent = "LIVES: "+lives;
    }

    /**
     * Setea el tiempo restante de juego en la pantalla de juego a medida que lo solicita la clase Game en cada loop
     * @param {*} points 
     */
    setTimeElapsed(time){
        let seconds = Math.floor(time / 1000)
        let timeLeft = 50 - seconds;
        document.getElementById('time').textContent =`TIME TO PLAY: `+ timeLeft+ ` SECONDS`;
    }

    
}