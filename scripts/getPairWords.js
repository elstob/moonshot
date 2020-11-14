const fs = require("fs");

try {
  const four_letter_words = fs
    .readFileSync("./data/four_letter_words_new.txt", "utf8")
    .split("\r\n");
  const eight_letter_words = fs
    .readFileSync("./data/eight_letter_words_new.txt", "utf8")
    .split("\r\n");

  const pair_words = eight_letter_words.filter((word) => {
    const prefix = word.substr(0, 4);
    const suffix = word.substr(4, 4);
    if (
      four_letter_words.includes(prefix) &&
      four_letter_words.includes(suffix)
    ) {
      return true;
    }
    return false;
  });

  console.log(pair_words);

  fs.writeFileSync("./data/pair_words_new.txt", pair_words.join("\r\n"));
} catch (e) {
  console.log("Error:", e.stack);
}
