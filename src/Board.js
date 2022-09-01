import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    // make an array of nrows length, then map each row to an array of ncols length
    // filled with true and false based on chanceLightStartsOn
    initialBoard = Array.from({ length: nrows })
         .map(x => Array.from({ length: ncols })
         .map(y => Math.random() <= chanceLightStartsOn));

    return initialBoard;
  }


  function hasWon() {
    // TODO: chaining EVERY???
    //check the board in state to determine whether the player has won.
    for (let r = 0; r < nrows; r++) {
      for (let c = 0; c < ncols; c++) {
        if (board[r][c] === true) {
          return false;
        }
      }
    }
    return true;

    //board.every(row.every(cell => cell === true));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(r => r.map(c => c));

      //in the copy, flip this cell and the cells around it
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x, boardCopy);

      //return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon() === true) {
    return <p>You Won</p>
  };

  // make table board

  //initialBoard.map(row => row.map(c => <Cell />))
  
  // [[T,F][T,F]] => map(row(T,F) => )
  
  return (
    <table>
      {board.map(
        (row, y) => <tr>{row.map(
          (cell, x) => <Cell flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell}/>)}</tr>)}
    </table>
  )
}

export default Board;
