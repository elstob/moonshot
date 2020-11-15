import React, { useState } from "react";
import "./App.css";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";

function App() {
  const [gameState, setGameState] = useState({
    scene: "game",
  });

  return (
    <div>
      {gameState.scene === "game" && <Game setGameState={setGameState} />}
      {gameState.scene === "gameOver" && (
        <GameOver setGameState={setGameState} />
      )}
    </div>
  );
}

export default App;
