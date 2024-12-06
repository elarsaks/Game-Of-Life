// ============================================================================
// State Pattern for Cells
// ============================================================================
class CellState {
  constructor() {}
  isAlive() {
    return false;
  }
  nextState(aliveNeighbors) {
    return this;
  } // Overridden by subclasses.
}

class AliveState extends CellState {
  isAlive() {
    return true;
  }
  nextState(aliveNeighbors) {
    // Standard Conway rules for alive cell:
    // Dies if it has fewer than 2 or more than 3 live neighbors
    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
      return new DeadState();
    }
    return this;
  }
}

class DeadState extends CellState {
  isAlive() {
    return false;
  }
  nextState(aliveNeighbors) {
    // Standard Conway rules for dead cell:
    // Becomes alive if it has exactly 3 live neighbors
    if (aliveNeighbors === 3) {
      return new AliveState();
    }
    return this;
  }
}

// ============================================================================
// Cell (using the State pattern internally)
// ============================================================================
class Cell {
  constructor(initialState) {
    this.state = initialState;
  }

  isAlive() {
    return this.state.isAlive();
  }

  setState(state) {
    this.state = state;
  }

  // Determine next state based on alive neighbors
  next(aliveNeighbors) {
    this.state = this.state.nextState(aliveNeighbors);
  }
}
