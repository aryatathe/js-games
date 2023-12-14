import React from "react";
import { Link } from "react-router-dom";

import { gameList } from "../_configs/game-list";

import { Header, List, Item } from "./styles";

const Home = () => {
  return (
    <div>
      <Header>GAMES</Header>
      <List>
        {gameList.map((game) => (
          <Link key={game.path} to={game.path}>
            <Item>{game.name}</Item>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default Home;
