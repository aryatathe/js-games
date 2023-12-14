import React from "react";
import { Link } from "react-router-dom";

import { gameList } from "../_configs/game-list";

const Home = () => {
  return (
    <div>
      <header
        style={{
          width: "100%",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        GAMES
      </header>
      <div
        style={{
          display: "flex",
          padding: "20px",
        }}
      >
        {gameList.map((game) => (
          <Link key={game.path} to={game.path}>
            <div
              style={{
                padding: "12px 18px",
                border: "solid 1px #acacac",
                borderRadius: "8px",
                color: "#acacac",
              }}
            >
              {game.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
