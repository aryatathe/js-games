import React, { useEffect } from "react";
import { useState } from "react";

import { loadSnake, moveSnake, placeItem } from "./logic";

import { Wrapper, Header, Row, Cell, CellContent, ResetButton } from "./styles";

const Snake = () => {
  const [rows] = useState(20);
  const [cols] = useState(20);

  const [itemL, setItemL] = useState("");
  const [itemV, setItemV] = useState("");
  const [failSpot, setFailSpot] = useState("");

  const [snake, setSnake] = useState([]);
  const [dir, setDir] = useState("right");
  const [tickRate, setTickRate] = useState(120);

  const [queueTurn, setQueueTurn] = useState(false);

  console.log(snake, failSpot);

  useEffect(() => {
    loadSnake({ setSnake });
  }, []);

  useEffect(() => {
    if (itemL) return;
    setItemL(placeItem({ offLimits: [...snake, itemV], rows, cols }));
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
        setDir,
        queueTurn,
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [snake]);

  const handleInput = (e) => {
    const newDir = e.key.substr(5).toLowerCase();
    if (!["left", "right", "up", "down"].includes(newDir)) return;
    setQueueTurn(newDir);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleInput);

    return function cleanup() {
      document.removeEventListener("keydown", handleInput);
    };
  }, []);

  const handleReset = () => {
    loadSnake({ setSnake });
    setTickRate(120);
    setFailSpot("");
    setDir("right");
  };

  const scoreL = snake.length - 5;
  const scoreV = (120 - tickRate) / 5;

  return (
    <Wrapper>
      <Header>
        {"( "}
        <span className="blue">{scoreL}</span>
        {" ) x ( "}
        <span className="green">{scoreV}</span>
        {" )"}
        <small>2</small>
        {" = "}
        <span className="yellow">{scoreL * scoreV * scoreV}</span>
      </Header>
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
      {!failSpot && <ResetButton onClick={handleReset}>reset</ResetButton>}
    </Wrapper>
  );
};

export default Snake;
