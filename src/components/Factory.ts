class PatternFactory {
  static createPattern(type: string): boolean[][] {
    switch (type) {
      case "glider":
        return [
          [false, true, false],
          [false, false, true],
          [true, true, true],
        ];
      case "block":
        return [
          [true, true],
          [true, true],
        ];
      default:
        throw new Error("Unknown pattern type");
    }
  }
}
