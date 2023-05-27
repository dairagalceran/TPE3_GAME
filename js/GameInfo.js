class GameInfo {


    setPoints(points){
        document.getElementById('points').textContent = ""+points;
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