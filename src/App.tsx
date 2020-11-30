import React, { useState } from "react";
import "./App.css";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import Guide from "./scenes/Guide";
import Intro from "./scenes/Intro";

function App() {
  const [gameState, setGameState] = useState({
    scene: "intro",
  });

  return (
    <div>
      {gameState.scene === "intro" && <Intro setGameState={setGameState} />}
      {gameState.scene === "game" && <Game setGameState={setGameState} />}
      {gameState.scene === "gameOver" && (
        <GameOver gameState={gameState} setGameState={setGameState} />
      )}
      {gameState.scene === "guide" && <Guide setGameState={setGameState} />}
    </div>
  );
}

export default App;
