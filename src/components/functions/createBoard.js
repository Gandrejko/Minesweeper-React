class Cell {
	adjacentBombs = 0;
	isActive = true;
	isBomb = false;
	isFlag = false;
}


export function createBoard(bombs, width, height) {
  const bombCoordinats = Array.from({length: bombs}, (v, i) => Math.floor(Math.random() * width * height));
  const board = Array.from({length: height}, () => Array.from({length: width}, () => new Cell()))

  for (const coord of bombCoordinats) {
	const i = Math.floor(coord / height)
	const j = coord - (i * height)

	board[i][j].isBomb = true

	for (const [di, dj] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
		if (board[i + di]?.[j + dj]) {
			board[i + di][j + dj].adjacentBombs += 1
		}
	}
  }

  return board
}
