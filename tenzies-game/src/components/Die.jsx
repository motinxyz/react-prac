import "../css/Die.css";

export default function Die(props) {
  return (
    <button className="die">{props.value}</button>
  );
}
