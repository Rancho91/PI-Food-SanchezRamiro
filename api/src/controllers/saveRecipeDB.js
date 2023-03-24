const axios = require('axios')
const {getRecipe} = require('./get/getRecipe')
const { Recipe } = require('../db')
console.log(Recipe)

const getAllRecipe = async () =>{
    try {
        let i= 1;
        let allRecipe = [];
        
        while(allRecipe.length<2){
           const recipeP = await getRecipe(i)
           allRecipe.push(recipeP)
           i++

        }
        allRecipe = (await Promise.all(allRecipe)).map((recipe)=>{
            return({
                id:recipe.id,
                name:recipe.name,
                image:recipe.image,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                steps: recipe.steps
            })
        })
    let allRecipesArr = []
    allRecipe.map(recipe=>{allRecipesArr = allRecipesArr.concat(recipe)})

    return allRecipesArr
    } catch (error) {
        throw new Error('No se pudo cargar la base de datos')
    }

}

const saveAllRecipeDB = async () =>{
    try {
        let allRecipe = await getAllRecipe()
        let saveRecipes = await Recipe.bulkCreate(allRecipe)
        return saveRecipes
    } catch (error) {
        return error.message
    }
}
module.exports = { saveAllRecipeDB }