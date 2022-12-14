import { Item } from "./Item";

export const Fields = ({ board, width, height, checkItem, toggleFlag }) => {
  const styles = {
    gridTemplateColumns: `repeat(${width}, 50px)`,
    gridTemplateRows: `repeat(${height}, 50px)`,
  };

  return (
    <div id="field" style={styles}>
      {board.flatMap((row, i) =>
        row.map((cell, j) => (
          <Item
            key={`${i}-${j}`}
            cell={cell}
            onContextMenu={(e) => toggleFlag(e, i, j)}
            onClick={() => checkItem(i, j)}
          />
        ))
      )}
    </div>
  );
};
