import React, { useState, useEffect } from "react";
import GridState from "./GridState.ts";

const GameOfLife: React.FC = () => {
  const gridState = GridState.getInstance(10, 10);
  const gridAdapter = new GridAdapter(gridState);
  const [grid, setGrid] = useState(gridAdapter.getGrid());

  useEffect(() => {
    const observer = new GridObserver();
    observer.subscribe(() => setGrid([...gridAdapter.getGrid()]));
  }, []);

  const toggleCell = (row: number, col: number) => {
    gridAdapter.toggleCell(row, col);
    setGrid([...gridAdapter.getGrid()]);
  };

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: cell ? "black" : "white",
                border: "1px solid gray",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameOfLife;
