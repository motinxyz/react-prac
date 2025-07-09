import { useEffect, useRef, useState } from "react";
import "../styles/GameSection.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Leaderboard from "./Leaderboard";
import useWindowSize from "../hooks/useWindowSize";

export default function MainSection() {
  const [diceArr, setDiceArr] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const [currentDiceRolled, setCurrentDiceRolled] = useState(0);
  const [prevStreaks, setPrevStreaks] = useState([]);
  const { width, height } = useWindowSize();

  function generateAllNewDice() {
    return new Array(10).fill().map(() => ({
      value: Math.ceil(Math.random() * 6),
      // value: 5,
      isHeld: false,
      id: nanoid(),
    }));
  }

  const resetGame = () => {
    setDiceArr(generateAllNewDice());
    setCurrentDiceRolled(0);
    setPrevStreaks((prevPrevStreaks) =>
      prevPrevStreaks.map((streak) =>
        streak.lastIn ? { ...streak, lastIn: false } : streak
      )
    );
  };

  // check if game is won
  const gameWon =
    diceArr.every((die) => die.isHeld) &&
    diceArr.every((die) => die.value == diceArr[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();

      // once the game won, change the prevStreaksState immediately
      // to reflect it in the leaderboard
      // and if you could place there
      // it will be highlighted
      setPrevStreaks((prevPrevStreaks) =>
        [...prevPrevStreaks, { value: currentDiceRolled, lastIn: true }]
          .sort((a, b) => a.value - b.value)
          .slice(0, 5)
      );
    }
  }, [gameWon]);

  function hold(id) {
    // const newDiceArr = [...diceArr];
    // newDiceArr.forEach((value, index) => {
    //   if (value.id === id) {
    //     newDiceArr[index].isHeld = value.isHeld ? true : true;
    //   }
    // });

    // setDiceArr(newDiceArr);

    setDiceArr((oldDiceArr) =>
      oldDiceArr.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = diceArr.map((dieObj) => (
    <Die
      key={dieObj.id}
      id={dieObj.id}
      value={dieObj.value}
      hold={() => hold(dieObj.id)}
      isHeld={dieObj.isHeld}
    />
  ));

  function rollDice() {
    setCurrentDiceRolled((oldCurrentDiceRolled) => oldCurrentDiceRolled + 1);
    setDiceArr((oldDiceArr) =>
      oldDiceArr.map((dieObj) =>
        dieObj.isHeld
          ? dieObj
          : {
              ...dieObj,
              value: Math.ceil(Math.random() * 6),
            }
      )
    );
  }

  return (
    <>
      <section className="game">
        {gameWon ? <Confetti width={width} height={height} /> : null}
        <div aria-live="polite">
          {gameWon && (
            <p className="sr-only">Congratulations you won the game!</p>
          )}
        </div>
        <div className="headings">
          <h1>Tenzies</h1>
          <p>
            Roll untill all die are same. Click each die to freeze it at it's
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{diceElements}</div>
        {gameWon ? (
          <button ref={buttonRef} id="btn-roll-dice" onClick={resetGame}>
            New Game
          </button>
        ) : (
          <button id="btn-roll-dice" onClick={rollDice}>
            Roll Dice
          </button>
        )}
      </section>

      <Leaderboard
        currentDiceRolled={currentDiceRolled}
        prevStreaks={prevStreaks}
        gameWon={gameWon}
      />
    </>
  );
}
