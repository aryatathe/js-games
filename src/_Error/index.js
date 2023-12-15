import React from "react";

import { Link } from "react-router-dom";

import { Wrapper, Header, Button } from "./styles";

const Error = () => {
  return (
    <Wrapper>
      <Header>404</Header>
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
    </Wrapper>
  );
};

export default Error;
