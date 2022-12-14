import React from 'react';

const Item = ({content, bomb}) => {
	function checkItem(e) {
		e.target.classList.remove('active');
		if(e.target.innerHTML === bomb) {
			setTimeout(() => {window.location.reload()}, 2000);
		}
	}

	function toggleFlag(e) {
		e.preventDefault();
		if(!e.target.classList.contains('flag')/* && flagsCount > 0*/) {
			e.target.classList.add('flag');
			/*flagsCount--;*/
		} else if(e.target.classList.contains('flag')) {
			e.target.classList.remove('flag');
			/*flagsCount++;*/
		}
	}

	return (
		<div onContextMenu={toggleFlag} onClick={checkItem} className='item active'>
			{content}
		</div>
	);
};

export default Item;