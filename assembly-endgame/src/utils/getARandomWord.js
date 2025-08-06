import { words } from "../words";

export default function getARandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
