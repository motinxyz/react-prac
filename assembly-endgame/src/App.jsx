import Header from "./components/Header";
import GameResult from "./components/GameResult";
import LanguageList from "./components/LanguageList";
import WordDisplay from "./components/WordDisplay";
import Keypad from "./components/Keypad";
import NewGameButton from "./components/NewGameButton";
import StatusMessage from "./components/StatusMessage";
import Confetti from "react-confetti";
import useWindowSize from "./hooks/useWindowSize";
import useGameLogic from "./hooks/useGameLogic";
import "./styles/App.css";
import { languages } from "./constants/languages";

export default function App() {
  const {
    currentWord,
    guessedLetters,
    wrongGuesses,
    isGameWon,
    isGameLost,
    isGameOver,
    isLastGuessCorrect,
    startNewGame,
    addGuessedLetter,
  } = useGameLogic();

  const { width, height } = useWindowSize();

  return (
    <>
      <Header />
      <GameResult
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessCorrect={isLastGuessCorrect}
        lastEliminatedLanguage={languages[wrongGuesses - 1]?.name}
      />

      <LanguageList wrongGuesses={wrongGuesses} />
      <WordDisplay
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
      />

      <Keypad
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        onLetterClick={addGuessedLetter}
        isGameOver={isGameOver}
      />
      {isGameOver && <NewGameButton onClick={startNewGame} />}
      {isGameWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
      <StatusMessage
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        wrongGuesses={wrongGuesses}
      />
    </>
  );
}
