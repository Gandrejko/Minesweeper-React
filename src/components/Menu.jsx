export const Menu = ({active}) => {
	const classes = 'Menu' + (active ? ' active' : '');
	return (
		<div className={classes}>
			<button type='button' className='startGame'>Start game</button>
		</div>
	)
}