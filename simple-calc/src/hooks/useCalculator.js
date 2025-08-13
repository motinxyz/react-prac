import { useState } from "react";
import { calculate, opsOnSingleOperand } from "../utils/calculatorUtils";
import { DIGIT_REGEX, OPERATOR_REGEX } from "../constants/regex";

export function useCalculator() {
  const [eqn, setEqn] = useState(["0"]);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  function shakeInputField() {
    setIsInputValid(false);
    setTimeout(() => setIsInputValid(true), 300);
    console.warn("Invalid Input");
  }

  function handleButtonClick(buttonObj) {
    const pressedKey = buttonObj.value.trim().toLowerCase();
    const isPressedKeyADigit = DIGIT_REGEX.test(pressedKey);
    const isPressedKeyAnOperator = OPERATOR_REGEX.test(pressedKey);

    //
    // if the currently pressed key is C
    // clean the eqn var
    if (pressedKey === "c") {
      setEqn(["0"]);
    }
    // if back button pressed, remove last character from eqn
    else if (pressedKey === "<") {
      setEqn((prevEqn) => {
        const updatedEqn = prevEqn.map((part, index) => {
          if (index === eqn.length - 1) {
            return part.slice(0, -1);
          }
          return part;
        });

        const filterdEqn = updatedEqn.filter((part) => part !== "");
        if (filterdEqn.length === 0) {
          return ["0"];
        }
        return [...filterdEqn];
      });
    }
    //
    // if it is not C then check
    // if it is the 1st input in the eqn
    // as in it only has 0
    //
    else if (eqn.length === 1 && eqn[0] === "0") {
      // for 1-9, push it in the array
      if (/^[1-9]$/.test(pressedKey)) {
        setEqn(() => [pressedKey]);
      }
      // if it'a zero, don't add it to the eqn array
      // that way unnecessary 0 input at the beginning can be avoided
      else if (pressedKey === "0") {
        shakeInputField();
      }
      // for . input, push 0. in the array
      else if (pressedKey === ".") {
        setEqn(() => ["0."]);
      }

      // if it is any of these operator +*/,
      // then push the operator to the array
      else if (/^[+*/]$/.test(pressedKey)) {
        setEqn((prevEqn) => [...prevEqn, pressedKey]);
      }
      // if it is - operator, add it as the first entry
      else if (pressedKey === "-") {
        setEqn(() => [pressedKey]);
      }

      // if it's an equal don't show invalid animation
      else if (pressedKey === "=") {
        console.info("Nothing to calculate");
      }
      // reject all other keypress with an warning
      else {
        shakeInputField();
      }
    }

    //
    // it is the 2nd input
    // if eqn has 1 value in it, and it's not 0
    // we made sure that its a number/0./- in first step
    else if (eqn.length === 1) {
      // if the last entry is -0, only accept . input
      if (eqn[0] === "-0") {
        if (pressedKey === ".") {
          setEqn(() => "-0.");
        } else {
          shakeInputField();
        }
      }
      // check if it is -0. in that case, only accept numbers
      else if (eqn[0] === "-0.") {
        if (isPressedKeyADigit) {
          setEqn(() => "-0.".concat(pressedKey));
        } else {
          shakeInputField();
        }
      }

      // if it is not -0/-0. then we can move ahead
      // and check the currrent button press
      //
      // if currently pressed button is any digit
      // concat it with the first entry of eqn
      else if (isPressedKeyADigit) {
        setEqn((prevEqn) => {
          return [prevEqn[0].concat(pressedKey)];
        });
      }
      // if . is pressed
      else if (pressedKey === ".") {
        //  check if any . already exist
        if (eqn[0].includes(".")) {
          // if yes, skip adding with a warning
          shakeInputField();
        }
        // if not, concat the dot to the last entry
        else {
          setEqn((prevEqn) => [prevEqn[0].concat(pressedKey)]);
        }
      }

      // if anything else is pressed {. && c & digits handled}
      else {
        // before procedding, first check if the last entry
        // is complete, as in if it has a . at the end
        if (eqn[0].endsWith(".")) {
          // skip adding with a warning
          shakeInputField();
        }

        // if not means, last entry is complete now go ahead
        else {
          // check key press is an equal operator
          if (pressedKey === "=") {
            console.info("Nothing to Calculate!");
          }
          // check if it is any of |x|, +/-
          else if (pressedKey === "+/-" || pressedKey === "|x|") {
            // if yes, calculate & set it
            setEqn((prevEqn) => [opsOnSingleOperand(prevEqn[0], pressedKey)]);
          } else {
            // otherwise add the operand to the eqn
            setEqn((prevEqn) => [...prevEqn, pressedKey]);
          }
        }
      }
    }

    // one operand and 1 operator exist
    // now the 2nd value
    else if (eqn.length === 2) {
      // if it's 0-9 is pressed, add as the 3rd value in eqn
      if (isPressedKeyADigit) {
        setEqn((prevEqn) => [...prevEqn, pressedKey]);
      }
      // if - is pressed, add it
      else if (pressedKey === "-") {
        setEqn((prevEqn) => [...prevEqn, pressedKey]);
      }
      // if . is pressed, add 0.
      else if (pressedKey === ".") {
        setEqn((prevEqn) => [...prevEqn, "0."]);
      }
      // if operator is pressed, reject the value
      else {
        shakeInputField();
      }
    }

    // 2nd value still going
    else if (eqn.length === 3) {
      if (eqn[2] === "-") {
        if (isPressedKeyADigit) {
          setEqn((prevEqn) => [
            prevEqn[0],
            prevEqn[1],
            prevEqn[2].concat(pressedKey),
          ]);
        } else {
          shakeInputField();
        }
      }
      // if it starts with 0, only accept .
      else if (eqn[2] === "0") {
        if (pressedKey === ".") {
          setEqn((prevEqn) => [
            prevEqn[0],
            prevEqn[1],
            prevEqn[2].concat(pressedKey),
          ]);
        }
        // check if pressed key is +-*/ or =
        else if (isPressedKeyAnOperator) {
          setIsTransitioning(true);
          setTimeout(() => {
            setEqn([calculate(eqn), pressedKey]);
            setIsTransitioning(false);
          }, 400);
        } else if (pressedKey === "=") {
          setIsTransitioning(true);
          setTimeout(() => {
            setEqn([calculate(eqn)]);
            setIsTransitioning(false);
          }, 400);
        } else {
          // also rejects divideByZero operation
          shakeInputField();
        }
      }

      // now check against the input digits
      // a number key is pressed
      else if (isPressedKeyADigit) {
        setEqn((prevEqn) => [
          prevEqn[0],
          prevEqn[1],
          prevEqn[2].concat(pressedKey),
        ]);
      }
      // if . is pressed
      else if (pressedKey === ".") {
        // check if any . already exists
        if (eqn[2].includes(".")) {
          shakeInputField();
        } else {
          setEqn((prevEqn) => [
            prevEqn[0],
            prevEqn[1],
            prevEqn[2].concat(pressedKey),
          ]);
        }
      }

      // if single operand operator is pressed
      else if (pressedKey === "|x|" || pressedKey === "+/-") {
        setEqn((prevEqn) => [
          prevEqn[0],
          prevEqn[1],
          opsOnSingleOperand(eqn[2], pressedKey),
        ]);
      }
      // if = is pressed
      else if (pressedKey === "=") {
        // during parsing
        setIsTransitioning(true);
        setTimeout(() => {
          setEqn([calculate(eqn)]);
          setIsTransitioning(false);
        }, 400);
      }
      // if +-*/ is pressed calculate the last function
      // and add the latest operator as the 2nd entry in eqn
      else if (isPressedKeyAnOperator) {
        setIsTransitioning(true);
        setTimeout(() => {
          setEqn([calculate(eqn), pressedKey]);
          setIsTransitioning(false);
        }, 400);
      }
    }

    console.info("Equation: ", eqn.join(""));
  }

  return { eqn, isInputValid, handleButtonClick, isTransitioning };
}
