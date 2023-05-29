class GameInfo {

    constructor(){

    }

    setPoints(points){
        document.getElementById('score').textContent = ""+points;
    }

    setLives(lives){
        document.getElementById('lives').textContent = ""+lives;
    }

    setTimeElapsed(time){
        let seconds = Math.floor(time / 1000)
        let timeLeft = 50 - seconds;
        document.getElementById('time').textContent =`Tiempo restante: `+ timeLeft+ `segundos`;
    }

    
}