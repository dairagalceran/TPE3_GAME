const GameStatus = {
    INIT : 'INIT',
    PLAYING : 'PLAYING',
    FINISHED : 'FINISHED'
}

const GAME_TIME_LIMIT = 50
const INITIAL_LIVES = 1

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
        this.characters = [];
        this.createGameInfo();
        this.createStartScreen();
        this.createInformationScreen();
        this.createEndScreen();
    }

    initGame(){
        this.endScreen.hide();
        this.startScreen.show();
        this.status = GameStatus.INIT;
        this.points = 0;
        this.loopsForNextEnemy = 20;
        this.loopsForNextCoin = 5;
        this.lives = INITIAL_LIVES;
        this.timeElapsed = 0
        this.lastLoop = 0
        this.characters.forEach(c => c.getNode().remove())
        this.characters = []
        this.mainCharacter.hide();
        this.gameInfo.hide();
        this.startScreen.setOnStartClickedListener(()=> this.showInstructions());
        console.log(this.status)
    }

    showInstructions(){
        this.informationScreen.show();
        this.startScreen.hide();
        this.informationScreen.setOnPlayClickedListener(()=> this.playGame());
    }

    playGame(){
        this.mainCharacter.show();
        this.mainCharacter.run();
        this.gameInfo.show();
        this.lastLoop =  Date.now();
        this.informationScreen.hide();
        this.status = GameStatus.PLAYING;
        this.playSong();
        console.log(this.status)
    }

    playSong(){
        this.gameSong = document.getElementById("gameSong")
        this.gameSong.volume = 0.5
        this.gameSong.play()
    }

    stopSong(){
        this.gameSong.pause()
    }

    checkGameFinished(){
        if(this.lives == 0 || this.timeElapsed / 1000  > GAME_TIME_LIMIT){
            this.finishGame();
        }
    }

    finishGame(){
        this.status = GameStatus.FINISHED
        console.log(this.status)
        this.cleanAllChracters();
        this.mainCharacter.die()
        this.mainCharacter.hide();
        this.gameInfo.hide();
        this.endScreen.show();
        this.endScreen.setFinalScore(this.calculateFinalScore())
        this.endScreen.setOnPlayAgainClickedListener(() => this.initGame());
        this.stopSong();
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

    createStartScreen(){
        this.startScreen = new StartScreen();
        this.gameNode.appendChild(this.startScreen.getNode());
    }

    createInformationScreen(){
        this.informationScreen = new InformationScreen();
        this.gameNode.appendChild(this.informationScreen.getNode());
    }

    createGameInfo(){
        this.gameInfo =  new GameInfo();
        this.gameNode.appendChild(this.gameInfo.getNode());
    }
    
    createEndScreen(){
        this.endScreen = new EndScreen();
        this.gameNode.appendChild(this.endScreen.getNode());
    }

    cleanDeadCharacters(){
        let deadCharacters = this.characters.filter(character => !character.getIsAlive()); 
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

    onRewardCollision(typeOfReward){
        if(typeOfReward == 'coin'){
            this.points += RewardsValue.COIN;
        }else if(typeOfReward == 'star'){
            this.points += RewardsValue.STAR;
        } else {
            this.points += RewardsValue.HEART;
        }
    }

    calculateFinalScore(){
        let finalScore = this.points + (this.lives * 10);
        return finalScore
    }

    
    checkCollisions(){
        this.characters.forEach(c => {
            if(this.mainCharacter.collidesWith(c)){
                if(c.getName() == "Enemy" && !c.getHasCollided()){
                    c.setHasCollided(true);
                    this.onEnemyCollision();
                }
                if(c.getName() == "Reward" && !c.getHasCollided()){
                    c.setHasCollided(true);
                    let typeOfReward = c.type;
                    this.onRewardCollision(typeOfReward);
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