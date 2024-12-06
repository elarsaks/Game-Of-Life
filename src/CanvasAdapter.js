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
