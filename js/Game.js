/**
 * Coanstantes de estado del juego
*/

const GameStatus = {
    INIT : 'INIT',
    PLAYING : 'PLAYING',
    FINISHED : 'FINISHED'
}

//Variables del juego=> duración del juego en segundos y cantiada de vidas 5
const GAME_TIME_LIMIT = 50
const INITIAL_LIVES = 5

/**
 * ----------- CLASE  GAME ----------------
 */
class Game {

    // VARAIBLES DE LA CLASE
    status = GameStatus.INIT
    points = 0;
    lives = INITIAL_LIVES;
    mainCharacter;
    characters;
    timeElapsed = 0;
    lastLoop = 0;
    loopsForNextEnemy = 0;
    loopsForNextCoin = 0;

 // CONSTRUCTOR  DE LA CLASE GAME
 // Permite crear e inicializar los objetos derivados de una nueva instancia con:
 // Toma el nodo del DOM
 //instancia el objeto Avatar para jugar
 //crea el array donde se gurdan los Enemigos y Recompensas que se crean
 //se inicializan las pantallas del juego
    constructor(){
        this.gameNode = document.getElementById('game');
        this.mainCharacter =  new Avatar();        
        this.characters = [];
        this.createGameInfo();
        this.createStartScreen();
        this.createInformationScreen();
        this.createEndScreen();
    }

    /**
     * Inicializa las variables del juego
     * muestra la pantalla de inicio,esconde la pantalla final, el personaje principal y la informacion del juego
     * vacia el array de caractéres
     * responde al evento de click del botón de la pantalla inicio para mostrar las instrucciones
     * No tiene música
     */

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
    }

    /**
     * muestra la pantalla con las instrucciones y los valores de cada premio
     * esconde la pantalla de inicio
     * Sin música
     * responde al evento de click del botón de la pantalla instruciones  para iniciar el juego
     */
    showInstructions(){
        this.informationScreen.show();
        this.startScreen.hide();
        this.informationScreen.setOnPlayClickedListener(()=> this.playGame());
    }

    /**
     * Muestra el personaje principal corriendo, los datos en pantalla,
     * Esconde las Instrucciones 
     * inicia la música de fondo
     * cambia el estado del juego a PLAYING
     */

    playGame(){
        this.mainCharacter.show();
        this.mainCharacter.run();
        this.gameInfo.show();
        this.lastLoop =  Date.now();
        this.informationScreen.hide();
        this.status = GameStatus.PLAYING;
        this.playSong();
    }

    /**
     * Devuelve una referencia al elemento  de audio por su id
     * Reproduce la musica al 50% del volumen del dispositivo donde se inicie el juego
     */
    playSong(){
        this.gameSong = document.getElementById("gameSong")
        this.gameSong.volume = 0.5
        this.gameSong.play()
    }

    /**
     * Pausa la música de fondo
     */
    stopSong(){
        this.gameSong.pause()
    }
    /**
     * Controla si el juego tiene vidas o  tiempo de juego para continuar jugando
     * si se cumple alguna de las condiciones llama a finalizar el juego.
     */

    checkGameFinished(){
        if(this.lives == 0 || this.timeElapsed / 1000  > GAME_TIME_LIMIT){
            this.finishGame();
        }
    }

    /**
     * Cambia el estado del juego, vacia el array de personajes
     * el peronaje principal muere y se esconde
     * Se esconde la pantalla de datos 
     * la pantalla de fin se muestra, finalizando la música
     * responde al evento de click del botón de la pantalla final  para  reiniciar el juego
     */
    finishGame(){
        this.status = GameStatus.FINISHED
        this.cleanAllChracters();
        this.mainCharacter.die()
        this.mainCharacter.hide();
        this.gameInfo.hide();
        this.endScreen.show();
        this.endScreen.setFinalScore(this.calculateFinalScore())
        this.endScreen.setOnPlayAgainClickedListener(() => this.initGame());
        this.stopSong();
    }

    /**
     * Estados en los que puede estar el juego durante el loop
     * Estado: PLAYING llama al método que inicia el loop del juego
     */
    
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

    /**
     *   Métodos para crear instanciando  las pantallas agregando  un nuevo nodo al final de la lista 
     */
    //Crea Pantalla Inicio 
    createStartScreen(){
        this.startScreen = new StartScreen();
        this.gameNode.appendChild(this.startScreen.getNode());
    }

    //Crea Pantalla con información del juego
    createInformationScreen(){
        this.informationScreen = new InformationScreen();
        this.gameNode.appendChild(this.informationScreen.getNode());
    }

    //Crea Pantalla con datos de vidas, puntaje y tiempo durante el juego
    createGameInfo(){
        this.gameInfo =  new GameInfo();
        this.gameNode.appendChild(this.gameInfo.getNode());
    }

    //Crea Pantalla Fin del juego    
    createEndScreen(){
        this.endScreen = new EndScreen();
        this.gameNode.appendChild(this.endScreen.getNode());
    }


    /**
     * Devuelve los elementos de una matriz que cumplen la condición  'no estan vivos'
     * Devuelve los elementos de una matriz que cumplen la condición  ' estan vivos'
     * Remueve del array caracteres los elementos que cumplen la condición 'no están vivos'
     */
    cleanDeadCharacters(){
        let deadCharacters = this.characters.filter(character => !character.getIsAlive()); 
        this.characters = this.characters.filter(character => character.getIsAlive());
        deadCharacters.forEach(character => character.getNode().remove());
    }

    //Remueve todos los caracteres del array
    cleanAllChracters(){
        this.characters.forEach(character => character.getNode().remove());
    }


    /**
     * Método que ejecuta el siguiente bloque de código, 20 veces por segundo
     * mientras el estado del juego es PLAYING
     */
    onLoopPlaying(){
        let deltaTime = (Date.now() - this.lastLoop );  // diferencial de tiempo transcurrido entre el tiempo actual y el ultimo loop
        this.timeElapsed += deltaTime;                  // tiempo transcurrido sumatoria de diferenciales de tiempo
        this.cleanDeadCharacters();                     //borra caracteres del array
        this.checkCollisions();                         //Chequea colisiones     
        this.createCharacters();                        //Crea caractéres dinámicamente
        this.updateGameInfo();                           //Actualiza valores del juego
        this.lastLoop = Date.now();                     //Inicializa la variable lastloop
        this.checkGameFinished();                       //Chequea si el juego terminó en el ultimo loop
    }

    /**
     * Actualiza los valores de la pantalla de juego
     */
    updateGameInfo(){
        this.gameInfo.setLives(this.lives)
        this.gameInfo.setPoints(this.points)
        this.gameInfo.setTimeElapsed(this.timeElapsed)
    }

    /** Crea caracteres en diferentes divs con clases que representan a una enemigo un premio
     * los mismos se van encolando a medida que se crean dinámicamente
     */
    createCharacters(){
        this.generateEnemy()
        this.generateReward()
    }

