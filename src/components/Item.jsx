export const Item = ({ cell, onClick }) => {
  const classes = "item " + (cell.isActive ? "active" : null);

  return (
    <div className={classes} onClick={onClick}>
      {cell.isBomb ? "*" : cell.adjacentBombs}
    </div>
  );
};
