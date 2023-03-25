const {Recipe} = require('../db')


const createRecipe = async ({name,image,summary, healthScore,steps = null, diets}) =>{
    steps = JSON.stringify(steps)
   
    const newRecipe = {name,image,summary,healthScore, steps}
    const createdRecipe = await Recipe.create(newRecipe)

    if(diets.length !== 0){
        await createdRecipe.addDiet(diets)
    }
     
    return createdRecipe.dataValues
}

module.exports = {createRecipe}