import { Component } from "react";
import "./App.css";
import createBoard from "./components/functions/createBoard";
import { Fields } from "./components/Fields";

class App extends Component {
  config = {
    bombs: 20,
    width: 11,
    height: 11,
  };

  constructor(props) {
    super(props);

    this.state = {
      board: createBoard(
        this.config.bombs,
        this.config.height,
        this.config.width
      ),
    };
  }

  updateBoard = (board, i, j) => {
    if (board[i][j].isBomb) {
      window.location.reload();
    }

    board[i][j].isActive = !board[i][j].isActive;

    return [...board];
  };

  checkItem = (i, j) => {
    this.setState({
      board: this.updateBoard(this.state.board, i, j),
    });
  };

  render() {
    const {
      state: { board },
      config: { width, height, bombs },
    } = this;
    const flagsCount = bombs;
    return (
      <div className="App">
        <div id="saper">
          <div id="header">
            <div id="timer"></div>
            <div id="count-flag">Flags: x {flagsCount}</div>
          </div>
          <Fields height={height} width={width} board={board} checkItem={this.checkItem} />
        </div>
      </div>
    );
  }
}

export default App;
