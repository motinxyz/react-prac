import { useState } from "react";
import "../css/MainSection.css";
import Die from "./Die";

export default function MainSection() {
  function generateAllNewDice() {
    return new Array(10).fill().map(() => Math.floor(Math.random() * 6) + 1);
  }
  const [diceArr, setDiceArr] = useState(generateAllNewDice());

  const diceElements = diceArr.map((val) => <Die value={val} />);

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      {/* <button id="roll-dice">Roll Dice</button> */}
    </main>
  );
}
