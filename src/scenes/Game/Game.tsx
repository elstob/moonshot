import React, { useEffect, useState } from "react";
import checkWord from "../../utils/checkWord";
import getPath from "../../utils/getPath";
import getStartWord from "../../utils/getStartWord";

const Game = () => {
  const [prefix, setPrefix] = useState("");
  const [path, setPath] = useState<string[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [chain, setChain] = useState<string[]>([]);

  const pickLetter = (letter: string) => {
    setSelection((selection) => [...selection, letter]);
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
      console.log("word", word);
      setSelection([]);
      setPrefix(suffix);
      setChain((chain) => [...chain, word]);
    } else {
      setChain([]);
      setSelection([]);
      setPrefix("");
      alert("GAME OVER!");
    }
  }, [prefix, selection]);

  return (
    <div>
      <h1>MOONSHOT</h1>
      {prefix && <h2>{prefix}</h2>}
      {!!path.length &&
        path.map((letter, index) => (
          <div
            key={`${letter}${index}`}
            onClick={() => pickLetter(letter)}
            style={{
              border: "1px solid black",
              display: "inline-block",
              lineHeight: "3rem",
              height: "3rem",
              margin: "1rem",
              textAlign: "center",
              width: "3rem",
            }}
          >
            {letter}
          </div>
        ))}
      {!!selection.length && <h2>{selection}</h2>}
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
    </div>
  );
};

export default Game;
