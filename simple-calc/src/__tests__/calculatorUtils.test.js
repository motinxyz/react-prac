import { calculate, opsOnSingleOperand } from "../utils/calculatorUtils";

describe("calculate()", () => {
  it("adds two numbers", () => {
    expect(calculate(["2", "+", "3"])).toBe("5");
  });

  it("subtracts two numbers", () => {
    expect(calculate(["5", "-", "2"])).toBe("3");
  });

  it("multiplies two numbers", () => {
    expect(calculate(["4", "*", "2"])).toBe("8");
  });

  it("divides two numbers", () => {
    expect(calculate(["10", "/", "2"])).toBe("5");
  });
});

describe("opsOnSingleOperand()", () => {
  it("returns absolute value for |x|", () => {
    expect(opsOnSingleOperand("-5", "|x|")).toBe("5");
    expect(opsOnSingleOperand("5", "|x|")).toBe("5");
  });

  it("negates value for +/-", () => {
    expect(opsOnSingleOperand("5", "+/-")).toBe("-5");
    expect(opsOnSingleOperand("-3", "+/-")).toBe("3");
  });
});
