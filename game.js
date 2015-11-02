let $        = require('jquery');
let GameLoop = require('gameloop');
let as       = require('async');
let ak       = require('arcade_keys');

let assets   = require('./assets');
let Player   = require('./player')
let Renderer = require('./renderer');

class Cube {
  constructor(x, z, width, height, depth) {
    this.x      = x;
    this.z      = z;
    this.height = height;
    this.width  = width;
    this.depth  = depth;
  }

  update(delta, keys) {
    console.log('updating cube');
  }

  draw(renderer) {
    renderer.render(() => {
      renderer.context.fillStyle = '#F00';
      renderer.beginPath();
      [
        renderer.translation(
          this.x - this.width/2,
          0,
          this.z - this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          0,
          this.z - this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          this.height,
          this.z - this.depth/2),
        renderer.translation(
          this.x - this.width/2,
          this.height,
          this.z - this.depth/2)
      ].forEach((pos, idx) => {
        if (idx == 0) {
          return renderer.moveTo(pos.x, pos.y);
        }

        renderer.lineTo(pos.x, pos.y);
      });
      renderer.closePath();
      renderer.fill();
    });

    renderer.render(() => {
      renderer.context.fillStyle = '#FF0';
      renderer.beginPath();
      [
        renderer.translation(
          this.x + this.width/2,
          0,
          this.z - this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          this.height,
          this.z - this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          this.height,
          this.z + this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          0,
          this.z + this.depth/2)
      ].forEach((pos, idx) => {
        if (idx == 0) {
          return renderer.moveTo(pos.x, pos.y);
        }

        renderer.lineTo(pos.x, pos.y);
      });
      renderer.closePath();
      renderer.fill();
    });

    renderer.render(() => {
      renderer.context.fillStyle = '#0F0';
      renderer.beginPath();
      [
        renderer.translation(
          this.x - this.width/2,
          this.height,
          this.z - this.depth/2),
        renderer.translation(
          this.x - this.width/2,
          this.height,
          this.z + this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          this.height,
          this.z + this.depth/2),
        renderer.translation(
          this.x + this.width/2,
          this.height,
          this.z - this.depth/2)
      ].forEach((pos, idx) => {
        if (idx == 0) {
          return renderer.moveTo(pos.x, pos.y);
        }

        renderer.lineTo(pos.x, pos.y);
      });
      renderer.closePath();
      renderer.fill();
    });
  }
}

class Game {
  constructor(width, height) {
    this.width  = width;
    this.height = height;
    this.player = new Player();
    this.cubes  = [];
    this.cubes.push(new Cube(100, 100, 20, 20, 20));
  }

  clearScreen(renderer) {
    renderer.clearRect(
      0, 0,
      this.width, this.height);
  }

  draw(renderer) {
    this.clearScreen(renderer);
    this.player.draw(renderer);

    // Draw user location
    renderer.drawTextAt(
      30, 30,
      `x: ${this.player.x} z: ${this.player.z}`,
      { font: "20px Verdana"});

    this.cubes.forEach((cube) => {
      cube.draw(renderer);
    });
  }

  update(delta, keys) {
    this.player.update(delta, keys);
  }
}

function startGame() {
  let $body = $('body');
  let $canvas = $('<canvas />');

  $canvas.attr('height', 1000);
  $canvas.attr('width', 1000);
  $canvas.css('background-color', 'green');

  $body.append($canvas);

  let keys   = ak([
      ak.keys.up,
      ak.keys.down,
      ak.keys.right,
      ak.keys.left]);
  let game = new Game(1000, 1000);

  let context = $canvas[0].getContext('2d');

  let gameloop = new GameLoop({
    renderer: new Renderer(context)
  });

  gameloop.on('update', (dt) => {
    game.update(dt, keys);
  });

  gameloop.on('draw', (context) => {
    game.draw(context);
  });

  gameloop.start();
}

$(() => {
  as.forEachOf(
    assets,
    (asset, key, done) => {
      let image = new Image();

      image.onload = () => {
        asset.image = image;
        done();
      };

      image.src = asset.url;
    },
    (err) => {
      startGame();
    }
  );
});
