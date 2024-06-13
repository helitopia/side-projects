const recipeImage = document.querySelector("#recipe-image");
const recipeName = document.querySelector("#recipe-name");
const recipeInstructions = document.querySelector("#recipe-instructions");
const recipeIngredients = document.querySelector("#recipe-ingredients");
const recipeVideo = document.querySelector("#video");

const apiPropertyMapping = {
    IMAGE_THUMBNAIL: "strMealThumb",
    RECIPE_NAME: "strMeal",
    RECIPE_INSTRUCTIONS: "strInstructions",
    VIDEO_SOURCE: "strYoutube",
    INGREDIENT_WILDCARD: "strIngredient{N}",
    MEASURE_WILDCARD: "strMeasure{N}"
};

class Recipe {
    constructor(apiJson) {
        console.log(apiJson)
        this.img = apiJson[apiPropertyMapping.IMAGE_THUMBNAIL];
        this.name = apiJson[apiPropertyMapping.RECIPE_NAME];
        this.instructions = apiJson[apiPropertyMapping.RECIPE_INSTRUCTIONS];
        this.ingredients = Recipe.parseIngredientsAndMeasures(apiJson)
        this.videoSource = apiJson[apiPropertyMapping.VIDEO_SOURCE];
    }

    static parseIngredientsAndMeasures(api){
        return ["a", "b", "c"] //demo
    }
}

function generateRecipe() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(r => r.json())
        .then(r => new Recipe(r.meals[0]))
        .then(displayRecipe);
}

function displayRecipe(recipe) {
    recipeImage.src = recipe.img;
    recipeName.textContent = recipe.name;
    recipeInstructions.textContent = recipe.instructions;
    getHtmlList(recipe.ingredients)
        .forEach(r => recipeIngredients.appendChild(r));
    recipeVideo.src = `https://www.youtube.com/embed/${recipe.videoSource.slice(-11)}`;
}

function getHtmlList(ingredients) {
    return ingredients.map(i => {
        let elem = document.createElement("li")
        elem.innerHTML = i;
        return elem;
    });
}

generateRecipe();