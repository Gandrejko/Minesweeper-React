class Cell {
	adjacentBombs = 0;
	isActive = true;
	isBomb = false;
	isFlag = false;
}


export function createBoard(bombs, width, height) {
  const board = Array.from({length: height}, () => Array.from({length: width}, () => new Cell()))

  const bombCoordinats = new Set()

  for (let i = 0; i < bombs; i++) {
	let coord;
	do {
		coord = Math.floor(Math.random() * width * height)
	} while(bombCoordinats.has(coord))
	bombCoordinats.add(coord)
  }


  for (const coord of bombCoordinats.values()) {
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
