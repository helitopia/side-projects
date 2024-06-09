const generateRecipe = document.querySelector("#generate-recipe");
const generatedRecipeContainer = document.querySelector("#generated-recipe-container")

generateRecipe.addEventListener("click", () => generatedRecipeContainer.hidden = !generatedRecipeContainer.hidden)