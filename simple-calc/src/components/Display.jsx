import styles from "../styles/Display.module.css";

export default function Display({ eqn, isInputValid, isTransitioning }) {
  // console.log("Display: eqn: ", eqn);
  return (
    <div
      className={`${styles.inputDisplay} ${
        isInputValid ? "" : styles.wrongInput
      }`}
    >
      <div
        className={`${styles.inputText}  ${
          isTransitioning ? styles.fadeOutUp : styles.fadeIn
        }`}
      >
        {eqn.join(" ")}
      </div>
    </div>
  );
}
