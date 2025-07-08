import { useState } from "react";
import "../styles/MainSection.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function MainSection() {
  const [diceArr, setDiceArr] = useState(() => generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill().map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const resetGame = () => setDiceArr(generateAllNewDice());

  // check if game is won
  const gameWon =
    diceArr.every((die) => die.isHeld) &&
    diceArr.every((die) => die.value == diceArr[0].value);

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
    <main>
      {gameWon ? <Confetti /> : null}
      <div className="headings">
        <h1>Tenzies</h1>
        <p>
          Roll untill all die are same. Click each die to freeze it at it's
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>
      {gameWon ? (
        <button id="btn-roll-dice" onClick={resetGame}>
          New Game
        </button>
      ) : (
        <button id="btn-roll-dice" onClick={rollDice}>
          Roll Dice
        </button>
      )}
    </main>
  );
}
