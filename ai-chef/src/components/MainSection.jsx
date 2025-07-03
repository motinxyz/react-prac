import "../css/MainSection.css";
import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import AddIngredientForm from "./AddIngredientForm";
import GetRecipeBlock from "./GetRecipeBlock";
import { getRecipeFromGemini, getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "chicken",
    "onion",
    "suger",
    "termarind",
  ]);
  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe != "" && recipeSection.current != null) {
      // recipeSection.current.scrollIntoView({ behavior: "smooth" });
      const yCoord = recipeSection.current.getBoundingClientRect().top;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  function addIngredient(formData) {
    const ingredient = formData.get("ingredient").toString().trim();
    ingredients.includes(ingredient)
      ? null
      : setIngredients((prevIngredients) => [ingredient, ...prevIngredients]);
  }

  async function getRecipe(provider) {
    // const generatedRecipeMD = await getRecipeFromMistral(ingredients);
    // const generatedRecipeMD;
    try {
      const generatedRecipeMD =
        provider === "mistral"
          ? await getRecipeFromMistral(ingredients)
          : await getRecipeFromGemini(ingredients);

      console.log(generatedRecipeMD);

      setRecipe(generatedRecipeMD);
    } catch (err) {
      console.error("Error fetching recipe:", err.message);
      return "Failed to get recipe."; // Handles failure gracefully
    }
  }

  return (
    <main>
      <div className="main-container">
        <AddIngredientForm addIngredientFunc={addIngredient} />
        <IngredientList ingredientsData={ingredients} />
      </div>
      <p></p>
      {ingredients.length > 3 ? (
        <GetRecipeBlock getRecipe={getRecipe} ref={recipeSection} />
      ) : null}
      {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
    </main>
  );
}
