import React, {Component} from 'react';
import styles from './App.css';
import createBoard from './components/functions/createBoard';
import Field from "./components/Field";
import items from "./components/functions/items";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 11,
			height: 11,
			bombs: 20,
			bomb: '*'
		};

		this.board = createBoard(this.state.bombs, this.state.bomb, this.state.width, this.state.height).completedBoard;
		this.items = items(this.board, this.checkItem);

		this.checkItem = this.checkItem.bind(this);
	}

	checkItem(id) {
		// const items = this.items;
		console.log(id);
	}

	render() {
		const {state : {width, height, bombs}, board, items} = this;
		const flagsCount = bombs;
		return (
			<div className="App">
				<div id="saper">
					<div id="header">
						<div id="timer"></div>
						<div id="count-flag">Flags: x {flagsCount}</div>
					</div>
					<Field
						height={height}
						width={width}
						items={items}
					/>
				</div>
			</div>
		);
	}
}

export default App;
