import React from "react";

import Minesweeper from "../Minesweeper";
import Snake from "../Snake";

export const gameList = [
  { name: "Minesweeper", path: "minesweeper", element: <Minesweeper /> },
  { name: "Snake", path: "snake", element: <Snake /> },
];
