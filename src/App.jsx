import { Component } from "react";
import "./App.css";
import { createBoard } from "./components/functions/createBoard";
import { Fields } from "./components/Fields";
import { Menu } from "./components/Menu";

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
      flagsLeft: this.config.bombs,
      timeSeconds: 0,
    };
  }

  componentWillUnmount() {
    window.clearInterval(this.timerDescriptor);
  }

  beautifyTimer = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;

    return `${minutes} m ${seconds} s`;
  };

  endGame = (board) => {
    const countActiveCells = board.flat().filter((cell) => cell.isActive).length;

    if (countActiveCells <= this.config.bombs) {
      setTimeout(() => {window.location.reload()}, 1000);
    }
  };

  updateBoard = (board, i, j) => {
    if(board.flat().filter((cell) => cell.isActive).length === this.config.height * this.config.width) {
      this.timerDescriptor = window.setInterval(() => {
        this.setState((prev) => ({ timeSeconds: prev.timeSeconds + 1 }));
      }, 1000);
    }
    if (!board[i][j].isFlag) {
      if (board[i][j].isBomb) {
        window.location.reload();
      }
      if (board[i][j].adjacentBombs === 0) {
        this.checkNeighbourCells(this.state.board, i, j);
      }

      board[i][j].isActive = false;
      this.endGame(board);
    }
    return [...board];
  };

  checkItem = (i, j) => {
    this.setState({
      board: this.updateBoard(this.state.board, i, j),
    });
  };

  updateFlags = (board, i, j) => {
    if (this.state.flagsLeft > 0) board[i][j].isFlag = !board[i][j].isFlag;

    const countFlags = board.flat().filter((cell) => cell.isFlag).length;
    this.setState({
      flagsLeft: this.config.bombs - countFlags,
    });

    return [...board];
  };
  toggleFlag = (e, i, j) => {
    e.preventDefault();
    this.setState({
      board: this.updateFlags(this.state.board, i, j),
    });
  };

  checkNeighbourCells = (board, i, j) => {
    for (const [di, dj] of [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]) {
      if (
        this.checkIndexes(i + di, j + dj) &&
        !board[i + di][j + dj].isFlag &&
        board[i + di][j + dj].isActive
      ) {
        board[i + di][j + dj].isActive = false;
        if (board[i + di][j + dj].adjacentBombs === 0) {
          this.checkNeighbourCells(board, i + di, j + dj);
        }
      }
    }
  };

  checkIndexes = (i, j) => {
    if (i < 0 || j < 0) return false;
    if (i > this.config.height - 1 || j > this.config.width - 1) return false;

    return true;
  };

  render() {
    const {
      state: { board, flagsLeft },
      config: { width, height },
    } = this;

    return (
      <div className="App">
        <div id="saper">
          <div id="header">
            <div id="timer">{this.beautifyTimer(this.state.timeSeconds)}</div>
            <div id="count-flag">Flags: x {flagsLeft}</div>
          </div>
          <Fields
            height={height}
            width={width}
            board={board}
            checkItem={this.checkItem}
            toggleFlag={this.toggleFlag}
          />
        </div>
      </div>
    );
  }
}

export default App;
