import GridState from "./GridState";

export default class GridAdapter {
  private gridState: GridState;

  constructor(gridState: GridState) {
    this.gridState = gridState;
  }

  toggleCell(row: number, col: number) {
    const currentState = this.gridState.getGrid()[row][col];
    this.gridState.updateCell(row, col, !currentState);
  }

  getGrid() {
    return this.gridState.getGrid();
  }
}
