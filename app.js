// ============================================================================
// Game Setup
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const strategySelect = document.getElementById("strategySelect");

  const CELL_HEIGHT = 10;
  const canvasHeight = window.innerHeight * 0.8;
  const canvasWidth = window.innerWidth;
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  const rows = Math.floor(canvasHeight / CELL_HEIGHT) + 1;
  const cols = Math.floor(canvasWidth / CELL_HEIGHT) + 1;

  const strategies = {
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

  // Use a builder to create the initial board
  const board = new BoardBuilder()
    .setRows(rows)
    .setCols(cols)
    .setInitializer(() => CellFactory.createDeadCell())
    .build();

  // Create an adapter for rendering
  const adapter = new CanvasAdapter(canvas, CELL_HEIGHT);
  const displayObserver = new DisplayObserver(adapter);
  board.addObserver(displayObserver);

  const game = new Game();
  game.init(board);
  game.strategy = strategies.classicConway;
  board.notifyObservers();

  const buttonActions = {
    startBtn: () => game.start(150),
    pauseBtn: () => game.pause(),
    randomBtn: () => game.randomize(),
    clearBtn: () => game.clear(),
  };

  Object.keys(buttonActions).forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", buttonActions[id]);
    } else {
      console.warn(`Button with ID '${id}' not found.`);
    }
  });

  strategySelect.addEventListener("change", (event) => {
    const selectedStrategy = strategies[event.target.value];
    if (selectedStrategy) {
      game.strategy = selectedStrategy;
      game.randomize();
      board.notifyObservers();
    } else {
      console.error("Invalid strategy selected:", event.target.value);
    }
  });

  window.addEventListener("resize", () => {
    const canvasHeight = window.innerHeight * 0.8;
    const canvasWidth = window.innerWidth;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    const rows = Math.floor(canvasHeight / CELL_HEIGHT) + 1;
    const cols = Math.floor(canvasWidth / CELL_HEIGHT) + 1;

    const newBoard = new BoardBuilder()
      .setRows(rows)
      .setCols(cols)
      .setInitializer(() => CellFactory.createDeadCell())
      .build();

    game.init(newBoard);
    board.notifyObservers();
  });
});
