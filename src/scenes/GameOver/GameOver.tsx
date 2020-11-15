import React from "react";
import Stage from "../../components/Stage";

interface IProps {
  setGameState: (gameState: any) => void;
}

const GameOver = ({ setGameState }: IProps) => {
  return (
    <Stage>
      <button
        onClick={() =>
          setGameState((gameState: any) => ({ ...gameState, scene: "game" }))
        }
      >
        Play Again
      </button>
    </Stage>
  );
};

export default GameOver;
