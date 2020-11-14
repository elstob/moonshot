const fs = require("fs");

try {
  const startWords = fs
    .readFileSync("./data/start_words_new.txt", "utf8")
    .split("\r\n");

  const prefixCount = {};

  startWords.forEach((word) => {
    const prefix = word.slice(0, 4);
    if (prefixCount[prefix]) {
      prefixCount[prefix] = prefixCount[prefix] + 1;
    } else {
      prefixCount[prefix] = 1;
    }
  });

  const results = Object.keys(prefixCount).map(function (key) {
    return [key, prefixCount[key]];
  });

  results.sort(function (first, second) {
    return second[1] - first[1];
  });

  fs.writeFileSync(
    "./data/start-prefixes-new.txt",
    results
      .map(([word, count]) => word)
      .slice(0, 30)
      .join("\r\n")
  );
} catch (e) {
  console.log("Error:", e.stack);
}
