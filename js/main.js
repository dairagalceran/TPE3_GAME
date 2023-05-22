"use strict";

let game = new Game();

game.start();

document.addEventListener('keydown', (e) => {
    game.keyEvent(e.key);
});

/* cada 50 milisegundos verifica estado del juego => 20 loops  por segundo */
setInterval(gameLoop, 100);

/**
 * Simular el paso del tiempo
 */
function gameLoop() {
    game.onLoop();
}
