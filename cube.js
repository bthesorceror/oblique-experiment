function renderPointsToPath(renderer, points) {
  renderer.beginPath();
  points.map((point) => {
    return renderer
      .translation(point.x, point.y, point.z);
  }).forEach((pos, idx) => {
    if (idx == 0) {
      return renderer.moveTo(pos.x, pos.y);
    }

    renderer.lineTo(pos.x, pos.y);
  });
  renderer.closePath();
}

function renderSide(renderer, points, color) {
  renderer.render(() => {
    renderer.context.fillStyle = color;
    renderPointsToPath(renderer, points);
    renderer.fill();
  });
}

class Cube {
  constructor(x, y, z, width, height, depth) {
    this.x      = x;
    this.y      = y;
    this.z      = z;
    this.height = height;
    this.width  = width;
    this.depth  = depth;
  }

  update(delta, keys) {
    console.log('updating cube');
  }

  draw(renderer) {
    let points1 = [
    {
      x: this.x - this.width/2,
      y: this.y + 0,
      z: this.z - this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + 0,
      z: this.z - this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + this.height,
      z: this.z - this.depth/2
    },
    {
      x: this.x - this.width/2,
      y: this.y + this.height,
      z: this.z - this.depth/2
    }
    ];
    renderSide(renderer, points1, '#F00');

    let points2 = [
    {
      x: this.x + this.width/2,
      y: this.y + 0,
      z: this.z - this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + this.height,
      z: this.z - this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + this.height,
      z: this.z + this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + 0,
      z: this.z + this.depth/2
    }
    ];
    renderSide(renderer, points2, '#FF0');

    let points3 = [
    {
      x: this.x - this.width/2,
      y: this.y + this.height,
      z: this.z - this.depth/2
    },
    {
      x: this.x - this.width/2,
      y: this.y + this.height,
      z: this.z + this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + this.height,
      z: this.z + this.depth/2
    },
    {
      x: this.x + this.width/2,
      y: this.y + this.height,
      z: this.z - this.depth/2
    }
    ];
    renderSide(renderer, points3, '#0F0');
  }
}

module.exports = Cube;
