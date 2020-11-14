const fs = require("fs");

try {
  const words = fs
    .readFileSync("./data/pair_words_new.txt", "utf8")
    .split("\r\n");
  fs.writeFileSync("./data/pair_words.json", JSON.stringify(words));
} catch (e) {
  console.log("Error:", e.stack);
}
