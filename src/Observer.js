// ============================================================================
// Observer Pattern: Observers watch board changes
// ============================================================================
class Observer {
  update(board) {
    // To be implemented by concrete observers
  }
}

class DisplayObserver extends Observer {
  constructor(adapter) {
    super();
    this.adapter = adapter;
  }
  update(board) {
    this.adapter.draw(board);
  }
}
