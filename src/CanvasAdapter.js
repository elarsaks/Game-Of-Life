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
        const cell = board.getCell(x, y);

        cell.isAlive()
          ? (this.ctx.fillStyle = "#264af0")
          : (this.ctx.fillStyle = "white");

        this.ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }

    // Draw grid lines
    this.ctx.strokeStyle = "lightgray";

    const drawLine = (moveToX, moveToY, lineToX, lineToY) => {
      this.ctx.beginPath();
      this.ctx.moveTo(moveToX, moveToY);
      this.ctx.lineTo(lineToX, lineToY);
      this.ctx.stroke();
    };

    // Draw vertical lines
    for (let i = 0; i <= cols; i++) {
      drawLine(i * this.cellSize, 0, i * this.cellSize, rows * this.cellSize);
    }

    // Draw horizontal lines
    for (let j = 0; j <= rows; j++) {
      drawLine(0, j * this.cellSize, cols * this.cellSize, j * this.cellSize);
    }
  }
}
