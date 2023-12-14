import React, { useEffect } from "react";
import { useState } from "react";

import { loadSnake, moveSnake } from "./logic";

import { Wrapper, Row, Cell, CellContent } from "./styles";

const Snake = () => {
  const [rows] = useState(15);
  const [cols] = useState(15);
  const [snake, setSnake] = useState([]);
  const [dir, setDir] = useState("right");
  const [tickRate, setTickRate] = useState(120);
  const [failSpot, setFailSpot] = useState("");
  const [itemL, setItemL] = useState("");
  const [itemV, setItemV] = useState("");

  console.log(snake, failSpot);

  useEffect(() => {
    loadSnake({ setSnake });
  }, []);

  useEffect(() => {
    if (itemL) return;
    for (;;) {
      const x = Math.floor(rows * Math.random());
      const y = Math.floor(cols * Math.random());
      let key = `${x}-${y}`;
      if (snake.includes(key) || itemV === key) continue;
      else {
        setItemL(key);
        break;
      }
    }
  }, [itemL]);

  useEffect(() => {
    if (itemV) return;
    for (;;) {
      const x = Math.floor(rows * Math.random());
      const y = Math.floor(cols * Math.random());
      let key = `${x}-${y}`;
      if (snake.includes(key) || itemL === key) continue;
      else {
        setItemV(key);
        break;
      }
    }
  }, [itemV]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (failSpot) return;
      moveSnake({
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
      });
    }, tickRate);

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
                return (
                  <Cell key={key}>
                    <CellContent
                      type={
                        key === failSpot
                          ? "fail"
                          : snake.includes(key)
                            ? "snake"
                            : key === itemL
                              ? "itemL"
                              : key === itemV
                                ? "itemV"
                                : "empty"
                      }
                      dir={dir}
                    >
                      {key === snake[snake.length - 1] && ">"}
                    </CellContent>
                  </Cell>
                );
              })}
          </Row>
        ))}
    </Wrapper>
  );
};

export default Snake;
