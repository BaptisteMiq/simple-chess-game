class Case {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.rX = x * size;
    this.rY = y * size;
    this.occupied = false;
  }
}
