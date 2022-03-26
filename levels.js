import Brick from "./brick.js";

export function buildLevel(game, level) {
  let bricks = [];

  // need to get brick dimensions (couldn't think of a better idea)
  const brickExample = new Brick(game, {
    x: -200, // out of the canvas
    y: 0,
  });

  const brickMarginX = brickExample.space.x,
    brickMarginY = brickExample.space.y;
  const maxBricksPerRow = brickExample.maxPerRow,
    maxBricksPerColumn = brickExample.maxPerColumn;

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (
        brick === 1 &&
        brickIndex < maxBricksPerRow &&
        rowIndex < maxBricksPerColumn
      ) {
        let l = bricks.length;

        let position = {
          // brickMarginX is the the space (margin) from the left and the right of the brick, 'maxBricksPerRow' bricks max per row
          x:
            brickMarginX +
            (brickIndex
              ? ((game.gameWidth - brickMarginX) / maxBricksPerRow) * brickIndex
              : 0),

          // brickMarginY is the the space (margin) from the top and the bottom of the brick
          y:
            brickMarginY +
            (rowIndex
              ? ((game.gameHeight / 2 - brickMarginY) / maxBricksPerColumn) *
                rowIndex
              : 0),
        };

        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

/*
mentions for the level:
    - complete the following arrays with maximum 'maxBricksPerRow' bricks per row and maximum 'maxBricksPerColumn'
      bricks per column, because the overplus of bricks will not be drawn at all (doesn't fit in the canvas)
    - 1 is for 'brick exists' and 0 is for 'no brick'
*/

export const levels = [
  // level 1
  [[0, 1, 0, 1, 0, 0]],

  // level 2
  [[1, 1, 1, 1, 1, 1]],

  //level 3
  [
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
  ],

  //level 4
  [
    [0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
  ],

  // level 5
  [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],

  // level 6
  [
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ],

  // level 7
  [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1],
  ],

  // level 8
  [
    [0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
  ],

  // level 9
  [
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1],
  ],

  // level 10
  [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
];
