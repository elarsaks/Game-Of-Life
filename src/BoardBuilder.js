// ============================================================================
// Builder Pattern: BoardBuilder to create and configure the board
// ============================================================================
class BoardBuilder {
  constructor() {
    this.rows = 20;
    this.cols = 20;
    this.initializer = () => CellFactory.createDeadCell(); // By default all dead
  }

  setRows(rows) {
    this.rows = rows;
    return this;
  }

  setCols(cols) {
    this.cols = cols;
    return this;
  }

  setInitializer(fn) {
    this.initializer = fn;
    return this;
  }

  build() {
    const cells = [];
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push(this.initializer());
      }
      cells.push(row);
    }
    return new Board(this.rows, this.cols, cells);
  }
}
