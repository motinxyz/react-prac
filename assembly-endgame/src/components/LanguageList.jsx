import clsx from "clsx";
import { languages } from "../constants/languages";
import "../styles/LanguageList.css";

export default function LanguageList({ wrongGuesses }) {
  return (
    <section className="language-list">
      {languages.map((lang, i) => (
        <span
          key={lang.name}
          className={clsx("chip", i < wrongGuesses && "lost")}
          style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
        >
          {lang.name}
        </span>
      ))}
    </section>
  );
}
