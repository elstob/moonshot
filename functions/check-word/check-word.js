const fs = require("fs");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const word = event.queryStringParameters.word;

    if (!word) {
      return { statusCode: 500, body: "No word provided" };
    } else if (word.length !== 8) {
      return { statusCode: 500, body: "Provided word is incorrect length" };
    }

    const pairWords = fs
      .readFileSync(require.resolve("../shared/pair_words.txt"), "utf8")
      .split("\r\n");

    if (pairWords.includes(word)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ word }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: `${word} does not exist` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
