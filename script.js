let cols, rows = 8;
let size = 0;
let cases = [];
let points = [];
let noirsImg = [];
let blancsImg = [];
let turn = 1;

function setup() {
  createCanvas(800, 800);
  size = width / 8;

  blancsImg['pion'] = loadImage("pieces/blancs/pion.png");
  blancsImg['tour'] = loadImage("pieces/blancs/tour.png");
  blancsImg['cavalier'] = loadImage("pieces/blancs/cavalier.png");
  blancsImg['fou'] = loadImage("pieces/blancs/fou.png");
  blancsImg['dame'] = loadImage("pieces/blancs/dame.png");
  blancsImg['roi'] = loadImage("pieces/blancs/roi.png");

  noirsImg['pion'] = loadImage("pieces/noirs/pion.png");
  noirsImg['tour'] = loadImage("pieces/noirs/tour.png");
  noirsImg['cavalier'] = loadImage("pieces/noirs/cavalier.png");
  noirsImg['fou'] = loadImage("pieces/noirs/fou.png");
  noirsImg['dame'] = loadImage("pieces/noirs/dame.png");
  noirsImg['roi'] = loadImage("pieces/noirs/roi.png");

  points.push(new Point(0, 6, 'pion', 'B'));
  points.push(new Point(1, 6, 'pion', 'B'));
  points.push(new Point(2, 6, 'pion', 'B'));
  points.push(new Point(3, 6, 'pion', 'B'));
  points.push(new Point(4, 6, 'pion', 'B'));
  points.push(new Point(5, 6, 'pion', 'B'));
  points.push(new Point(6, 6, 'pion', 'B'));
  points.push(new Point(7, 6, 'pion', 'B'));
  points.push(new Point(0, 7, 'tour', 'B'));
  points.push(new Point(7, 7, 'tour', 'B'));
  points.push(new Point(1, 7, 'cavalier', 'B'));
  points.push(new Point(6, 7, 'cavalier', 'B'));
  points.push(new Point(2, 7, 'fou', 'B'));
  points.push(new Point(5, 7, 'fou', 'B'));
  points.push(new Point(3, 7, 'dame', 'B'));
  points.push(new Point(4, 7, 'roi', 'B'));

  points.push(new Point(0, 1, 'pion', 'N'));
  points.push(new Point(1, 1, 'pion', 'N'));
  points.push(new Point(2, 1, 'pion', 'N'));
  points.push(new Point(3, 1, 'pion', 'N'));
  points.push(new Point(4, 1, 'pion', 'N'));
  points.push(new Point(5, 1, 'pion', 'N'));
  points.push(new Point(6, 1, 'pion', 'N'));
  points.push(new Point(7, 1, 'pion', 'N'));
  points.push(new Point(0, 0, 'tour', 'N'));
  points.push(new Point(7, 0, 'tour', 'N'));
  points.push(new Point(1, 0, 'cavalier', 'N'));
  points.push(new Point(6, 0, 'cavalier', 'N'));
  points.push(new Point(2, 0, 'fou', 'N'));
  points.push(new Point(5, 0, 'fou', 'N'));
  points.push(new Point(3, 0, 'dame', 'N'));
  points.push(new Point(4, 0, 'roi', 'N'));

  for (var i = 0; i <= 8; i++) {
    for (var j = 0; j <= 8; j++) {
      fill(100);
      if(j%2 == 0) {
        if(i%2 == 0) {
          fill(150);
        }
      } else {
        if(i%2 != 0) {
          fill(150);
        }
      }
      rect(i*size, j*size, size, size);
      cases.push(new Case(i, j, size));
    }
  }
}

