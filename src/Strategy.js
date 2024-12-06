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

class ParameterizedRulesStrategy extends RulesStrategy {
  constructor(birthConditions, survivalConditions) {
    super();
    this.birthConditions = birthConditions; // Array of neighbor counts for birth
    this.survivalConditions = survivalConditions; // Array of neighbor counts for survival
  }

  nextCellState(board, x, y) {
    const cell = board.getCell(x, y);
    const neighbors = board.getAliveNeighborCount(x, y);

    const nextCell = new Cell(cell.state);

    // Determine if the cell should be alive in the next state.
    // - If it's currently dead, we check the birth conditions.
    // - If it's currently alive, we check the survival conditions.
    const shouldLive = cell.isAlive()
      ? this.survivalConditions.includes(neighbors)
      : this.birthConditions.includes(neighbors);

    // Set the next state based on whether the cell should live.
    nextCell.setState(shouldLive ? new AliveState() : new DeadState());

    return nextCell.state;
  }
}
// ============================================================================
// Strategy Implementations
// ============================================================================
class ClassicConwayStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3], [2, 3]); // B3/S23
  }
}

class HighLifeStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3, 6], [2, 3]); // B36/S23
  }
}

class SeedsStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([2], []); // B2/S0
  }
}

class LifeWithoutDeathStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3], [0, 1, 2, 3, 4, 5, 6, 7, 8]); // B3/S012345678
  }
}

class DayAndNightStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3, 6, 7, 8], [3, 4, 6, 7, 8]); // B3678/S34678
  }
}

class ReplicatorStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([1, 3, 5, 7], [1, 3, 5, 7]); // B1357/S1357
  }
}

class DiamoebaStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3, 5, 6, 7], [5, 6, 7, 8]); // B3567/S5678
  }
}

class MazeStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3], [1, 2, 3, 4, 5]); // B3/S12345
  }
}

class VoteStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([5, 6, 7, 8], [4, 5, 6, 7, 8]); // B5678/S45678
  }
}

class TwoByTwoStrategy extends ParameterizedRulesStrategy {
  constructor() {
    super([3, 6], [1, 2, 5, 6]); // B36/S1256
  }
}
