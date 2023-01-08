import {
  Component,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { createBoard } from "./components/functions/createBoard";
import { Fields } from "./components/Fields";

const TimerContext = createContext(null);
const UpdateTimerContext = createContext(null);

const TimerWrapper = ({ children }) => {
  const [timeSeconds, setTimeSeconds] = useState(0);

  const timerDescriptor = useRef(null);

  const updateTimer = useCallback(() => {
    setTimeSeconds(0);
    clearInterval(timerDescriptor.current);

    timerDescriptor.current = setInterval(
      () => setTimeSeconds((p) => p + 1),
      1_000
    );
  }, []);

  useEffect(() => {
    return () => {
      window.clearInterval(this.timerDescriptor);
    };
  }, []);

  return (
    <UpdateTimerContext.Provider value={updateTimer}>
      <TimerContext.Provider value={timeSeconds}>
        {children}
      </TimerContext.Provider>
    </UpdateTimerContext.Provider>
  );
};

class Board extends Component {
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
    };
  }

  static contextType = UpdateTimerContext;

  endGame = (board) => {
    const countActiveCells = board
      .flat()
      .filter((cell) => cell.isActive).length;

    if (countActiveCells <= this.config.bombs) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  updateBoard = (board, i, j) => {
    if (
      board.flat().filter((cell) => cell.isActive).length ===
      this.config.height * this.config.width
    ) {
      this.context();
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
            <TimerComponent />
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

const beautifyTimer = (timeSeconds) => {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  return `${minutes} m ${seconds} s`;
};

const TimerComponent = () => {
  const timeSeconds = useContext(TimerContext);

  return <div id="timer">{beautifyTimer(timeSeconds)}</div>;
};

const App = () => (
  <TimerWrapper>
    <Board />
  </TimerWrapper>
);

export default App;
