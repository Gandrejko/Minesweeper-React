import React from 'react';
import Item from "./Item";
import createBoard from "./functions/createBoard";

const Field = ({width, height, area, bombs, bomb}) => {
	const {boardInline, boardMatrix, completedBoard} = createBoard(bombs, bomb, width, height, area);
	const styles = {
		gridTemplateColumns: `repeat(${width}, 50px)`,
		gridTemplateRows: `repeat(${height}, 50px)`
	};
	const items = [];
	for (let i = 0; i < area; i++) {
		items.push(i);
	}

	return (
		<div id='field' style={styles}>
			{items.map(index => (
				<Item
					key={index}
					bomb={bomb}
					content={completedBoard[index]}
				/>
			))}
		</div>

	);
};

export default Field;