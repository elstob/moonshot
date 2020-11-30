import pairWords from "../data/pair_words.json";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const getRandomChar = () =>
  alphabet[Math.floor(Math.random() * alphabet.length)];

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getPath = (prefix: string) => {
  const candidates = pairWords.filter((word) => word.startsWith(prefix));

  // where possible select a candiate that has a pathway
  const candidatesWithPaths: string[] = [];
  candidates.forEach((word) => {
    const suffix = word.slice(-4);
    const pathways = pairWords.filter((pairWord) => pairWord.startsWith(suffix))
      .length;
    if (pathways > 0) {
      candidatesWithPaths.push(word);
    }
  });

  const candidate = !!candidatesWithPaths.length
    ? candidatesWithPaths[~~(Math.random() * candidatesWithPaths.length)]
    : candidates[~~(Math.random() * candidates.length)];

  if (!candidate) {
    return [];
  }

  // console.log(candidate.slice(-4));

  const letters = shuffleArray([
    ...`${candidate.slice(-4)}`.split(""),
    getRandomChar(),
    getRandomChar(),
  ]);

  return letters;
};

export default getPath;
