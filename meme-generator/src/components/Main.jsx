import "./Main.css";
import React from "react";

export default function Main() {
  const [memeLib, setMemeLib] = React.useState([]);

  const [meme, setMeme] = React.useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    memeUrl: "http://i.imgflip.com/1bij.jpg",
  });

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setMemeLib(data.data.memes);
      });
  }, []);

  function handleMemeImageChange() {
    const randMemeSerial = Math.floor(Math.random() * 100) + 1;
    setMeme((prevMeme) => ({
      ...prevMeme,
      memeUrl: memeLib[randMemeSerial].url,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  const defPlaceholder = "Write something...";

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder={defPlaceholder}
            name="topText"
            id=""
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            name="bottomText"
            placeholder={defPlaceholder}
            value={meme.bottomText}
            onChange={handleChange}
            id=""
          />
        </label>

        <button onClick={handleMemeImageChange}>Get a new meme</button>
      </div>
      <div className="meme">
        <img src={meme.memeUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
