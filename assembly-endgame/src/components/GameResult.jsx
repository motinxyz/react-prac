import "../css/GameResult.css";
import clsx from "clsx";
import { getFarewellText } from "../utils/utils";

export default function GameResult(props) {
  const isGameOver = props.isGameWon || props.isGameLost;

  const gameStatusClass = clsx("game-result", {
    languageLost: !props.isLastGuessCorrect && !isGameOver,
    won: props.isGameWon,
    lost: props.isGameLost,
  });

  getFarewellText();
  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {isGameOver ? (
        props.isGameWon ? (
          <>
            <h2>You Won!</h2>
            <p>Well Done! 👏🏼</p>
          </>
        ) : (
          <>
            <h2>Sorry! You Lost!</h2>
            <p>Better start learning Assembly! 😊</p>
          </>
        )
      ) : props.isLastGuessCorrect ? null : (
        <h2>{getFarewellText(props.lastEliminatedLanguage)}</h2>
      )}
    </section>
  );
}
