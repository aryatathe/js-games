import React, { useEffect } from "react";
import { useState } from "react";

import { Wrapper, Row, Cell } from "./styles";

const loadSnake = ({ setSnake }) => {
  setSnake(["2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "2-9"].slice(3));
};

const moveSnake = ({ snake, setSnake, dir, rows, cols }) => {
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

  newSnake.shift();
  newSnake.push(`${x}-${y}`);
  setSnake(newSnake);
};

const Snake = () => {
  const [rows] = useState(10);
  const [cols] = useState(10);
  const [dir, setDir] = useState("up");
  const [snake, setSnake] = useState([]);

  useEffect(() => {
    loadSnake({ setSnake });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake({ snake, setSnake, dir, rows, cols });
    }, 100);

    return () => clearInterval(interval);
  }, [snake]);

  const handleInput = (e) => {
    const newDir = e.key.substr(5).toLowerCase();
    if (!["left", "right", "up", "down"].includes(newDir)) return;
    setDir((curr) => {
      if (
        (newDir === "up" && curr === "down") ||
        (newDir === "down" && curr === "up") ||
        (newDir === "left" && curr === "right") ||
        (newDir === "right" && curr === "left")
      ) {
        return curr;
      }
      console.log(newDir, curr);
      return newDir;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleInput);

    return function cleanup() {
      document.removeEventListener("keydown", handleInput);
    };
  }, []);

  return (
    <Wrapper>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <Row key={i}>
            {Array(cols)
              .fill(0)
              .map((_, j) => {
                const key = `${i}-${j}`;
                return <Cell key={key} occupied={snake.includes(key)} />;
              })}
          </Row>
        ))}
    </Wrapper>
  );
};

export default Snake;
