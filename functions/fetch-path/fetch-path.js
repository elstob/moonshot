const fs = require("fs");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const prefix = event.queryStringParameters.prefix;

    if (!prefix) {
      return { statusCode: 500, body: "No prefix provided" };
    }

    const pairWords = fs
      .readFileSync("./data/pair_words.txt", "utf8")
      .split("\r\n");

    const candidates = pairWords.filter((word) => word.startsWith(prefix));

    // where possible select a candiate that has a pathway
    const candidateWithPaths = [];
    candidates.forEach((word) => {
      const suffix = word.slice(-4);
      const pathways = pairWords.filter((pairWord) =>
        pairWord.startsWith(suffix)
      ).length;
      if (pathways > 0) {
        candidateWithPaths.push(word);
      }
    });

    const candidate = !!candidateWithPaths.length
      ? candidateWithPaths[~~(Math.random() * candidateWithPaths.length)]
      : candidates[~~(Math.random() * candidates.length)];

    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)];

    console.log(`${candidate.slice(-4)}${randomCharacter}`.split(""));

    const path = shuffleArray(
      `${candidate.slice(-4)}${randomCharacter}`.split("")
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ path }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
