// ============================================================================
// Factory Pattern: CellFactory for creating cells
// ============================================================================
class CellFactory {
  static createAliveCell() {
    return new Cell(new AliveState());
  }

  static createDeadCell() {
    return new Cell(new DeadState());
  }
}
