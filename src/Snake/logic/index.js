export const loadSnake = ({ setSnake }) => {
  setSnake(["2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "2-9"].slice(3));
};

export const moveSnake = ({
  snake,
  setSnake,
  dir,
  rows,
  cols,
  itemL,
  setItemL,
  itemV,
  setItemV,
  setTickRate,
  setFailSpot,
}) => {
  if (snake.length === 0) return;

  const newSnake = snake.slice();

  let [x, y] = newSnake[newSnake.length - 1].split("-");
  x = Number(x);
  y = Number(y);
  if (dir === "up") {
    x -= 1;
    if (x < 0) x = rows - 1;
  } else if (dir === "down") {
    x += 1;
    if (x === rows) x = 0;
  } else if (dir === "left") {
    y -= 1;
    if (y < 0) y = cols - 1;
  } else if (dir === "right") {
    y += 1;
    if (y === cols) y = 0;
  } else {
    return;
  }

  const newKey = `${x}-${y}`;

  if (newSnake.includes(newKey)) {
    setFailSpot(newKey);
    return;
  }

  newSnake.push(newKey);

  if (newKey === itemL) {
    setItemL("");
  } else {
    newSnake.shift();
  }

  if (newKey === itemV) {
    setItemV("");
    setTickRate((prev) => prev - 5);
  }

  setSnake(newSnake);
};
