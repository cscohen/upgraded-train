console.log('This is connected!')
const recTitle = el('food-title')
const recInstruction = el('recipe') 
const recImg = el('food-image')
const randomMealButton = el('randomFood')
const randomRec = document.getElementById('meal');
const mealSearch = 'http://www.themealdb.com/api/json/v1/1/search.php?s='
const getRandomRec = 'https://themealdb.com/api/json/v1/1/random.php'

//generate the meal
const generateMeal = meal => {
    const ingredients = []
    //loop throught the data returned from the randomGenerator
    for (let i = 1; i <= 30; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
            //no more ingredients, stop
			break;
		}
	}
    //append the data from returned data and make it into something readable
    const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image" id='recipeImage'>
			</div>
				<h2>${meal.strMeal}</h2>
                ${meal.strArea ? `<p><strong>Region:</strong> ${meal.strArea}</p>` : ''}
                <h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
				<p>${meal.strInstructions}</p>

		</div>
	`
//    recTitle = meal.strMeal
// how to get title above the button to also generate
    randomRec.innerHTML = newInnerHTML;
};

//uses the random api fetch to grab a random recipe on click
randomMealButton.addEventListener('click', () => {
    fetch(getRandomRec)
    .then(resp => resp.json())
    .then(res => {
        generateMeal(res.meals[0])
    })
})

//trying initial api once again

//api search using a term fetches url and concats the search value
function recipeSearch(mealName) {
    fetch(mealSearch, + mealName)
    .then(resp => resp.json())
    .then(resp => {
        generateMeal(res.meals[0])
    })
}


function el(id) {
    return document.getElementById(id)
}