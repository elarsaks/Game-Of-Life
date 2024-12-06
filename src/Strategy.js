// ============================================================================
// Strategy Pattern: Define an interface for rules and a concrete strategy
// ============================================================================
class RulesStrategy {
  // Given the board and a position, calculates the next state of that cell
  // This is an interface method to be overridden.
  nextCellState(board, x, y) {
    throw "Not Implemented";
  }
}

class ClassicConwayStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);
    // The cell determines its own next state based on neighbors:
    const nextCell = new Cell(cell.state);
    nextCell.next(neighbors);
    return nextCell.state;
  }
}
