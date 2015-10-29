class Renderer {
  constructor(context) {
    this.context = context;

    for (let key in context) {
      if (this[key]) continue;
      if (typeof(context[key]) !== 'function') continue;
      this[key] = context[key].bind(context);
    }
  }

  translate(x, y) {
    let adjustedHeight = 0 - y;
    x = adjustedHeight + x;
    this.context.translate(x, y);
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
