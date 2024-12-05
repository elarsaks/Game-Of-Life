class GridBuilder {
  private rows: number = 10;
  private cols: number = 10;

  setRows(rows: number) {
    this.rows = rows;
    return this;
  }

  setCols(cols: number) {
    this.cols = cols;
    return this;
  }

  build(): boolean[][] {
    return Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(false));
  }
}
