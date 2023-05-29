const GameStatus = {
    INIT : 'INIT',
    PLAYING : 'PLAYING',
    FINISHED : 'FINISHED'
}

const GAME_TIME_LIMIT = 45
const INITIAL_LIVES = 5
class Game {
    
    status = GameStatus.INIT
    points = 0;
    lives = INITIAL_LIVES;
    mainCharacter;
    characters;
    timeElapsed = 0;
    lastLoop = 0;
    loopsForNextEnemy = 0;
    loopsForNextCoin = 0;


    constructor(){
        this.gameNode = document.getElementById('game');
        this.mainCharacter =  new Avatar();
        this.gameInfo =  new GameInfo();
        this.characters = [];
        this.createStartScreen();
    }

    createStartScreen(){
        this.startScreen = new StartScreen();
        this.gameNode.appendChild(this.startScreen.getNode())
    }

    /**
    * Responde al evento de click del botón para poder 
    * iniciar la nueva partida.
    */

    initGame(){
        this.startScreen.show()
        this.status = GameStatus.INIT;
        this.points = 0;
        this.loopsForNextEnemy = 20;
        this.loopsForNextCoin = 10;
        this.lives = INITIAL_LIVES;
        this.timeElapsed = 0
        this.lastLoop = 0
        this.characters.forEach(c => c.getNode().remove())
        this.characters = []
        this.mainCharacter.hide();
        this.startScreen.setOnStartClickedListener(()=> this.playGame())
        console.log(this.status)
    }


    playGame(){
        this.mainCharacter.show();
        this.mainCharacter.run();
        this.lastLoop =  Date.now();
        this.startScreen.hide();
        this.status = GameStatus.PLAYING;
        console.log(this.status)
    }

    checkGameFinished(){
        if(this.lives == 0 || this.timeElapsed / 1000  > GAME_TIME_LIMIT){
            this.finishGame()
        }
    }

    
    finishGame(){
        this.status = GameStatus.FINISHED
        console.log(this.status)
        this.cleanAllChracters();
        this.mainCharacter.die()
        this.mainCharacter.hide()
    }

    
    onLoop(){
        switch(this.status){
            case GameStatus.INIT:
                break;
            case GameStatus.PLAYING:
                this.onLoopPlaying()
            break;
            case GameStatus.FINISHED:
                break;
        }
    }

    cleanDeadCharacters(){
        let deadCharacters = this.characters.filter(character => !character.getIsAlive()); // devuelve el elemento que cumple la condicion
        this.characters = this.characters.filter(character => character.getIsAlive());
        deadCharacters.forEach(character => character.getNode().remove());
    }

    cleanAllChracters(){
        this.characters.forEach(character => character.getNode().remove());
    }


    onLoopPlaying(){
        console.log('onLoopPlaying')
        let deltaTime = (Date.now() - this.lastLoop );  // diferencial de tiempo transcurrido entre el tiempo actual y el ultimo loop
        this.timeElapsed += deltaTime;                  // tiempo transcurrido sumatoria de diferenciales de tiempo
        this.cleanDeadCharacters();
        this.checkCollisions()
        this.createCharacters()
        this.updateGameInfo()
        this.lastLoop = Date.now()
        this.checkGameFinished()
    }

    updateGameInfo(){
        this.gameInfo.setLives(this.lives)
        this.gameInfo.setPoints(this.points)
        this.gameInfo.setTimeElapsed(this.timeElapsed)
    }

    /** Crea caracteres en diferentes divs con clases que representan a una enemigoo un premio
     * 
     */
    createCharacters(){
        this.generateEnemy()
        this.generateReward()
    }



    addCharacter(character){
        this.characters.push(character);
        this.gameNode.appendChild(character.getNode())
    }




    keyEvent(key){
        if(key == " "){
            this.mainCharacter.jump();
        }
    }
  
 onEnemyCollision(){
    this.lives--;
    this.mainCharacter.fall();
 }   

 onRewardCollision(){
    this.points++
 }


 checkCollisions(){
        this.characters.forEach(c => {
            if(this.mainCharacter.collidesWith(c)){
                if(c.getName() == "Enemy" && !c.getHasCollided()){
                    c.setHasCollided(true);
                    this.onEnemyCollision()
                }
                if(c.getName() == "Reward" && !c.getHasCollided()){
                    c.setHasCollided(true);
                   this.onRewardCollision();
                }
            }
        });

    }

    generateEnemy(){
        let aliveEnemy = this.characters.find(c => c.getName() === "Enemy"  && c.getIsAlive());
        if(!aliveEnemy){
            if(this.loopsForNextEnemy > 0){
                this.loopsForNextEnemy--;
            }else{
                this.addCharacter(new Enemy())
                this.loopsForNextEnemy = Math.floor(Math.random()*2)*20
            }
        }
    }

    generateReward(){
        let aliveCoins = this.characters.find(c => c.getName() === "Reward"  && c.getIsAlive());
        if(!aliveCoins){
            if(this.loopsForNextCoin > 0){
                this.loopsForNextCoin--;
            }else{
                this.addCharacter(new Reward())
                this.loopsForNextCoin = Math.floor(Math.random()*2)*10
            }
        }
    }
    
}