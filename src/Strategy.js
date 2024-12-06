// ============================================================================
// Strategy Pattern: Define an interface for rules and a concrete strategy
// ============================================================================
class RulesStrategy {
  // Given the board and a position, calculates the next state of that cell
  // This is an interface method to be overridden.
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

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

class HighLifeStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // HighLife rules: B3/S23 + B6 (Born with 6 neighbors)
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && (neighbors === 3 || neighbors === 6)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.next(neighbors); // Default next state logic
    }
    return nextCell.state;
  }
}

class SeedsStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Seeds rules: B2/S0 (Born with 2 neighbors, no survival)
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && neighbors === 2) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState()); // Cells never survive
    }
    return nextCell.state;
  }
}

class LifeWithoutDeathStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Life Without Death rules: B3/S012345678 (Born with 3 neighbors, never dies)
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && neighbors === 3) {
      nextCell.setState(new AliveState());
    } else if (cell.isAlive()) {
      nextCell.setState(new AliveState()); // Always stays alive
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class DayAndNightStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Day & Night rules: B3678/S34678 (Born or survives with 3, 4, 6, 7, or 8 neighbors)
    const nextCell = new Cell(cell.state);
    if (cell.isAlive() && [3, 4, 6, 7, 8].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else if (!cell.isAlive() && [3, 6, 7, 8].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class ReplicatorStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Replicator rules: B1357/S1357 (Born or survives with an odd number of neighbors)
    const nextCell = new Cell(cell.state);
    if ([1, 3, 5, 7].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class DiamoebaStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Diamoeba rules: B3567/S5678
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && [3, 5, 6, 7].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else if (cell.isAlive() && [5, 6, 7, 8].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class MazeStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Maze rules: B3/S12345
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && neighbors === 3) {
      nextCell.setState(new AliveState());
    } else if (cell.isAlive() && [1, 2, 3, 4, 5].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class VoteStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Vote rules: B5678/S45678
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && [5, 6, 7, 8].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else if (cell.isAlive() && [4, 5, 6, 7, 8].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}

class TwoByTwoStrategy extends RulesStrategy {
  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    // Two-by-Two rules: B36/S1256
    const nextCell = new Cell(cell.state);
    if (!cell.isAlive() && [3, 6].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else if (cell.isAlive() && [1, 2, 5, 6].includes(neighbors)) {
      nextCell.setState(new AliveState());
    } else {
      nextCell.setState(new DeadState());
    }
    return nextCell.state;
  }
}
