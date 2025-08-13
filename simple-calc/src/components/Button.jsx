import styles from "../styles/Button.module.css";

export default function Button({ buttonObj, handleButtonClick }) {
  return (
    <>
      <button
        className={styles.calcButton}
        onClick={() => handleButtonClick(buttonObj)}
      >
        {buttonObj.value}
      </button>
    </>
  );
}

// float: right;
