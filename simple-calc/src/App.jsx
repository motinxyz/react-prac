import ButtonSection from "./components/ButtonSection";
import Display from "./components/Display";
import styles from "./styles/App.module.css";
import buttonList from "./constants/buttonList";
import { useCalculator } from "./hooks/useCalculator";

export default function App() {
  const { eqn, isInputValid, handleButtonClick, isTransitioning } = useCalculator();

  return (
    <main className={styles.calculator}>
      <Display eqn={eqn} isInputValid={isInputValid} isTransitioning={isTransitioning} />

      <ButtonSection
        buttonList={buttonList}
        handleButtonClick={handleButtonClick}
      />
    </main>
  );
}
