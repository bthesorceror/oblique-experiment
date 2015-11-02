function translate(totalHeight, x, y, z) {
  let newX = x + 0.5 * z * Math.cos(0.785398);
  let newY = totalHeight - (y + 0.5 * z * Math.sin(0.785398));

  return { x: newX, y: newY };
}

class Renderer {
  constructor(context) {
    this.context     = context;
    this.totalWidth  = 1000;
    this.totalHeight = 1000;

    for (let key in context) {
      if (this[key]) continue;
      if (typeof(context[key]) !== 'function') continue;
      this[key] = context[key].bind(context);
    }
  }

  translation(x, y, z) {
    return translate(this.totalHeight, x, y, z);
  }

  render(cb) {
    this.context.save();
    cb(this);
    this.context.restore();
  }

  drawTextAt(x, y, text, options) {
    options = options || {};

    this.render((renderer) => {
      Object.keys(options).forEach((key) => {
        this.context[key] = options[key];
      });

      renderer.fillText(text, x, y);
    });
  }
}

module.exports = Renderer;
