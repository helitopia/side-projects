const recipeImage = document.querySelector("#recipe-image");
const recipeName = document.querySelector("#recipe-name");
const recipeInstructions = document.querySelector("#recipe-instructions");
const recipeIngredients = document.querySelector("#recipe-ingredients");
const videoContainer = document.querySelector("#video-container");
const recipeVideo = document.querySelector("#video");

const apiPropertyMapping = {
    IMAGE_THUMBNAIL: "strMealThumb",
    RECIPE_NAME: "strMeal",
    RECIPE_INSTRUCTIONS: "strInstructions",
    VIDEO_SOURCE: "strYoutube",
    INGREDIENT_WILDCARD: "strIngredient",
    MEASURE_WILDCARD: "strMeasure"
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

    static parseIngredientsAndMeasures(api) {
        let ingredients = [];
        for (let ingredientNum = 1; ; ingredientNum++) {
            let ingredient = api[apiPropertyMapping.INGREDIENT_WILDCARD + ingredientNum],
                measure = api[apiPropertyMapping.MEASURE_WILDCARD + ingredientNum];
            if (!ingredient || !measure)
                return ingredients;
            ingredients.push(`${ingredient} - ${measure}`);
        }
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
    getHtmlList(recipe.ingredients).forEach(r => recipeIngredients.appendChild(r));
    displayVideoIfExists(recipe.videoSource.slice(-11))
}

function getHtmlList(ingredients) {
    return ingredients.map(i => {
        let elem = document.createElement("li")
        elem.innerHTML = i;
        return elem;
    });
}

function displayVideoIfExists(videoId) {
    fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + videoId, {method: "HEAD"})
        .then(resp => {
            if (resp.status === 200)
                recipeVideo.src = `https://www.youtube.com/embed/${videoId}`;
            else
                videoContainer.style.display = "none"
        });
}

generateRecipe();