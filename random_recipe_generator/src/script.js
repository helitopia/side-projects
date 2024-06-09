const generateRecipeBtn = document.querySelector("#generate-recipe");
const generatedRecipeContainer = document.querySelector("#generated-recipe-container")
const suggestRecipeContainer = document.querySelector("#suggest-recipe-container")

generateRecipeBtn.addEventListener("click", () => generateRecipe())

function generateRecipe() {
    suggestRecipeContainer.style.display = "none";
    generatedRecipeContainer.style.display = "block";
    //TODO: Fetch and display recipe information
}