// 'M' represents an unrevealed mine,
// 'E' represents an unrevealed empty square,
//  'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
//  digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
//  'X' represents a revealed mine.

export class Board {
  constructor(m, n) {
    this.buf = Array(m)
      .fill()
      .map(() => Array(n).fill("E"));
    this.mines = [];
  }
}

// Generates board of size m x n with nbr of hidden mines equal to `totalMines`
export function generateBoard(m, n, totalMines) {
  let board = new Board(m, n);
  console.log("created!");

  for (let i = 0; i < totalMines; ++i) {
    const [row, col] = [
      Math.floor(Math.random() * m),
      Math.floor(Math.random() * n)
    ];
    board.mines.push([row, col]);
    board.buf[row][col] = "M";
  }

  return board;
}
