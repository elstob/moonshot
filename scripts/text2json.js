const fs = require("fs");

try {
  const words = fs
    .readFileSync("./data/start_prefixes.txt", "utf8")
    .split("\r\n");
  fs.writeFileSync("./data/start_prefixes.json", JSON.stringify(words));
} catch (e) {
  console.log("Error:", e.stack);
}
