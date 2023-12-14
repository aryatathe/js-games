export const loadSnake = ({ setSnake }) => {
  setSnake(["2-3", "2-4", "2-5", "2-6", "2-7"]);
};

export const placeItem = ({ offLimits, rows, cols }) => {
  for (;;) {
    const x = Math.floor(rows * Math.random());
    const y = Math.floor(cols * Math.random());
    let key = `${x}-${y}`;
    if (offLimits.includes(key)) continue;
    else {
      return key;
    }
  }
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
  setDir,
  queueTurn,
}) => {
  if (snake.length === 0) return;

  const newSnake = snake.slice();

  const shouldNotTurn =
    !queueTurn ||
    (queueTurn === "up" && dir === "down") ||
    (queueTurn === "down" && dir === "up") ||
    (queueTurn === "left" && dir === "right") ||
    (queueTurn === "right" && dir === "left");

  let [x, y] = newSnake[newSnake.length - 1].split("-");
  x = Number(x);
  y = Number(y);

  const checkDir = shouldNotTurn ? dir : queueTurn;

  if (checkDir === "up") {
    x -= 1;
    if (x < 0) x = rows - 1;
  } else if (checkDir === "down") {
    x += 1;
    if (x === rows) x = 0;
  } else if (checkDir === "left") {
    y -= 1;
    if (y < 0) y = cols - 1;
  } else if (checkDir === "right") {
    y += 1;
    if (y === cols) y = 0;
  } else {
    return;
  }

  if (!shouldNotTurn) setDir(queueTurn);

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