function draw() {

  background(0);
  stroke(255);
  for (var i = 0; i <= 8; i++) {
    for (var j = 0; j <= 8; j++) {
      fill(100);
      if(j%2 == 0) {
        if(i%2 == 0) {
          fill(150);
        }
      } else {
        if(i%2 != 0) {
          fill(150);
        }
      }
      rect(i*size, j*size, size, size);
    }
  }

  noStroke();
  fill(0);
  // Afficher les numéros de case
  /*cases.forEach((c) => {
    text(c.x + ";" + c.y, c.rX + size/2, c.rY + size/2);
  });*/

  points.forEach((p) => {
    p.show();
  });

  points.forEach((point) => {
    if(mouseX < point.rX + point.size / 2 && mouseY < point.rY + point.size / 2 && mouseX > point.rX - point.size / 2 && mouseY > point.rY - point.size / 2) {
      if((turn == 1 && point.color == 'B') || (turn == 2 && point.color == 'N')) {
        point.size = 90;
        cases.forEach((c) => {
          if(point.canMove(c.x, c.y)) {
            if(canEat(c.x, c.y, point.color)) {
              fill('rgba(150, 100, 100, 0.4)');
              rect(c.rX, c.rY, size, size);
            } else {
              fill('rgba(100, 150, 100, 0.4)');
              rect(c.rX, c.rY, size, size);
            }
          }
        });
      }
    } else {
      point.size = 80;
    }
  });
}

function mousePressed() {
  points.forEach((point) => {
    if(mouseX < point.rX + point.size / 2 && mouseY < point.rY + point.size / 2 && mouseX > point.rX - point.size / 2 && mouseY > point.rY - point.size / 2) {
      if((turn == 1 && point.color == 'B') || (turn == 2 && point.color == 'N')) {
        point.move = true;
      }
    } else {
      point.move = false;
    }
  });
}

function mouseDragged() {
  points.forEach((point) => {
    if(point.move) {
      if((turn == 1 && point.color == 'B') || (turn == 2 && point.color == 'N')) {
        point.rX = mouseX;
        point.rY = mouseY;
      }
    }
  });
}

function mouseReleased() {
  points.forEach((point) => {
    if((turn == 1 && point.color == 'B') || (turn == 2 && point.color == 'N')) {
      rX = Math.trunc(point.rX/100)*100;
      rY = Math.trunc(point.rY/100)*100;
      x = rX / 100;
      y = rY / 100;

      var tempPoint;
      var tempX = point.x;
      var tempY = point.y;

      if(point.canMove(x, y)) {
        if(canEat(x, y, point.color)) {
          // Supprimer le pion
          points.forEach((p2, i) => {
            if(p2.x == x && p2.y == y) {
              tempPoint = points[i];
              points.splice(i, 1);
            }
          });
        }
        point.x = x;
        point.y = y;

        if((turn == 1 && isEchecFor('B')) || (turn == 2 && isEchecFor('N'))) {
          point.x = tempX;
          point.y = tempY;
          point.rX = point.x * size + size / 2;
          point.rY = point.y * size + size / 2;
          if(tempPoint != undefined) {
            points.push(tempPoint);
          }
          return false;
        }

        if(point.type == 'pion' && point.color == 'B' && point.y == 0) {
          point.type = 'dame';
        }
        if(point.type == 'pion' && point.color == 'N' && point.y == 7) {
          point.type = 'dame';
        }
        point.timesMoved += 1;
        turn = (turn % 2) + 1;

      }
      point.rX = point.x * size + size / 2;
      point.rY = point.y * size + size / 2;
    }
  });
}

