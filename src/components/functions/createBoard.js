class Cell {
	adjacentBombs = 0;
	isActive = false;
	isBomb = false;
}


export default function createBoard(bombs, width, height) {
  const bombCoordinats = Array.from({length: bombs}, (v, i) => Math.floor(Math.random() * width * height))

  const board = Array.from({length: height}, () => Array.from({length: width}, () => new Cell()))

  for (const coord of bombCoordinats) {
	const i = Math.floor(coord / height)
	const j = coord - (i * height)

	board[i][j].isBomb = true

	for (const [di, dj] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
		if(board[i + di]?.[j + dj]) {
			board[i + di][j + dj].adjacentBombs += 1
		}
	}
  }

  return board


  // bombCoordinate => bombCoordinate / width bombCoordinate % width


//   const area = width * height;
//   const board = [];

//   for (let i = 0; i < bombs; ) {
//     const element = Math.floor(Math.random() * area);
//     if (!board.includes(element) && element !== 0) {
//       board.push(element);
//       i++;
//     }
//   }

//   const boardInline = [];

//   for (let i = 0; i < area; i++) {
//     if (board.includes(i)) boardInline.push(bomb);
//     else boardInline.push("");
//   }

//   const boardMatrix = [];
//   let boardInlineArr = boardInline;

//   while (boardInlineArr.length > 0) {
//     boardMatrix.push(boardInlineArr.slice(0, width));
//     boardInlineArr = boardInlineArr.slice(width);
//   }

//   const completedBoardArr = boardMatrix;

//   for (let i = 0; i < height; i++) {
//     for (let j = 0; j < width; j++) {
//       let countOfBombs = 0;
//       if (completedBoardArr[i][j] === "") {
//         for (let k = -1; k <= 1; k++) {
//           for (let l = -1; l <= 1; l++) {
//             if (
//               checkIndexes(i, j, k, l) &&
//               completedBoardArr[i + k][j + l] === bomb
//             )
//               countOfBombs++;
//           }
//         }
//         completedBoardArr[i][j] = countOfBombs;
//       }
//     }
//   }

//   const completedBoard = completedBoardArr
//     .flat()
//     .map((item) => (item === 0 ? "" : item));

//   const completedBoardMatrix = [];
//   let completedBoardInline = completedBoard;

//   while (completedBoardInline.length > 0) {
//     completedBoardMatrix.push(completedBoardInline.slice(0, width));
//     completedBoardInline = completedBoardInline.slice(width);
//   }

//   function checkIndexes(i, j, k, l) {
//     if (i + k < 0 || j + l < 0) return false;
//     if (i + k > height - 1 || j + l > width - 1) return false;

//     return true;
//   }

//   return { boardInline, boardMatrix, completedBoard, completedBoardMatrix };
}
