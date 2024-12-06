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
