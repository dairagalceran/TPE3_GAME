class Game {
    
    points = 0;
    lives = 5;
    mainCharacter;
    characters;
    timeElapsed = 0;
    lastLoop = 0;



    constructor(){
        this.gameNode =  document.getElementById('game');
        this.mainCharacter =  new Avatar();
        this.gameInfo =  new GameInfo();
        this.characters = [];
        this.loopsForNextEnemy = 20;
    }


    start(){
        this.mainCharacter.run();
        this.lastLoop =  Date.now();
        this.addCharacter(new Enemy())
    }

    addCharacter(character){
        this.characters.push(character);
        this.gameNode.appendChild(character.getNode())
    }

    
    onLoop(){
        let deltaTime = (Date.now() - this.lastLoop );
        this.timeElapsed += deltaTime;
        
        let deadCharacters = this.characters.filter(character => !character.getIsAlive());
        this.characters.forEach(c => {
            console.log(c.getName(), c.getPosition());
        })
        this.characters = this.characters.filter(character => character.getIsAlive());
        
        this.characters.forEach(c => console.log("alive",c.getName()));

        deadCharacters.forEach(character => character.getNode().remove())
    
        this.checkCollisions()
        this.generateEnemy()
        this.gameInfo.setLives(this.lives)
        this.gameInfo.setPoints(this.points)
        this.gameInfo.setTimeElapsed(this.timeElapsed)
        this.lastLoop = Date.now()
    }


    generateEnemy(){
        let aliveEnemy = this.characters.find(c => c.getName() === "Enemy" && c.getIsAlive());
        if(!aliveEnemy){
            if(this.loopsForNextEnemy > 0){
                this.loopsForNextEnemy--;
            }else{
                this.addCharacter(new Enemy())
                this.loopsForNextEnemy = 20 + Math.floor(Math.random()*3)*20
            }
        }
    }

    checkCollisions(){
        this.characters.forEach(c => {
            if(this.mainCharacter.collidesWith(c)){
                if(c.getName() == "Enemy" && !c.getHasCollided()){
                    c.setHasCollided(true);
                    this.chocoUnEnemigo()
                }
                if(c.getName() == "Coin"){
                    this.chocoUnaMoneda(c)
                }
                console.log("chocaron con",c);
            }
        });

    }

    chocoUnEnemigo(){
        this.lives--;
    }

    chocoUnaMoneda(moneda){
        moneda.animate()
        this.points += moneda.getPoints();
    }

    keyEvent(key){
        if(key == " "){
            this.mainCharacter.jump();
        }
    }


}