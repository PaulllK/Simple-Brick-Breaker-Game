import {
  detectCollision,
  updateBallTrajectory,
} from "./collision-detection.js";

export default class Ball {
  constructor(game) {
    this.image = document.querySelector("#img_ball");
    this.game = game;

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.size = 20;

    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 400,
    };

    this.speed = {
      x: 6,
      y: -7,
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    // left or right wall collision
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // top wall collision
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y > this.gameHeight - this.size) {
      this.game.lives--;
      this.reset();
    }

    //collision with paddle
    updateBallTrajectory(
      this,
      this.game.paddle,
      detectCollision(this, this.game.paddle)
    );

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
