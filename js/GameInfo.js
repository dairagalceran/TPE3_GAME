class GameInfo {

    constructor(){

    }

    setPoints(points){
        document.getElementById('score').textContent = "PUNTAJE: "+points;
    }

    setLives(lives){
        document.getElementById('lives').textContent = "VIDAS: "+lives;
    }

    setFinalScore(finalScore){
        document.getElementById('final-score').textContent = finalScore;
    }
    
    setTimeElapsed(time){
        let seconds = Math.floor(time / 1000)
        let timeLeft = 50 - seconds;
        document.getElementById('time').textContent =`TIEMPO PARA JUGAR: `+ timeLeft+ `SEGUNDOS`;
    }

    
}