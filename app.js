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

  const board = new BoardBuilder()
    .setRows(rows)
    .setCols(cols)
    .setInitializer(() => CellFactory.createDeadCell())
    .build();

  const adapter = new CanvasAdapter(canvas, CELL_HEIGHT);
  const displayObserver = new DisplayObserver(adapter);
  board.addObserver(displayObserver);

  const game = new Game();
  game.init(board);
  board.notifyObservers(); // Initial draw
  game.randomize();
  game.start(150);

  const buttonActions = {
    randomizeBtn: () => game.randomize(),
    startBtn: () => game.start(150),
    pauseBtn: () => game.pause(),
  };

  Object.keys(buttonActions).forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener("click", buttonActions[id]);
  });

  strategySelect.addEventListener("change", (event) => {
    game.setStrategy(event.target.value);
  });
});
