let Cube = require('./cube');

class FallingCube extends Cube {
  constructor(x, y, z, width, height, depth) {
    super(x, y, z, width, height, depth);
    this.step = 100;
  }

  update(delta, keys) {
    if (this.y <= 0) return;

    this.y -= (this.step * delta);
  }
}

module.exports = FallingCube;
