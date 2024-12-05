class GridObserver {
  private observers: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.observers.push(callback);
  }

  notify() {
    this.observers.forEach((callback) => callback());
  }
}
