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
    this.strategy = null;
    this.strategies = {
      classicConway: new ClassicConwayStrategy(),
      dayAndNight: new DayAndNightStrategy(),
      diamoeba: new DiamoebaStrategy(),
      highLife: new HighLifeStrategy(),
      lifeWithoutDeath: new LifeWithoutDeathStrategy(),
      maze: new MazeStrategy(),
      replicator: new ReplicatorStrategy(),
      seeds: new SeedsStrategy(),
      twoByTwo: new TwoByTwoStrategy(),
      vote: new VoteStrategy(),
    };
    this.interval = null;
    return this;
  }

  init(board) {
    this.board = board;
    this.strategy = this.strategies.classicConway; // Default strategy
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
    if (!this.board || !this.strategy) return;
    this.board.update(this.strategy);
  }

  randomize() {
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        // TODO: configure the probability of a cell being alive based on the strategy
        const alive = Math.random() < 0.1;
        this.board.setCell(
          x,
          y,
          alive ? CellFactory.createAliveCell() : CellFactory.createDeadCell()
        );
      }
    }
    this.board.notifyObservers();
  }

  setStrategy(strategyKey) {
    this.strategy = this.strategies[strategyKey];
    this.board.notifyObservers();
  }
}
