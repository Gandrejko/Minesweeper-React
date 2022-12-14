import React from 'react';

const Item = ({content, bomb}) => {
	function checkItem(e) {
		e.target.classList.remove('active');
		if(e.target.innerHTML === bomb) {
			setTimeout(() => {window.location.reload()}, 2000);
		}
	}

	return (
		<div onClick={checkItem} className='item active'>
			{content}
		</div>
	);
};

export default Item;