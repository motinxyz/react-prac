export default function IngredientList(props) {

  const ingredientList = props.ingredientsData.map((ingredient) => {
    return <li key={ingredient}> {ingredient}</li>;
  });
  
  return (
    <>
      {ingredientList.length > 0 ? (
        <h1 id="list-title">Ingredient List:</h1>
      ) : null}
      <ul className="list-items">{ingredientList}</ul>
    </>
  );
}
