import React, { useEffect, useState } from "react";

const Game = () => {
  const [prefix, setPrefix] = useState("");
  const [path, setPath] = useState([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [chain, setChain] = useState<string[]>([]);

  const pickLetter = (letter: string) => {
    setSelection((selection) => [...selection, letter]);
  };

  // Fetch a starting word
  useEffect(() => {
    const fetchPrefix = async () => {
      const response = await fetch("/.netlify/functions/start-word");
      const { startWord } = await response.json();
      if (startWord) {
        // setPrefix(startWord);
        setPrefix("mill"); // Debug by forcing start word
      }
    };
    if (!prefix) {
      fetchPrefix();
    }
  }, [prefix]);

  useEffect(() => {
    if (!prefix) {
      return;
    }
    const fetchPath = async () => {
      const response = await fetch(
        `/.netlify/functions/fetch-path?prefix=${prefix}`
      );
      const { path } = await response.json();
      if (path) {
        setPath(path);
      }
    };
    fetchPath();
  }, [prefix]);

  useEffect(() => {
    if (selection.length !== 4) {
      return;
    }
    const checkWord = async () => {
      const suffix = selection.join("");
      const word = `${prefix}${suffix}`;
      const response = await fetch(
        `/.netlify/functions/check-word?word=${word}`
      );
      if (response.status === 200) {
        setSelection([]);
        setPrefix(suffix);
        setChain((chain) => [...chain, word]);
      } else if (response.status === 404) {
        setSelection([]);
        setChain([]);
        alert("GAME OVER!");
      }
    };
    checkWord();
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
      {!!chain.length && <h2>{chain.join(" / ")}</h2>}
    </div>
  );
};

export default Game;
