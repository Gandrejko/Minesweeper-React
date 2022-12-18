import React from 'react';

const Field = ({width, height, items}) => {
	const styles = {
		gridTemplateColumns: `repeat(${width}, 50px)`,
		gridTemplateRows: `repeat(${height}, 50px)`
	};

	return (
		<div id='field' style={styles}>
			{items}
		</div>

	);
};

export default Field;