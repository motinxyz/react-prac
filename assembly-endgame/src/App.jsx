import GameResult from "./components/GameResult";
import Header from "./components/Header";
import { languages } from "./languages";
import "./App.css";
import { useState } from "react";
import clsx from "clsx";
import useWindowSize from "./hooks/useWindowSize";
import Confetti from "react-confetti";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toaster, toast } from "react-hot-toast";
import { getARandomWord } from "./utils/utils";

export default function App() {
  // state variables
  const [currentWord, setCurrentWord] = useState(() => getARandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const { windowHeight, windowWidth } = useWindowSize();

  // derived veriables
  const wrongGuesses = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuesses === languages.length - 1;
  const isGameOver = isGameLost || isGameWon;

  const isLastGuessCorrect =
    guessedLetters.length !== 0
      ? currentWord.includes(guessedLetters[guessedLetters.length - 1])
      : true;

  // useEffect(() => {
  //   if (wrongGuesses > 0) {
  //     // toast.success("Wrong guess is " + wrongGuesses);
  //     toast("hot-toast: Wrong guess is " + wrongGuesses);
  //   }
  // }, [wrongGuesses]);

  // static variables

  function startNewGame() {
    setGuessedLetters([]);
    setCurrentWord(getARandomWord());
  }
  function addGuessedLetter(letter) {
    if (
      letter.match(/[a-zA-Z]/g) !== null &&
      letter.length === 1 &&
      wrongGuesses < languages.length - 1 &&
      !isGameOver
    ) {
      setGuessedLetters((prevguessedLetters) =>
        prevguessedLetters.includes(letter)
          ? prevguessedLetters
          : [...prevguessedLetters, letter]
      );
    } else {
      throw new Error("You have no more guesses left");
    }
  }

  const languageElements = languages.map((lang, index) => {
    const styles = { backgroundColor: lang.backgroundColor, color: lang.color };
    const isLangLost = index < wrongGuesses;
    const className = clsx("chip", isLangLost && "lost");
    return (
      <span className={className} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = guessedLetters.includes(letter) || isGameLost;
    const undiscoveredLetterStyle = clsx(
      isGameOver && !guessedLetters.includes(letter) && "undiscovered-letter"
    );

    return (
      <span key={index} className={undiscoveredLetterStyle}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const keyElements = letters.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        className={className}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
        aria-label={`letter ${letter}`}
        aria-disabled={guessedLetters.includes(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });
  return (
    <>
      <Header />
      <GameResult
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessCorrect={isLastGuessCorrect}
        lastEliminatedLanguage={languages[wrongGuesses - 1]?.name}
      />
      <section className="language-list">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keys">{keyElements}</section>

      {isGameOver ? (
        <section className="new-game-button">
          <button onClick={startNewGame}>New Game</button>
        </section>
      ) : null}

      {isGameWon ? (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={1000}
        />
      ) : null}

      {/* Combined visually hidden region for aria-live status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {guessedLetters.length > 0 &&
          currentWord.includes(guessedLetters[guessedLetters.length - 1])
            ? `Correct! The letter ${
                guessedLetters[guessedLetters.length - 1]
              } is in the word!`
            : `Sorry!  The letter ${
                guessedLetters[guessedLetters.length - 1]
              } is not in the word!`}
          You have {languages.length - 1 - wrongGuesses} more guesses left!
        </p>

        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) => {
              guessedLetters.includes(letter) ? letter + "." : "blank.";
            })
            .join(" ")}
        </p>
      </section>
      {/* <ToastContainer position="bottom-right" autoClose={1000} theme="dark" /> */}
      {/* <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
          },
        }}
      /> */}
    </>
  );
}