/**
 * Agrega elementos al array y estos se muestran en el DOM
 */
    addCharacter(character){
        this.characters.push(character);
        this.gameNode.appendChild(character.getNode())
    }


    /**
     * Toma el valor de la tecla presionada y si es la barra espaciadora
     * el caracter principal salta
     */
    keyEvent(key){
        if(key == " "){
            this.mainCharacter.jump();
        }
    }

    /**
     * Colisiones con Enemigos= Resta una vida por haber colisionado
     * el caracter principal cae
     */
    onEnemyCollision(){
        this.lives--;
        this.points += EnemiesValue.FALL;
        this.mainCharacter.fall();  
    }   


    /**
     * Colisiones con premios= suma puntos acorde al tipo de premio colisionado
     */
    onRewardCollision(typeOfReward){
        if(typeOfReward == 'coin'){
            this.points += RewardsValue.COIN;
        }else if(typeOfReward == 'star'){
            this.points += RewardsValue.STAR;
        } else {
            this.lives++;
        }
    }

    /**
     * 
     * @returns Función para calcular el puntaje final,
     * se suma la cantiada de vidas restantes multiplicada por 10
     */
    calculateFinalScore(){
        let finalScore = this.points + (this.lives * RewardsValue.REMAINING_LIVES);
        return finalScore
    }

    /**
     * Para cada caracter, chequea si hubo colicsión con el personaje principal
     * colisión con enemigo reproduceun efecto diferente para cada tipo
     * colisión con premios reproduce un  efecto musical, setea el valor de collide  
     * ambas llaman a métodos para actualizar la pantalla de puntajes del juego
     */
    checkCollisions(){
        this.characters.forEach(c => {
            if(this.mainCharacter.collidesWith(c)){
                if(c.getName() == "Enemy" && !c.getHasCollided()){
                    c.setHasCollided(true, c.type);
                    this.onEnemyCollision();
                }
                if(c.getName() == "Reward" && !c.getHasCollided()){
                    c.setHasCollided(true);
                    c.setHasCollidedSound(true,c.type);
                    let typeOfReward = c.type;
                    this.onRewardCollision(typeOfReward);
                }
            }
        });

    }

    /**
     * Crea enemigos de manera tal que no hay mas de un enemigos en pantalla
     */
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

    /**
     * Crea premios de manera tal que no hay mas de un premio en pantalla
     */
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