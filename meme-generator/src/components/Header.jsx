import "./Header.css";
import trollFaceLogo from "../images/troll-face.png";

export default function Header() {
  return (
    <header>
      <img src={trollFaceLogo} alt="Meme Face" />
      <h1>Meme Generator</h1>
    </header>
  );
}
