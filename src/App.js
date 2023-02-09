import "./styles.css";
import React from "react";
import { useState } from "react";

import { generateBoard } from "./board";

const revealedMinePng =
  "https://icon2.cleanpng.com/20180325/fhw/kisspng-minesweeper-pro-classic-mine-sweeper-minesweeper-p-bomb-5ab79213a7d192.7378834915219799236874.jpg";

let board = generateBoard(10, 10, 10);

export default function App() {
  const [_board, setBoard] = useState(board.buf);
  const [isGameOver, setIsGameOver] = useState(false);

  board.buf = _board.map((row) => [...row]);

  function revealAllMines() {
    board.mines.forEach((pos) => {
      const [x, y] = pos;
      board.buf[x][y] = "X";
    });
  }

  function updateBoard(x, y) {
    if (isGameOver) return;
    if (board.buf[x][y] === "B") return;

    let cur = board.buf[x][y];
    let m = board.buf.length;
    let n = board.buf.at(0).length;

    if (cur === "M") {
      setIsGameOver(true);
      revealAllMines(); // GAME OVER! reveal all the mines
    } else if (cur === "E") {
      let adj = 0; // number of mines adjacent to current square

      for (let u = -1; u <= 1; ++u) {
        for (let v = -1; v <= 1; ++v) {
          let [i, j] = [x + u, y + v];
          if (i >= 0 && i < m && j >= 0 && j < n) {
            if (board.buf[i][j] === "M") {
              adj += 1;
            }
          }
        }
      }

      if (adj === 0) {
        board.buf[x][y] = "B";

        for (let u = -1; u <= 1; ++u) {
          for (let v = -1; v <= 1; ++v) {
            let [i, j] = [x + u, y + v];
            if (i >= 0 && i < m && j >= 0 && j < n) {
              if (i === x && j === y) continue;
              if (board.buf[i][j] === "M" || board.buf[i][j] === "E")
                updateBoard(i, j);
            }
          }
        }
      } else {
        board.buf[x][y] = adj.toString();
      }
    }
  }

  function handleClick(x, y) {
    updateBoard(x, y);
    setBoard(board.buf);
  }

  return (
    <div className="App">
      <table>
        <tbody>
          {board.buf.map((entries, row) => (
            <tr>
              {entries.map((entry, col) => {
                let value = "";
                let isRevealed = true;
                let isMine = false;

                if (entry === "E" || entry === "M") {
                  value = "";
                  isRevealed = false;
                } else if (entry === "B") {
                  value = "";
                } else if (entry === "X") {
                  // revealed mine. GAME OVER!
                  isMine = true;
                } else {
                  value = entry;
                }

                return (
                  <td>
                    {isRevealed ? (
                      isMine ? (
                        <button className="board--tile">
                          <img
                            src={revealedMinePng}
                            className="board--tile-mine"
                            alt="Revealed Mine"
                          />
                        </button>
                      ) : (
                        <button className="board--tile board--tile-revealed">
                          {value}
                        </button>
                      )
                    ) : (
                      <button
                        className="board--tile"
                        onClick={() => handleClick(row, col)}
                      >
                        {value}
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
