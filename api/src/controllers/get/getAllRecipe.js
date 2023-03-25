const axios = require('axios')
const { DB_KEY, DB_KEY2 } = process.env
const { getAllRecipesDB } = require('./getAllRecipesDB')



const getAllRecipe = async () =>{ 
    const getAllRecipe = await axios('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5').then((response)=>response.data.results.map((data)=>{

    // const getAllRecipe = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_KEY2}&addRecipeInformation=true&number=100`).then((response)=>response.data.results.map((data)=>{
        const newRecipe = {
                id: data.id?data.id:null,
                name: data.title?data.title:null,
                image: data.image?data.image:null,
                summary: data.summary ? data.summary:null,
                healthScore: data.healthScore ? data.healthScore : null,
                steps: data.analyzedInstructions.length ? data.analyzedInstructions[0].steps.map((step)=>{
                    return{number: step.number, step: step.step }
                }) : null,
                diets: [],
            }
            if(data.diets.length){
                data.diets.forEach(element => {newRecipe.diets.push(element)});}
                return newRecipe
            }))
    const recipesDB = await getAllRecipesDB()
    const newArrayRecipes= recipesDB.concat(getAllRecipe)

    return newArrayRecipes 
}

module.exports = {getAllRecipe}