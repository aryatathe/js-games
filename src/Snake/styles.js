import styled from "styled-components";

const CELL_STYLES = {
  width: { snake: "100%", fail: "100%", default: "75%" },
  height: { snake: "100%", fail: "100%", default: "75%" },
  background: {
    snake: "chocolate",
    fail: "red",
    itemL: "lightblue",
    itemV: "lightgreen",
    default: "#4a4a48",
  },
  "border-radius": { snake: "50%", fail: "50%", default: "25%" },
};

const ANGLES = {
  up: -90,
  right: 0,
  down: 90,
  left: 180,
};

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Row = styled.div`
  display: flex;
  margin: 2px;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin: 0 1px;
  background: #4a4a48;
`;

export const CellContent = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 0.5;
  color: #ffffff99;

  transform: rotate(${({ dir }) => ANGLES[dir]}deg);
  ${({ type }) =>
    Object.entries(CELL_STYLES)
      .map(([key, val]) => `${key}: ${val[type] || val.default};`)
      .join(" ")};
`;
