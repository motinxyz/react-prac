export default function GetRecipeBlock(props) {
  return (
    <>
      <div className="get-recipe" ref={props.ref}>
        <div className="text-section">
          <h1>Ready for a recipe?</h1>
          <h4>Get a recipe for the ingredients you have in hand</h4>
        </div>
        <div className="button-section">
          <button
            className="get-recipe-button"
            onClick={() => props.getRecipe("gemini")}
          >
            Get using Gemini
          </button>
          <button
            className="get-recipe-button"
            onClick={() => props.getRecipe("mistral")}
          >
            Get using Mistral
          </button>
        </div>
      </div>
    </>
  );
}
