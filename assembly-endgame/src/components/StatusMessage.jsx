export default function StatusMessage({
  currentWord,
  guessedLetters,
  wrongGuesses,
}) {
  const last = guessedLetters[guessedLetters.length - 1];

  return (
    <section className="sr-only" aria-live="polite" role="status">
      <p>
        {last && currentWord.includes(last)
          ? `Correct! The letter ${last} is in the word!`
          : last
          ? `Sorry! The letter ${last} is not in the word!`
          : ""}
        You have {8 - wrongGuesses} guesses left!
      </p>
    </section>
  );
}
