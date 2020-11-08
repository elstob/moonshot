import pairWords from "../data/pair_words.json";

const checkWord = (word: string) => pairWords.includes(word);

export default checkWord;
