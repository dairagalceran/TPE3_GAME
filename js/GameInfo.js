class GameInfo {

    setPoints(points){
        document.getElementById('points').textContent = ""+points;
    }

    setLives(lives){
        document.getElementById('lives').textContent = ""+lives;
    }

    setTimeElapsed(time){
        let seconds = Math.floor(time / 1000)

        document.getElementById('time').textContent = Math.floor(seconds / 60) + ":"+ seconds % 60 ;

    }

}