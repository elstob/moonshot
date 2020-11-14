const fs = require("fs");

try {
  const all_words = fs.readFileSync("./data/words", "utf8").split("\n");

  const filtered_words = [
    ...new Set(
      all_words
        .filter((word) => word.length === 8)
        .map((word) => word.toLowerCase())
    ),
  ];

  fs.writeFileSync(
    "./data/eight_letter_words_new.txt",
    filtered_words.join("\r\n")
  );
} catch (e) {
  console.log("Error:", e.stack);
}
