// ============================================================================
// State Pattern for Cells
// ============================================================================
class CellState {
  constructor() {}
  isAlive() {
    return false;
  }
  nextState(aliveNeighbors) {
    return this;
  } // Overridden by subclasses.
}

class AliveState extends CellState {
  isAlive() {
    return true;
  }
  nextState(aliveNeighbors) {
    // Standard Conway rules for alive cell:
    // Dies if it has fewer than 2 or more than 3 live neighbors
    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
      return new DeadState();
    }
    return this;
  }
}

class DeadState extends CellState {
  isAlive() {
    return false;
  }
  nextState(aliveNeighbors) {
    // Standard Conway rules for dead cell:
    // Becomes alive if it has exactly 3 live neighbors
    if (aliveNeighbors === 3) {
      return new AliveState();
    }
    return this;
  }
}

// ============================================================================
// Cell (using the State pattern internally)
// ============================================================================
class Cell {
  constructor(initialState) {
    this.state = initialState;
  }

  isAlive() {
    return this.state.isAlive();
  }

  setState(state) {
    this.state = state;
  }

  // Determine next state based on alive neighbors
  next(aliveNeighbors) {
    this.state = this.state.nextState(aliveNeighbors);
  }
}

// ============================================================================
// Factory Pattern: CellFactory for creating cells
// ============================================================================
class CellFactory {
  static createAliveCell() {
    return new Cell(new AliveState());
  }

  static createDeadCell() {
    return new Cell(new DeadState());
  }
}

// ============================================================================
// Strategy Pattern: Define an interface for rules and a concrete strategy
// ============================================================================
class RulesStrategy {
  // Given the board and a position, calculates the next state of that cell
  // This is an interface method to be overridden.
  nextCellState(board, x, y) {
    throw "Not Implemented";
  }
}

class ClassicConwayStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);
    // The cell determines its own next state based on neighbors:
    const nextCell = new Cell(cell.state);
    nextCell.next(neighbors);
    return nextCell.state;
  }
}

// ============================================================================
// Observer Pattern: Observers watch board changes
// ============================================================================
class Observer {
  update(board) {
    // To be implemented by concrete observers
  }
}

class DisplayObserver extends Observer {
  constructor(adapter) {
    super();
    this.adapter = adapter;
  }
  update(board) {
    this.adapter.draw(board);
  }
}

// ============================================================================
// Adapter Pattern: Adapter for rendering (Canvas in this case)
// ============================================================================
class CanvasAdapter {
  constructor(canvas, cellSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cellSize = cellSize;
  }

  draw(board) {
    const rows = board.rows;
    const cols = board.cols;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board.getCell(x, y).isAlive()) {
          this.ctx.fillStyle = "black";
        } else {
          this.ctx.fillStyle = "white";
        }
        this.ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
    // Draw grid lines (optional)
    this.ctx.strokeStyle = "#ccc";
    for (let i = 0; i <= cols; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, rows * this.cellSize);
      this.ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j * this.cellSize);
      this.ctx.lineTo(cols * this.cellSize, j * this.cellSize);
      this.ctx.stroke();
    }
  }
}

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

// ============================================================================
// Singleton Pattern: Game class
// ============================================================================
class Game {
  constructor() {
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;

    this.board = null;
    this.strategy = new ClassicConwayStrategy();
    this.interval = null;
    return this;
  }

  init(board) {
    this.board = board;
  }

  start(speed = 200) {
    if (this.interval) return; // Already running
    this.interval = setInterval(() => {
      this.tick();
    }, speed);
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  tick() {
    if (!this.board) return;
    this.board.update(this.strategy);
  }

  randomize() {
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        const alive = Math.random() < 0.3;
        this.board.setCell(
          x,
          y,
          alive ? CellFactory.createAliveCell() : CellFactory.createDeadCell()
        );
      }
    }
    this.board.notifyObservers();
  }

  clear() {
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        this.board.setCell(x, y, CellFactory.createDeadCell());
      }
    }
    this.board.notifyObservers();
  }
}

// ============================================================================
// Setup code
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");

  // Use a builder to create the initial board
  const board = new BoardBuilder()
    .setRows(25)
    .setCols(25)
    .setInitializer(() => {
      return CellFactory.createDeadCell();
    })
    .build();

  // Create an adapter for rendering
  const adapter = new CanvasAdapter(canvas, 20);

  // Add an observer for the board to redraw when updated
  const displayObserver = new DisplayObserver(adapter);
  board.addObserver(displayObserver);

  // Create or get the singleton game instance
  const game = new Game();
  game.init(board);
  board.notifyObservers(); // initial draw

  // Controls
  document.getElementById("startBtn").addEventListener("click", () => {
    game.start(200);
  });

  document.getElementById("pauseBtn").addEventListener("click", () => {
    game.pause();
  });

  document.getElementById("randomBtn").addEventListener("click", () => {
    game.randomize();
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    game.clear();
  });
});
