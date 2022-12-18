import React, {Component} from 'react';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true
		};

		this.deleteActive = this.deleteActive.bind(this);
		this.checkItemForBomb = this.checkItemForBomb.bind(this);
		this.onClickItem = this.onClickItem.bind(this);
	}

	deleteActive() {
		this.setState({
			active: false
		})
	}

	checkItemForBomb(value) {
		if(value === '*') window.location.reload();
	}

	onClickItem(value) {
		this.deleteActive();
		this.checkItemForBomb(value);
	}

	render() {
		let {children, checkItem} = this.props;
		const {active} = this.state;
		const classes = 'item ' + (active ? 'active' : null);

		return (
			<div
				className={classes}
				onClick={() => this.onClickItem(children)}
			>{children}</div>
		);
	}
}

export default Item;