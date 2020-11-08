const fs = require("fs");
const path = require("path");

const currentDir = process.env.LAMBDA_TASK_ROOT;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const startWords = fs
      .readFileSync(
        path.join(currentDir, "../start-word/start_prefixes.txt"),
        "utf8"
      )
      .split("\r\n");

    const startWord = startWords[~~(Math.random() * startWords.length)];

    return {
      statusCode: 200,
      body: JSON.stringify({ startWord }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
