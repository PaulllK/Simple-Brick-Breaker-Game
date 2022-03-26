import Game from "./game.js";

const canvas = document.querySelector("#game_screen");
const ctx = canvas.getContext("2d");

const gameInfo = document.querySelector("#info_about_game");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

gameInfo.style.width = GAME_WIDTH;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.drawImage(
    document.querySelector("#img_background"),
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT
  );

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
