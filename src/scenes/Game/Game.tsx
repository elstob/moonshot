import React, { useCallback, useEffect, useState } from "react";
import useCountDown from "react-countdown-hook";
import Chain from "../../components/Chain";
import Completed from "../../components/Completed";
import Input from "../../components/Input";
import Lives from "../../components/Lives";
import Path from "../../components/Path";
import Stage from "../../components/Stage";
import Timer from "../../components/Timer";
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
  [COMPLETION_STATES.DEAD]: {
    body: "You ran out of lives!",
    title: "Game Over",
  },
  [COMPLETION_STATES.MOONSHOT]: {
    body: "You made it. Congratulations!",
    title: "MOONSHOT",
  },
  [COMPLETION_STATES.TIME_UP]: {
    body: "You ran out of time!",
    title: "Game Over",
  },
};

const MOONSHOT_COUNT = 10;

const SWITCH_WORDS = ["able", "less", "ling", "ness"];

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

  // Timer
  const [timeLeft, { start, pause }] = useCountDown(60 * 1000);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    let newPath = getPath(prefix);
    if (!newPath.length) {
      const replacement = getStartWord();
      newPath = getPath(prefix);
      setPrefix(replacement);
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
        pause();
        setLives(0);
        setCompleted(COMPLETION_STATES.DEAD);
      }
    }
  }, [chain, lives, pause, prefix, selection]);

  useEffect(() => {
    if (chain.length === MOONSHOT_COUNT) {
      pause();
      setCompleted(COMPLETION_STATES.MOONSHOT);
    }
  }, [chain.length, pause]);

  useEffect(() => {
    if (prefix && timeLeft <= 0) {
      pause();
      setCompleted(COMPLETION_STATES.TIME_UP);
    }
  }, [pause, prefix, timeLeft]);

  useEffect(() => {
    if (completed) {
      document.removeEventListener("keydown", keyHandler);
    }
  }, [completed, keyHandler]);

  return (
    <Stage offset={chain.length}>
      {!completed && !!path.length && (
        <Path
          pickLetter={pickLetter}
          removeLetter={removeLetter}
          selectedIndexes={selectedIndexes}
          value={path}
        />
      )}
      {!completed && <Input value={`${prefix}${selection.join("")}`} />}
      <Chain chain={chain} />
      {!!lives && <Lives count={lives} />}

      {!completed && <Timer time={timeLeft / 1000} />}

      {completed && (
        <Completed
          body={COMPLETION_STRINGS[completed].body}
          moon={chain.length === MOONSHOT_COUNT}
          title={COMPLETION_STRINGS[completed].title}
          progress={() =>
            setGameState((oldGameState: any) => ({
              ...oldGameState,
              chain,
              lives,
              timeLeft,
              scene: "gameOver",
            }))
          }
        />
      )}
    </Stage>
  );
};

export default Game;
