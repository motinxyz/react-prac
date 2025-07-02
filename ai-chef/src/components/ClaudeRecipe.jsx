import Markdown from "react-markdown";

export default function ClaudeRecipe(props) {
  console.log(props.recipe);
  return (
    <>
      <section>
        <Markdown>{props.recipe}</Markdown>
      </section>
    </>
  );
}
