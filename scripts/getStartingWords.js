const fs = require("fs");

try {
  const pair_words = fs
    .readFileSync("./data/pair_words.txt", "utf8")
    .split("\r\n");

  const findNextPairWords = (word) => {
    const suffix = word.slice(-4);
    return pair_words.filter((pair_word) => pair_word.startsWith(suffix));
  };

  const startWords = [];

  const buildChain = (word, chain) => {
    if (startWords.includes(chain[0])) {
      return;
    }
    const next_pairs = findNextPairWords(word);
    if (chain.length > 9) {
      startWords.push(chain[0]);
    } else if (next_pairs.length > 0) {
      next_pairs.forEach((nextWord) => buildChain(nextWord, [...chain, word]));
    }
  };

  pair_words.forEach((start) => {
    buildChain(start, []);
  });

  fs.writeFileSync("./data/start_words.txt", startWords.join("\r\n"));
} catch (e) {
  console.log("Error:", e.stack);
}
