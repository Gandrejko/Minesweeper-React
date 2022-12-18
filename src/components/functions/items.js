import Item from "../Item";

function items(board, checkItem) {
	return board.map((item, index) => {
		return (
			<Item
				key={index}
				active={true}
				checkItem={checkItem}
			>{item}</Item>
		)
	});
}

export default items;