import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Row = styled.div`
  display: flex;
  margin: 2px;
`;

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 1px;
  background: ${({ occupied }) => (occupied ? "red" : "#4a4a48")};
`;
