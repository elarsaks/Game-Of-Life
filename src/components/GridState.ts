export default class GridState {
  private static instance: GridState;
  private grid: boolean[][];

  private constructor(rows: number, cols: number) {
    this.grid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false));
  }

  static getInstance(rows: number, cols: number): GridState {
    if (!GridState.instance) {
      GridState.instance = new GridState(rows, cols);
    }
    return GridState.instance;
  }

  getGrid() {
    return this.grid;
  }

  updateCell(row: number, col: number, state: boolean) {
    this.grid[row][col] = state;
  }
}