class Point {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.rX = this.x * size + size / 2;
    this.rY = this.y * size + size / 2;
    this.size = 60;
    this.move = false;
    this.timesMoved = 0;
    this.type = type;
    this.color = color;
  }
  canMove(x, y) {
    // Si la case est occupée ou si elle est en dehors du jeu
    if(caseOccupied(x, y, this.color) || x > 7 || x < 0 || y > 7 || y < 0) {
      return false;
    }
    switch(this.type) {
      case 'pion':
        if(this.color == 'B') {
          if((x == this.x + 1 || x == this.x - 1) && y == this.y - 1 && canEat(x, y, this.color)) {
            return true;
          }
          if(x == this.x && y == this.y - 1 && !canEat(x, y, this.color)) {
            return true;
          }
          if(this.timesMoved == 0) {
            if(caseOccupied(x, y + 1, this.color)) {
              return false;
            }
            if(x == this.x && y == this.y - 2 && !canEat(x, y, this.color)) {
              return true;
            }
          }
        }
        else {
          if((x == this.x + 1 || x == this.x - 1) && y == this.y + 1 && canEat(x, y, this.color)) {
            return true;
          }
          if(x == this.x && y == this.y + 1 && !canEat(x, y, this.color)) {
            return true;
          }
          if(this.timesMoved == 0) {
            if(caseOccupied(x, y - 1, this.color)) {
              return false;
            }
            if(x == this.x && y == this.y + 2 && !canEat(x, y, this.color)) {
              return true;
            }
          }
        }
        break;
      case 'tour':
        // x ++
        if(x > this.x && y == this.y) {
          var pX = this.x;
          while(pX < x) {
            pX++;
            if(caseOccupied(pX, y, this.color) || canEat(pX - 1, y, this.color)) {
              return false;
            }
          }
          return true;
        }
        // x --
        if(x < this.x && y == this.y) {
          var pX = this.x;
          while(pX > x) {
            pX--;
            if(caseOccupied(pX, y, this.color) || canEat(pX + 1, y, this.color)) {
              return false;
            }
          }
          return true;
        }
        // y --
        if(y < this.y && x == this.x) {
          var pY = this.y;
          while(pY > y) {
            pY--;
            if(caseOccupied(x, pY, this.color) || canEat(x, pY + 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        // y ++
        if(y > this.y && x == this.x) {
          var pY = this.y;
          while(pY < y) {
            pY++;
            if(caseOccupied(x, pY, this.color) || canEat(x, pY - 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        break;
      case 'cavalier':
        if((x == this.x + 2 && y == this.y + 1) ||
          (x == this.x + 2 && y == this.y - 1) ||
          (x == this.x - 2 && y == this.y + 1) ||
          (x == this.x - 2 && y == this.y - 1) ||
          (x == this.x + 1 && y == this.y + 2) ||
          (x == this.x + 1 && y == this.y - 2) ||
          (x == this.x - 1 && y == this.y + 2) ||
          (x == this.x - 1 && y == this.y - 2)) {
          return true;
        }
        break;
      case 'fou':
        if(abs(x - this.x) == abs(y - this.y)) {
          var pX = this.x;
          var pY = this.y;
          while(pX < x && pY < y) {
            pX++;
            pY++;
            if(caseOccupied(pX, pY, this.color) || canEat(pX - 1, pY - 1, this.color)) {
              return false;
            }
          }
          while(pX > x && pY > y) {
            pX--;
            pY--;
            if(caseOccupied(pX, pY, this.color) || canEat(pX + 1, pY + 1, this.color)) {
              return false;
            }
          }
          while(pX > x && pY < y) {
            pX--;
            pY++;
            if(caseOccupied(pX, pY, this.color) || canEat(pX + 1, pY - 1, this.color)) {
              return false;
            }
          }
          while(pX < x && pY > y) {
            pX++;
            pY--;
            if(caseOccupied(pX, pY, this.color) || canEat(pX - 1, pY + 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        return false;
        break;
      case 'dame':
        if(abs(x - this.x) == abs(y - this.y)) {
          var pX = this.x;
          var pY = this.y;
          while(pX < x && pY < y) {
            pX++;
            pY++;
            if(caseOccupied(pX, pY, this.color) || canEat(pX - 1, pY - 1, this.color)) {
              return false;
            }
          }
          while(pX > x && pY > y) {
            pX--;
            pY--;
            if(caseOccupied(pX, pY, this.color) || canEat(pX + 1, pY + 1, this.color)) {
              return false;
            }
          }
          while(pX > x && pY < y) {
            pX--;
            pY++;
            if(caseOccupied(pX, pY, this.color) || canEat(pX + 1, pY - 1, this.color)) {
              return false;
            }
          }
          while(pX < x && pY > y) {
            pX++;
            pY--;
            if(caseOccupied(pX, pY, this.color) || canEat(pX - 1, pY + 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        // x ++
        if(x > this.x && y == this.y) {
          var pX = this.x;
          while(pX < x) {
            pX++;
            if(caseOccupied(pX, y, this.color) || canEat(pX - 1, y, this.color)) {
              return false;
            }
          }
          return true;
        }
        // x --
        if(x < this.x && y == this.y) {
          var pX = this.x;
          while(pX > x) {
            pX--;
            if(caseOccupied(pX, y, this.color) || canEat(pX + 1, y, this.color)) {
              return false;
            }
          }
          return true;
        }
        // y --
        if(y < this.y && x == this.x) {
          var pY = this.y;
          while(pY > y) {
            pY--;
            if(caseOccupied(x, pY, this.color) || canEat(x, pY + 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        // y ++
        if(y > this.y && x == this.x) {
          var pY = this.y;
          while(pY < y) {
            pY++;
            if(caseOccupied(x, pY, this.color) || canEat(x, pY - 1, this.color)) {
              return false;
            }
          }
          return true;
        }
        break;
      case 'roi':
        if(abs(x - this.x) <= 1 && abs(y - this.y) <= 1) {
          return true;
        }
        break;
    }

  }
  canRoque() {
    if(this.type == 'roi' && this.timesMoved == 0) {
      return true;
    }
  }
  show() {
    push();
    switch(this.type) {
      case 'pion':
        if(this.color == 'B')
          image(blancsImg['pion'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['pion'], this.rX - size / 2, this.rY - size / 2, size, size);
        break;
      case 'tour':
        if(this.color == 'B')
          image(blancsImg['tour'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['tour'], this.rX - size / 2, this.rY - size / 2, size, size);
          break;
      case 'cavalier':
        if(this.color == 'B')
          image(blancsImg['cavalier'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['cavalier'], this.rX - size / 2, this.rY - size / 2, size, size);
        break;
      case 'fou':
        if(this.color == 'B')
          image(blancsImg['fou'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['fou'], this.rX - size / 2, this.rY - size / 2, size, size);
        break;
      case 'dame':
        if(this.color == 'B')
          image(blancsImg['dame'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['dame'], this.rX - size / 2, this.rY - size / 2, size, size);
        break;
      case 'roi':
        if(this.color == 'B')
          image(blancsImg['roi'], this.rX - size / 2, this.rY - size / 2, size, size);
        if(this.color == 'N')
          image(noirsImg['roi'], this.rX - size / 2, this.rY - size / 2, size, size);
        break;
    }
    pop();
  }
}

// Vérifier si une case est occupée, si on peut faire le déplacement
function caseOccupied(x, y, c) {
  ret = false;
  points.forEach((p) => {
    if(p.x == x && p.y == y && p.color == c) {
      ret = true;
    }
  });
  return ret;
}

// Vérifier si on peut prendre le pion
function canEat(x, y, c) {
  ret = false;
  points.forEach((p) => {
    if(p.x == x && p.y == y && p.color != c) {
      ret = true;
    }
  });
  return ret;
}

// Vérifier un simple échec
function isEchecFor(color) {
  var ret = false;
  var oppColor;
  if(color == 'B') {
    oppColor = 'N';
  } else {
    oppColor = 'B';
  }

  var roiX;
  var roiY;
  points.forEach((p2) => {
    if(p2.color == color && p2.type == 'roi') {
      roiX = p2.x;
      roiY = p2.y;
    }
  });

  points.forEach((point) => {
    if(point.color == oppColor) {
      if(point.canMove(roiX, roiY, oppColor) && canEat(roiX, roiY, oppColor)) {
        ret = true;
      }
    }
  });
  return ret;
}
