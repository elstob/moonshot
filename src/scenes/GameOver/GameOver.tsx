import React from "react";
import styled from "styled-components";
import Stage from "../../components/Stage";

interface IProps {
  setGameState: (gameState: any) => void;
}

const GameOver = ({ setGameState }: IProps) => {
  return (
    <Stage>
      High Scores TODO
      <Button
        onClick={() =>
          setGameState((gameState: any) => ({ ...gameState, scene: "game" }))
        }
      >
        Play Again
      </Button>
    </Stage>
  );
};

const Button = styled.button`
  border: 5px outset #ccc;
  background: #ddd;
  color: #000;
  cursor: pointer;
  display: block;
  font-family: monospace;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 10rem auto;
  text-transform: uppercase;
  padding: 1rem;
`;

export default GameOver;
