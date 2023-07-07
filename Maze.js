import React, { useState } from 'react';

const Maze = () => {
  const [maze, setMaze] = useState([
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 1, 1, 1]
  ]);

  const solveMaze = () => {
  const copyMaze = [...maze]; // Create a copy of the maze

  const solve = (row, col) => {
    if (row === maze.length - 1 && col === maze[0].length - 1) {
      // Reached the destination
      return true;
    }

    if (row < 0 || col < 0 || row >= maze.length || col >= maze[0].length) {
      // Out of bounds
      return false;
    }

    if (copyMaze[row][col] === 0) {
      // Wall or already visited
      return false;
    }

    copyMaze[row][col] = 0; // Mark the current cell as visited

    // Recursively check all possible directions
    if (solve(row + 1, col)) return true; // Down
    if (solve(row - 1, col)) return true; // Up
    if (solve(row, col + 1)) return true; // Right
    if (solve(row, col - 1)) return true; // Left

    copyMaze[row][col] = 1; // Mark the current cell as unvisited (backtrack)
    return false;
  };

  solve(0, 0); // Start solving the maze from the top-left cell
  setMaze(copyMaze); // Update the maze state to reflect the solution
};


  return (
    <div>
      <h1>Rat in a Maze</h1>
      <button onClick={solveMaze}>Solve Maze</button>
      <div>
        {maze.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`cell ${cell === 0 ? 'wall' : 'path'}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maze;
