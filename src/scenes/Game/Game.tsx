import React, { useCallback, useEffect, useState } from "react";
import Chain from "../../components/Chain";
import Input from "../../components/Input";
import Lives from "../../components/Lives";
import Path from "../../components/Path";
import Stage from "../../components/Stage";
import checkWord from "../../utils/checkWord";
import getPath from "../../utils/getPath";
import getStartWord from "../../utils/getStartWord";

interface ILink {
  boost: boolean;
  word: string;
}

interface IProps {
  setGameState: (gameState: any) => void;
}

const COMPLETION_STATES = {
  DEAD: "DEAD",
  TIME_UP: "TIME_UP",
  MOONSHOT: "MOONSHOT",
};

const COMPLETION_STRINGS = {
  [COMPLETION_STATES.DEAD]: "You ran out of lives!",
  [COMPLETION_STATES.MOONSHOT]: "Moonshot! You made it, Congratulations!",
};

const MOONSHOT_COUNT = 10;

const SWITCH_WORDS = ["able", "less", "ness"];

const Game = ({ setGameState }: IProps) => {
  const [chain, setChain] = useState<ILink[]>([]);
  const [lives, setLives] = useState(3);
  const [path, setPath] = useState<string[]>([]);
  const [prefix, setPrefix] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [completed, setCompleted] = useState<string | null>(null);

  const pickLetter = useCallback(
    (index: number) => {
      setSelection((selection) => [...selection, path[index]]);
      setSelectedIndexes((selectedIndexes) => [...selectedIndexes, index]);
    },
    [path]
  );

  const removeLetter = useCallback((index: number) => {
    setSelection((selection) => selection.splice(index, 1));
    setSelectedIndexes((selectedIndexes) => selectedIndexes.splice(index, 1));
  }, []);

  const keyHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (path.includes(key)) {
        const index = path.findIndex(
          (letter, index) => letter === key && !selectedIndexes.includes(index)
        );
        if (index > -1) {
          pickLetter(index);
        }
      }
      if (key === "Backspace" && selection.length > 0) {
        setSelection((selection) => selection.slice(0, -1));
        setSelectedIndexes((selectedIndexes) => selectedIndexes.slice(0, -1));
      }
    },
    [path, pickLetter, selectedIndexes, selection.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);

  // Fetch a starting word
  useEffect(() => {
    if (!prefix) {
      const startWord = getStartWord();
      setPrefix(startWord);
    }
  }, [prefix]);

  useEffect(() => {
    if (!prefix) {
      return;
    }
    const newPath = getPath(prefix);
    if (!newPath.length) {
      alert("You got lost!");
    }
    setPath(newPath);
  }, [prefix]);

  useEffect(() => {
    if (selection.length !== 4) {
      return;
    }
    const suffix = selection.join("");
    const word = `${prefix}${suffix}`;
    if (checkWord(word)) {
      setSelection([]);
      setSelectedIndexes([]);

      let boost = false;
      let prefix = suffix;
      if (SWITCH_WORDS.includes(prefix)) {
        console.log("C-C-C-C-Combo breaker!!!");
        boost = true;
        prefix = getStartWord();
      }

      setPrefix(prefix);
      setChain((chain) => [...chain, { boost, word }]);
    } else {
      if (lives > 1) {
        setLives((lives) => lives - 1);
        setSelection([]);
        setSelectedIndexes([]);
      } else {
        setLives(0);
        setCompleted(COMPLETION_STATES.DEAD);
      }
    }
  }, [chain, lives, prefix, selection, setGameState]);

  useEffect(() => {
    if (chain.length === MOONSHOT_COUNT) {
      setCompleted(COMPLETION_STATES.MOONSHOT);
    }
  }, [chain.length]);

  useEffect(() => {
    if (completed) {
      document.removeEventListener("keydown", keyHandler);
    }
  }, [completed, keyHandler]);

  return (
    <Stage>
      {!!path.length && (
        <Path
          pickLetter={pickLetter}
          removeLetter={removeLetter}
          selectedIndexes={selectedIndexes}
          value={path}
        />
      )}
      <Input value={`${prefix}${selection.join("")}`} />
      <Chain chain={chain} />
      {!!lives && <Lives count={lives} />}
      {completed && (
        <div>
          <h2>{COMPLETION_STRINGS[completed]}</h2>
          <button
            onClick={() => {
              setGameState((gameState: any) => ({
                ...gameState,
                chain,
                lives,
                scene: "gameOver",
              }));
            }}
          >
            View Final Score
          </button>
        </div>
      )}
    </Stage>
  );
};

export default Game;
