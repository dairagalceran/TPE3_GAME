/**
 * Clase hija de ScreenItem
 */

class GameInfo extends ScreenItem {

    constructor(){
        const node = document.createElement('div');
        node.classList.add('screen-info');
        node.innerHTML = '<div id="pointGame"><p><span id="score"></span></p></div> <div id=""><p><span id="lives"></span></p></div> <div id=""><span id="time"></span><p></p></div>';
        super(node);
        this.hide();
    }

    setPoints(points){
        document.getElementById('score').textContent = "PUNTAJE: "+points;
    }

    setLives(lives){
        document.getElementById('lives').textContent = "VIDAS: "+lives;
    }

    setTimeElapsed(time){
        let seconds = Math.floor(time / 1000)
        let timeLeft = 50 - seconds;
        document.getElementById('time').textContent =`TIEMPO PARA JUGAR: `+ timeLeft+ ` SEGUNDOS`;
    }

    
}