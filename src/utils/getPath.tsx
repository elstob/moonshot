import pairWords from "../data/pair_words.json";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getPath = (prefix: string) => {
  const candidates = pairWords.filter((word) => word.startsWith(prefix));

  // where possible select a candiate that has a pathway
  const candidateWithPaths: string[] = [];
  candidates.forEach((word) => {
    const suffix = word.slice(-4);
    const pathways = pairWords.filter((pairWord) => pairWord.startsWith(suffix))
      .length;
    if (pathways > 0) {
      candidateWithPaths.push(word);
    }
  });

  const candidate = !!candidateWithPaths.length
    ? candidateWithPaths[~~(Math.random() * candidateWithPaths.length)]
    : candidates[~~(Math.random() * candidates.length)];

  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  console.log(candidate.slice(-4));

  const letters = shuffleArray(
    `${candidate.slice(-4)}${randomCharacter}`.split("")
  );

  return letters;
};

export default getPath;
