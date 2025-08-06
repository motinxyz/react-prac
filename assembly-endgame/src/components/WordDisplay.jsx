import clsx from "clsx";
import "../styles/WordDisplay.css";

export default function WordDisplay({
  currentWord,
  guessedLetters,
  isGameLost,
  isGameOver,
}) {
  return (
    <section className="word">
      {currentWord.split("").map((letter, i) => {
        const showLetter = guessedLetters.includes(letter) || isGameLost;
        const className = clsx(
          isGameOver &&
            !guessedLetters.includes(letter) &&
            "undiscovered-letter"
        );
        return (
          <span key={i} className={className}>
            {showLetter ? letter.toUpperCase() : ""}
          </span>
        );
      })}
    </section>
  );
}
