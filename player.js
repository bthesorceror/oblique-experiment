let ak      = require('arcade_keys');
let assets  = require('./assets');
let globals = require('./globals');

class Player {
  constructor() {
    this.x                 = 500;
    this.z                 = 500;
    this.scale             = globals.scale;
    this.currentStep       = 0;
    this.currentState      = 'down';
    this.numberOfSteps     = 2;
    this.speedPerSecond    = 200;
    this.currentInterval   = 0;
    this.maxIntervalLength = 200;
  }

  incrementInterval(dt) {
    this.currentInterval += (dt * 1000);

    if (this.currentInterval > this.maxIntervalLength) {
      this.currentInterval = 0;
      this.currentStep = (this.currentStep + 1) % this.numberOfSteps;
    }
  }

  move(dt) {
    let value = this.speedPerSecond * dt;
    let angledValue = 0.5 * value * Math.cos(0.785398);

    if (this.currentState == 'up') {
      this.x -= angledValue * 2; this.z += value * 2;
    } else if (this.currentState == 'up-right') {
      this.z += value * 2;
    } else if (this.currentState == 'up-left') {
      this.x -= angledValue * 4; this.z += value * 2;
    } else if (this.currentState == 'left') {
      this.x -= value;
    } else if (this.currentState == 'right') {
      this.x += value;
    } else if (this.currentState == 'down-right') {
      this.x += angledValue * 4; this.z -= value * 2;
    } else if (this.currentState == 'down-left') {
      this.z -= value * 2;
    } else {
      this.x += angledValue * 2; this.z -= value * 2;
    }
  }

  update(dt, keys) {
    let pressed = true;

    if (keys.isPressed(ak.keys.down) &&
        keys.isPressed(ak.keys.right)) {
      this.currentState = 'down-right';
    } else if (keys.isPressed(ak.keys.down) &&
        keys.isPressed(ak.keys.left)) {
      this.currentState = 'down-left';
    } else if (keys.isPressed(ak.keys.up) &&
        keys.isPressed(ak.keys.left)) {
      this.currentState = 'up-left';
    } else if (keys.isPressed(ak.keys.up) &&
        keys.isPressed(ak.keys.right)) {
      this.currentState = 'up-right';
    } else if (keys.isPressed(ak.keys.up)) {
      this.currentState = 'up';
    } else if (keys.isPressed(ak.keys.down)) {
      this.currentState = 'down';
    } else if (keys.isPressed(ak.keys.left)) {
      this.currentState = 'left';
    } else if (keys.isPressed(ak.keys.right)) {
      this.currentState = 'right';
    } else {
      pressed = false;
    }

    if (!pressed) return;

    this.incrementInterval(dt);
    this.move(dt);
  }

  get sourceOffset() {
    let val = [
      'down',
      'up',
      'right',
      'left',
      'down-left',
      'down-right',
      'up-left',
      'up-right'
    ].indexOf(this.currentState);

    return this.sourceWidth * (this.numberOfSteps * val);
  }

  get sourceLocation() {
    return {
      x: this.sourceOffset + (this.sourceWidth * this.currentStep),
      y: 0,
    }
  }

  get asset() {
    return assets.nes;
  }

  get sourceWidth() {
    return this.asset.size.width;
  }

  get sourceHeight() {
    return this.asset.size.height;
  }

  get image() {
    return this.asset.image;
  }

  get drawWidth() {
    return this.sourceWidth * this.scale;
  }

  get drawHeight() {
    return this.sourceHeight * this.scale;
  }

  draw(renderer) {
    renderer.render(() => {
      let translation =
        renderer.translation(this.x, 0, this.z);
      renderer.translate(translation.x, translation.y)
      renderer.drawImage(
        this.image,
        this.sourceLocation.x,
        this.sourceLocation.y,
        this.sourceWidth,
        this.sourceHeight,
        (-this.drawWidth/2),
        (-this.drawHeight/2),
        this.drawWidth,
        this.drawHeight);
      renderer.restore();
    });
  }
}

module.exports = Player;
