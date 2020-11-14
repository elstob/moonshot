import React, { useEffect, useState } from "react";
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

  const pickLetter = (letter: string, index: number) => {
    setSelection((selection) => [...selection, letter]);
    setSelectedIndexes((selectedIndexes) => [...selectedIndexes, index]);
  };

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
