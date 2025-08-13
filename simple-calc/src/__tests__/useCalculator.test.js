import { renderHook, act, waitFor } from "@testing-library/react";
import { useCalculator } from "../hooks/useCalculator";

describe("useCalculator", () => {
  it("initializes with ['0']", () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.eqn).toEqual(["0"]);
    expect(result.current.isInputValid).toBe(true);
  });

  it("handles digit input correctly", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({ value: "5" });
    });

    expect(result.current.eqn).toEqual(["5"]);
  });

  it("rejects invalid input and triggers shake", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({ value: "@" });
    });

    expect(result.current.isInputValid).toBe(false);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.isInputValid).toBe(true);
  });

  it("calculates correctly on '=' press", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(() => result.current.handleButtonClick({ value: "C" }));

    await act(() => result.current.handleButtonClick({ value: "2" }));
    await waitFor(() => expect(result.current.eqn).toEqual(["2"]));

    await act(() => result.current.handleButtonClick({ value: "+" }));
    await waitFor(() => expect(result.current.eqn).toEqual(["2", "+"]));

    await act(() => result.current.handleButtonClick({ value: "3" }));
    await waitFor(() => expect(result.current.eqn).toEqual(["2", "+", "3"]));

    await act(() => result.current.handleButtonClick({ value: "=" }));
    await waitFor(() => expect(result.current.eqn).toEqual(["5"]));

    console.log("Final eqn:", result.current.eqn);
  });
});
