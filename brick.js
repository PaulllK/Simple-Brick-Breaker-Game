import {
  detectCollision,
  updateBallTrajectory,
} from "./collision-detection.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.querySelector("#img_brick");
    this.game = game;

    this.position = position;

    // max number of bricks per row
    this.maxPerRow = 6;

    // margin x: left and right ; margin y: top and bottom
    this.space = {
      x: 30,
      y: 30,
    };

    // a max of 'this.maxPerRow' bricks per row, ''this.space.x' being the space (margin) from the left and the right of the brick
    this.width =
      (game.gameWidth - this.space.x) / this.maxPerRow - this.space.x;
    this.height = this.width / 2.6; // kept the ratio of the brick image

    // max number of complete bricks from top to the middle of the height of the canvas
    this.maxPerColumn = Math.floor(
      game.gameHeight / 2 / (this.space.y + this.height)
    );

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    let collided = detectCollision(this.game.ball, this);

    if (collided) {
      this.markedForDeletion = true;
      updateBallTrajectory(this.game.ball, this, collided);
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
