import clsx from "clsx";
import { letters } from "../constants/letters";
import "../styles/Keypad.css";

export default function Keypad({
  guessedLetters,
  currentWord,
  onLetterClick,
  isGameOver,
}) {
  return (
    <section className="keys">
      {letters.map((letter) => {
        const guessed = guessedLetters.includes(letter);
        const correct = guessed && currentWord.includes(letter);
        const wrong = guessed && !currentWord.includes(letter);

        return (
          <button
            key={letter}
            className={clsx({ correct, wrong })}
            onClick={() => onLetterClick(letter)}
            disabled={isGameOver}
            aria-label={`letter ${letter}`}
            aria-disabled={guessed}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </section>
  );
}
