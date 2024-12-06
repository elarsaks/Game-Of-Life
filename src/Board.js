// ============================================================================
// Board class that manages cells and notifies observers
// ============================================================================
class Board {
  constructor(rows, cols, cells) {
    this.rows = rows;
    this.cols = cols;
    this.cells = cells;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    for (const obs of this.observers) {
      obs.update(this);
    }
  }

  getCell(x, y) {
    return this.cells[y][x];
  }

  setCell(x, y, cell) {
    this.cells[y][x] = cell;
  }

  getAliveNeighborCount(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
          if (this.getCell(nx, ny).isAlive()) {
            count++;
          }
        }
      }
    }
    return count;
  }

  update(rules) {
    // Apply rules to each cell and create a new state:
    const newCells = [];
    for (let y = 0; y < this.rows; y++) {
      const newRow = [];
      for (let x = 0; x < this.cols; x++) {
        const newState = rules.nextCellState(this, x, y);
        const newCell = new Cell(newState);
        newRow.push(newCell);
      }
      newCells.push(newRow);
    }
    this.cells = newCells;
    this.notifyObservers();
  }
}
