let $        = require('jquery');
let GameLoop = require('gameloop');
let as       = require('async');
let ak       = require('arcade_keys');

let assets   = require('./assets');
let Player   = require('./player')
let Renderer = require('./renderer');

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
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
      `x: ${this.player.x} y: ${this.player.y}`,
      { font: "20px Verdana"});
  }

  update(delta, keys) {
    this.player.update(delta, keys);
  }
}

function startGame() {
  let $body = $('body');
  let $canvas = $('<canvas />');

  $canvas.attr('height', 800);
  $canvas.attr('width', 1200);
  $canvas.css('background-color', 'green');

  $body.append($canvas);

  let keys   = ak([
      ak.keys.up,
      ak.keys.down,
      ak.keys.right,
      ak.keys.left]);
  let game = new Game(1200, 800);

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
