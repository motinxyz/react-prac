export default function AddIngredientForm(props) {
  return (
    <>
      <form action={props.addIngredientFunc} className="add-ingredient-form">
        <input
          id="ingredient-box"
          type="text"
          placeholder="e.g. Oregano"
          aria-label="Add Ingredient"
          name="ingredient"
        />
        <button onClick="" onMouseOver="">
          Add Ingredient
        </button>
      </form>
    </>
  );
}
