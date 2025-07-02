import "../css/MainSection.css";
import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import AddIngredientForm from "./AddIngredientForm";
import GetRecipeBlock from "./GetRecipeBlock";
import { getRecipeFromGemini, getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");

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
      {ingredients.length > 3 ? <GetRecipeBlock getRecipe={getRecipe} /> : null}
      {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
    </main>
  );
}
