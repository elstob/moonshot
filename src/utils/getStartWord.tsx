import startWords from "../data/start_prefixes.json";

const getStartWord = () => startWords[~~(Math.random() * startWords.length)];

export default getStartWord;
