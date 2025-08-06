import { useState } from "react";
import getARandomWord from "../utils/getARandomWord";
import { languages } from "../constants/languages";

export default function useGameLogic() {
  const [currentWord, setCurrentWord] = useState(() => getARandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuesses = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameLost = wrongGuesses === languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessed = guessedLetters[guessedLetters.length - 1];
  const isLastGuessCorrect = !lastGuessed || currentWord.includes(lastGuessed);

  function addGuessedLetter(letter) {
    if (
      /^[a-zA-Z]$/.test(letter) &&
      !guessedLetters.includes(letter) &&
      !isGameOver
    ) {
      setGuessedLetters((prev) => [...prev, letter]);
    }
  }

  function startNewGame() {
    setCurrentWord(getARandomWord());
    setGuessedLetters([]);
  }

  return {
    currentWord,
    guessedLetters,
    wrongGuesses,
    isGameWon,
    isGameLost,
    isGameOver,
    isLastGuessCorrect,
    addGuessedLetter,
    startNewGame,
  };
}
