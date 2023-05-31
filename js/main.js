"use strict";


/**
 * Variables 
 */
let game = new Game();

/**
 * Instancia la clase Game para iniciar el juego
 */
game.initGame()


/**
 * Evento de presionar cualquier tecla para evaluar
 * una posible acción/animación del avatar durante el juego.
*/

document.addEventListener('keydown', (e) => {
    game.keyEvent(e.key);
});

/* ----------------------------------------------

/* cada 50 milisegundos verifica estado del juego => 20 loops  por segundo */
setInterval(gameLoop, 50);

/**
 * Simular el paso del tiempo
 */
function gameLoop() {
    game.onLoop();
}
