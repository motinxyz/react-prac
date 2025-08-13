import Button from "./Button";
import styles from "../styles/ButtonSection.module.css";

function ButtonSection({ buttonList, handleButtonClick }) {
  const buttonElementList = buttonList.map((buttonObj) => (
    <Button
      key={buttonObj.id}
      buttonObj={buttonObj}
      handleButtonClick={handleButtonClick}
    />
  ));
  return (
    <>
      <div className={styles.buttonSection}>{buttonElementList}</div>
    </>
  );
}

export default ButtonSection;
