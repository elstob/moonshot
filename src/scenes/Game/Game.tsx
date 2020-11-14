import React, { useCallback, useEffect, useState } from "react";
import Path from "../../components/Path";
import Stage from "../../components/Stage";
import Word from "../../components/Word";
import checkWord from "../../utils/checkWord";
import getPath from "../../utils/getPath";
import getStartWord from "../../utils/getStartWord";

const Game = () => {
  const [chain, setChain] = useState<string[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [prefix, setPrefix] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

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
      setPrefix(suffix);
      setChain((chain) => [...chain, word]);
    } else {
      setChain([]);
      setSelection([]);
      setSelectedIndexes([]);
      setPrefix("");
      alert("GAME OVER!");
    }
  }, [prefix, selection]);

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
      {prefix && <Word value={prefix}></Word>}
      {!!selection.length && <Word value={selection.join("")} />}
      {!!chain.length && (
        <h2>
          {chain.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <a
                href={`https://merriam-webster.com/dictionary/${word}`}
                rel="noreferrer"
                target="_blank"
              >
                {word}
              </a>{" "}
              /{" "}
            </React.Fragment>
          ))}
        </h2>
      )}
    </Stage>
  );
};

export default Game;
