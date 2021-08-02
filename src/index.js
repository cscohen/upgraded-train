console.log('This is connected!')
//will concantinating like this work or does the api key need to be added after the call, will test
//const searchRec = `https://api.spoonacular.com/food/products/search?query=${SEARCH}&apiKey=cebc02cede0d49a7826aebdc2841d080`
//?apiKey=cebc02cede0d49a7826aebdc2841d080
const getRandomRec = 'https://api.spoonacular.com/recipes/random?apiKey=cebc02cede0d49a7826aebdc2841d080'

fetch(getRandomRec)
.then(resp => resp.json())
.then(buildRecipe)

function recipeSearch() {
    
}
function randomRec() {

}
function buildRecipe(data) {
    recTitle = data.title
//    recImg.src = data.image
    recAbout = data.recAbout
    recInstruction = data.insturctions
    recIngredients = data.extendedIngredients
    console.log(data)

}