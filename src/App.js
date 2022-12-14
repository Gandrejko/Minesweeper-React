import React, {Component, useState} from 'react';
import styles from './App.css';
import Field from "./components/Field";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 11,
			height: 11,
			bombs: 20,
			firstItemIndex: null
		};
	}

	render() {
		const {width, height, bombs} = this.state;
		const area = width * height;
		const bomb = '*';

		return (
			<div className="App">
				<div id="saper">
					<div id="header">
						<div id="timer"></div>
						<div id="count-flag">Flags: x {bombs}</div>
					</div>
					<Field
						bomb={bomb}
						bombs={bombs}
						width={width}
						height={height}
						area={area} />
				</div>
			</div>
		);
	}
}

export default App;
