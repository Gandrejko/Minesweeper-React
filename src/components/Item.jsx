export const Item = ({ cell, onClick, onContextMenu }) => {
  const classes = "item" + (cell.isActive ? " active" : "") + (cell.isFlag ? " flag" : "");
  return (
    <div
        className={classes}
        onClick={onClick}
        onContextMenu={onContextMenu}
    >
      {cell.isBomb ? "*" : (cell.adjacentBombs === 0 ? '' : cell.adjacentBombs)}
    </div>
  );
};
