import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "/brick.js";

import { buildLevel, levels } from "./levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  FINISHED: 5,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.gameObjects = [];
    this.bricks = [];

    this.levels = levels;

    this.gameInfo = [
      document.querySelector("#level").querySelector("h1"),
      document.querySelector("#lives").querySelector("h2"),
    ];

    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL &&
      this.gameState !== GAMESTATE.FINISHED
    )
      return;

    this.lives = 3;

    this.gameInfo[0].innerText = "Nivelul " + (this.currentLevel + 1);
    this.gameInfo[1].style["background-color"] = "palegreen";

    this.ball.reset();

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);

    this.gameObjects = [this.ball, this.paddle];

    this.gameState = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

    if (
      this.gameState === GAMESTATE.RUNNING ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      if (this.lives > 1) {
        this.gameInfo[1].innerHTML =
          "Vieți rămase: " +
          '<span style="color:#0072ff;">' +
          this.lives +
          "</span>";
      } else {
        this.gameInfo[1].innerHTML =
          "Vieți rămase: " +
          '<span style="color:red;">' +
          this.lives +
          "</span>";
        this.gameInfo[1].style["background-color"] = "gold";
      }
    }

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.FINISHED
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      if (this.currentLevel > this.levels.length - 1)
        this.gameState = GAMESTATE.FINISHED;
      else {
        this.gameState = GAMESTATE.NEWLEVEL;
        this.start();
      }
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    switch (this.gameState) {
      case GAMESTATE.RUNNING:
        [...this.gameObjects, ...this.bricks].forEach((object) =>
          object.draw(ctx)
        );

        break;

      case GAMESTATE.PAUSED:
        [...this.gameObjects, ...this.bricks].forEach((object) =>
          object.draw(ctx)
        );

        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Pauză", this.gameWidth / 2, this.gameHeight / 2);

        break;

      case GAMESTATE.MENU:
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          "Apasă SPACEBAR pentru a începe",
          this.gameWidth / 2,
          this.gameHeight / 2
        );

        break;

      case GAMESTATE.GAMEOVER:
        ctx.drawImage(
          document.querySelector("#img_gameover"),
          0,
          0,
          this.gameWidth,
          this.gameHeight
        );

        break;

      case GAMESTATE.FINISHED:
        document.querySelector("#info_about_game").style.display = "none";

        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          "Ai terminat toate nivelele :D",
          this.gameWidth / 2,
          this.gameHeight / 2
        );

        break;
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
