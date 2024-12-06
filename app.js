// ============================================================================
// Game Setup
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const canvasHeight = window.innerHeight * 0.85;
  const canvasWidth = window.innerWidth;
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  const cellHeight = 10;
  const rows = Math.floor(canvasHeight / cellHeight) + 1;
  const cols = Math.floor(canvasWidth / cellHeight) + 1;

  // Use a builder to create the initial board
  const board = new BoardBuilder()
    .setRows(rows)
    .setCols(cols)
    .setInitializer(() => CellFactory.createDeadCell())
    .build();

  // Create an adapter for rendering
  const adapter = new CanvasAdapter(canvas, 10);

  // Add an observer for the board to redraw when updated
  const displayObserver = new DisplayObserver(adapter);
  board.addObserver(displayObserver);

  // Create or get the singleton game instance
  const game = new Game();
  game.init(board);
  // TODO: Replace initial draw with randomize
  // board.notifyObservers(); // initial draw
  game.randomize();

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
