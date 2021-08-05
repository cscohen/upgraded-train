console.log('This is connected!')
const recTitle = el('food-title')
const recInstruction = el('recipe') 
const recImg = el('food-image')
const randomMealButton = el('randomFood')
const randomRec = el('meal');
const imageHolder = el('mealCard')
const mealSearch = 'http://www.themealdb.com/api/json/v1/1/search.php?s='
const getRandomRec = 'https://themealdb.com/api/json/v1/1/random.php'
const likeBtn = document.getElementById('fg-like-button')

const form = el('sumbitForm')

const search = el('search')
const submit = el('submit')

likeBtn.addEventListener('click', () => {
    renderHeart();
})

function renderHeart() {
    likeBtn.innerText = `♥`
}

const generateRegionMeal = meal => {
        const regionalMenu = []
        //loop throught the data returned from the randomGenerator
        for (let i = 1; i <= 30; i++) {
            if (meal[`strMeal${i}`]) {
                regionalMenu.push(
                    `${meal[`strMeal${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else {
                //no more ingredients, stop
                break
            }
        }
        //append the data from returned data and make it into something readable
        //there has to be a better way for this one this needs formatting as well
        const newInnerHTML = `
            <div>
                <div>
                    <img src="${meal.strMealThumb}" alt="Meal Image" id='mealCard'>
                </div>
                    <h2>${meal.strMeal}</h2>
            </div>
        `
    //    recTitle = meal.strMeal
    // how to get title above the button to also generate
        randomRec.innerHTML = newInnerHTML;
    }
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
			break
		}
	}
    //append the data from returned data and make it into something readable
    //there has to be a better way for this one this needs formatting as well
    const newInnerHTML = `
		<div>
				
				<h2>${meal.strMeal}</h2>
                ${meal.strArea ? `<p><strong>Region:</strong> ${meal.strArea}</p>` : ''}
                <h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
				<p>${meal.strInstructions}</p>

		</div>
	`    
  imageHolder.src = meal.strMealThumb

//    recTitle = meal.strMeal
// how to get title above the button to also generate
    randomRec.innerHTML = newInnerHTML;
};
console.log(form)
//uses the random api fetch to grab a random recipe on click
randomMealButton.addEventListener('click', () => {
    fetch(getRandomRec)
    .then(resp => resp.json())
    .then(res => {
        generateMeal(res.meals[0])
    })
})
//event listener to on submit of the form to run the data
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const mealName = search.value
    recipeSearch(mealName)
}) 

//api search using a term fetches url and concats the search value
function recipeSearch(mealName) {
const mealSearchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`+mealName
fetch(mealSearchURL)
.then(resp => resp.json())
.then(resp => {
        generateMeal(resp.meals[0])
    })
}
//recipeSearch('banana')

function regionSearch(region) {
    const regionSearchURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=`+region
    fetch(regionSearchURL)
        .then(resp => resp.json())
        .then(resp => {
            generateRegionMeal(resp.meals[0])
        })
    }
//console.log(regionSearch('Canadian'))
//recipeSearch('chicken')

function el(id) {
    return document.getElementById(id)
}