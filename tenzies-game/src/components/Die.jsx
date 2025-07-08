import "../styles/Die.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button 
    style={styles} 
    onClick={() => props.hold(props.id)} 
    className="die">
      {props.value}
    </button>
  );
}
