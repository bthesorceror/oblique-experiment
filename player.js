let ak = require('arcade_keys');
let assets = require('./assets');

class Player {
  constructor(keys) {
    this.currentInterval = 0;
    this.currentState = 'down';
    this.currentStep  = 0;
    this.x = 100;
    this.y = 10;
    this.numberOfSteps = 2;
    this.scale = 2;
  }

  incrementInterval(dt) {
    this.currentInterval += (dt * 1000);

    if (this.currentInterval > 200) {
      this.currentInterval = 0;
      this.currentStep = (this.currentStep + 1) % this.numberOfSteps;
    }
  }

  move(dt) {
    let value = 100 * dt;
    let angledValue = 0.5 * value * Math.sqrt(2);

    if (this.currentState == 'up') {
      this.y -= value;
    } else if (this.currentState == 'left') {
      this.x -= value;
    } else if (this.currentState == 'right') {
      this.x += value;
    } else if (this.currentState == 'down-right') {
      this.x += angledValue; this.y += angledValue;
    } else if (this.currentState == 'down-left') {
      this.x -= angledValue; this.y += angledValue;
    } else {
      this.y += value;
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
      'down-right'
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
    renderer.save();
    renderer.translate(this.x, this.y);
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
  }
}

module.exports = Player;
