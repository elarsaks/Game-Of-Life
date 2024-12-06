// ============================================================================
// Game Setup
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
