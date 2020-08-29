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

function Board({ nrows, ncols, chanceLightStartsOn }) {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];
        const randVal = () => {
            //* TODO: create array-of-arrays of true/false values
            const randNum = Math.random()
            if (randNum >= chanceLightStartsOn) {
                return true;
            } else {
                return false;
            }
        }
        for (let i = 0; i < nrows; i++) {
            initialBoard.push([]);
            for (let j = 0; j < ncols; j++) {
                initialBoard[i].push(randVal())
            }
        }

        return initialBoard;
    }

    function hasWon() {
        let isWinner = false;
        //* TODO: check the board in state to determine whether the player has won.
        let check = board.filter(r => (
            r.includes(true)
        ))
        if (!check[0]) {
            isWinner = true
        }
        return isWinner
    }

    function flipCellsAroundMe(coord) {
        setBoard(oldBoard => {
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[x][y] = !boardCopy[x][y];
                }
            };

            //* TODO: Make a (deep) copy of the oldBoard
            let oldBoardCopy = JSON.parse(JSON.stringify(oldBoard))

            //* TODO: in the copy, flip this cell and the cells around it
            flipCell(x, y, oldBoardCopy);
            flipCell((x + 1), y, oldBoardCopy);
            flipCell((x - 1), y, oldBoardCopy);
            flipCell(x, (y + 1), oldBoardCopy);
            flipCell(x, (y - 1), oldBoardCopy);

            //* TODO: return the copy
            return oldBoardCopy;
        });
    }

    // if the game is won, just show a winning msg & render nothing else
    //* TODO
    if (hasWon()) {
        return (
            <h1 className="win">You WIN!!!</h1>
        )
    }

    // make table board
    //* TODO
    let rows = board.map((r, idx1) => (
        < tr key={idx1} >
            {r.map((c, idx2) => {
                if (c === true) {
                    return <Cell key={idx1 + "-" + idx2} isLit flipCellsAroundMe={evt => flipCellsAroundMe(idx1 + "-" + idx2)} />
                } else {
                    return <Cell key={idx1 + "-" + idx2} flipCellsAroundMe={evt => flipCellsAroundMe(idx1 + "-" + idx2)} />
                }
            })}
        </tr >
    ))



    return (
        < table className="table" >
            <tbody>
                {rows}
            </tbody>
        </table >
    )
}

export default Board;