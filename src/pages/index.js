import React, { Component } from 'react';
import paper from 'paper';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

const Canvas = styled("canvas")({
  width: "100%",
  height: "100vh"
});

class Home extends Component {
    componentDidMount() {
        const { theme: { grid: { breakpoints: { mobile, tablet, desktop, large } } } } = this.props;
        const c = document.getElementById("homeCanvas");
        const { scrollWidth, scrollHeight } = c;
        paper.setup(c);

        let xPoints;
        if (scrollWidth <= mobile) {
            xPoints = 7;
        } else if (scrollWidth <= tablet) {
            xPoints = 12;
        } else if (scrollWidth <= desktop) {
            xPoints = 16;
        } else if (scrollWidth <= large) {
            xPoints = 20;
        } else {
            xPoints = 22;
        }
        const size = Math.ceil(scrollWidth / xPoints);
        const yPoints = Math.ceil(scrollHeight / size);

        const g = new Grid(xPoints + 1, yPoints + 1, size, size);
        const areas = g.getShapeAreas();
        areas.forEach(area => {
            const shape = createRandomShape(area);
            shape.fillColor = "black";
        });

        paper.view.draw();
    }

    render() {
        return <Canvas id="homeCanvas" />;
    }
}

export default withTheme(Home);

// TODO ES6-ify helper functions and move them into a separate file.
function MPoint(x, y) {
  this.x = x;
  this.y = y;
  this.occupied = false;
}

MPoint.prototype.occupy = function() {
  this.occupied = true;
};

MPoint.prototype.isOccupied = function() {
  return this.occupied;
};

function createShapeArea(matrixX, matrixY, matrixXSize, matrixYSize, matrixXN, matrixYN) {
  return {
    x: matrixX * matrixXSize,
    y: matrixY * matrixYSize,
    w: matrixXSize * matrixXN,
    h: matrixYSize * matrixYN
  };
}

function Grid(w, h, xSize, ySize) {
  var ys = [];
  for (var y = 0; y < h; y++) {
    var xs = [];
    for (var x = 0; x < w; x++) {
      xs.push(new MPoint(x, y));
    }
    ys.push(xs);
  }
  this.data = ys;
  this.w = w;
  this.h = h;
  this.xSize = xSize;
  this.ySize = ySize;
}

Grid.prototype.exists = function(x, y) {
  return y < this.h && y > -1 && x < this.w && x > -1;
};

Grid.prototype.getUnoccupiedPoints = function() {
  return this.data.reduce(function(accum, points) {
    points.forEach(function(p) {
      if (!p.isOccupied()) {
        accum.push(p);
      }
    });
    return accum;
  }, []);
};

Grid.prototype.hasOccupiedSpots = function(startX, startY, xN, yN) {
  for (var y = startY; y < startY + yN; y++) {
    for (var x = startX; x < startX + xN; x++) {
      if (!this.exists(x, y)) {
        return true;
      }
      var p = this.data[y][x];
      if (p.isOccupied()) {
        return true;
      }
    }
  }
  return false;
};

Grid.prototype.fillAndGetShapeArea = function(startX, startY, xN, yN) {
  // assumes every point exists and is not already occupied
  for (var y = startY; y < startY + yN; y++) {
    for (var x = startX; x < startX + xN; x++) {
      var p = this.data[y][x];
      p.occupy();
    }
  }

  return createShapeArea(startX, startY, this.xSize, this.ySize, xN, yN);
};

Grid.prototype.fillUpTo = function(x, y, xN, yN) {
  // TODO support filling max x & y separately
  var currentY = yN;
  var currentX = xN;
  while (this.hasOccupiedSpots(x, y, currentX, currentY)) {
    currentX--;
    currentY--;
  }
  return this.fillAndGetShapeArea(x, y, currentX, currentY);
};

Grid.prototype.getShapeAreas = function() {
  var shapeCanvases = [];
  var unoccupied = this.getUnoccupiedPoints();
  while (unoccupied.length) {
    var p = unoccupied[Math.floor(Math.random() * unoccupied.length)];
    var n = Math.ceil(1 + Math.random() * 3);
    var canvas = this.fillUpTo(p.x, p.y, n, n);
    shapeCanvases.push(canvas);
    unoccupied = this.getUnoccupiedPoints();
  }
  return shapeCanvases;
};

function createEllipse(area) {
  return new paper.Shape.Ellipse(
    new paper.Rectangle(new paper.Point(area.x, area.y), new paper.Size(area.w, area.h))
  );
}

function createTriangle1(area) {
  return new paper.Path({
    segments: [
      [area.x, area.y],
      [area.x, area.y + area.h],
      [area.x + area.w, area.y + area.h]
    ],
    closed: true
  });
}

function createTriangle2(area) {
  return new paper.Path({
    segments: [
      [area.x, area.y],
      [area.x + area.w, area.y],
      [area.x + area.w, area.y + area.h]
    ],
    closed: true
  });
}

function createTriangle3(area) {
  return new paper.Path({
    segments: [[area.x + area.w, area.y], [area.x, area.y], [area.x, area.y + area.h]],
    closed: true
  });
}

function createTriangle4(area) {
  return new paper.Path({
    segments: [
      [area.x, area.y + area.h],
      [area.x + area.w, area.y + area.h],
      [area.x + area.w, area.y]
    ],
    closed: true
  });
}

function createRectangle(area) {
  return new paper.Path({
    segments: [
      [area.x, area.y],
      [area.x, area.y + area.h],
      [area.x + area.w, area.y + area.h],
      [area.x + area.w, area.y]
    ],
    closed: true
  });
}

var shapeFuncs = [
  createEllipse,
  createRectangle,
  createTriangle1,
  createTriangle2,
  createTriangle3,
  createTriangle4
];

function createRandomShape(area) {
  return shapeFuncs[Math.floor(Math.random() * shapeFuncs.length)](area);
}
