const rows = 10;
const cols = 10;

// Initialize grid
let grid = Array.from({ length: rows }, () => Array(cols).fill(false));

const gridElement = document.getElementById("grid");
gridElement.style.gridTemplateRows = `repeat(${rows}, 20px)`;
gridElement.style.gridTemplateColumns = `repeat(${cols}, 20px)`;

// Render grid
function renderGrid() {
  gridElement.innerHTML = "";
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell) cellElement.classList.add("alive");

      cellElement.addEventListener("click", () => {
        grid[rowIndex][colIndex] = !grid[rowIndex][colIndex];
        renderGrid();
      });

      gridElement.appendChild(cellElement);
    });
  });
}

// Conway's Game of Life rules
function nextGeneration(grid) {
  const newGrid = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const liveNeighbors = countLiveNeighbors(grid, rowIndex, colIndex);
      if (cell) {
        return liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        return liveNeighbors === 3;
      }
    })
  );
  return newGrid;
}

function countLiveNeighbors(grid, row, col) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return directions.reduce((count, [dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      return count + (grid[newRow][newCol] ? 1 : 0);
    }
    return count;
  }, 0);
}

// Attach event listener to button
document.getElementById("next").addEventListener("click", () => {
  grid = nextGeneration(grid);
  renderGrid();
});

renderGrid();
