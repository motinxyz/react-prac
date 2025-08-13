export function calculate(eqn) {
  const firstNum = parseFloat(eqn[0]);
  const lastNum = parseFloat(eqn[2]);
  var result;

  if (eqn[1] === "+") {
    result = firstNum + lastNum;
  } else if (eqn[1] === "-") {
    result = firstNum - lastNum;
  } else if (eqn[1] === "*") {
    result = firstNum * lastNum;
  } else if (eqn[1] === "/") {
    result = firstNum / lastNum;
  }
  return result.toString();
}

export function opsOnSingleOperand(num, operator) {
  if (operator.toLowerCase() === "|x|") {
    if (num.startsWith("-")) {
      return (parseFloat(num) * -1).toString();
    } else {
      return num;
    }
  } else if (operator === "+/-") {
    return (parseFloat(num) * -1).toString();
  }
}
