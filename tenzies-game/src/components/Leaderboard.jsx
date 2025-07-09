import "../styles/Leaderboard.css";

export default function Leaderboard(props) {
  const prevStreaksItems = props.prevStreaks.map((streak, index) => {
    if (streak.lastIn) {
      return (
        <h3
          className="indv-streak highlight-last-in"
          key={`${streak.value}-${index}`}
        >
          {streak.value}
        </h3>
      );
    }
    return <h3 className="indv-streak">{streak.value}</h3>;
  });

  return (
    <section className="leaderboard">
      <h3 id="dice-rolled">
        Current Dice Rolled:{" "}
        <p
          id="current-dice-rolled-times"
          className={props.gameWon ? "" : "dice-shadow"}
        >
          {props.currentDiceRolled}
        </p>{" "}
        times
      </h3>
      {prevStreaksItems.length > 0 && (
        <div className="streaks">
          <h1>
            Best
            {prevStreaksItems.length > 4 ? " 5 " : " "}
            Streaks:
          </h1>
          {prevStreaksItems}
        </div>
      )}
    </section>
  );
}
