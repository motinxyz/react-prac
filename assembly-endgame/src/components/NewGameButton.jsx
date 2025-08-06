import "../styles/NewGameButton.css";

export default function NewGameButton({ onClick }) {
  return (
    <section className="new-game-button">
      <button onClick={onClick}>New Game</button>
    </section>
  );
}
