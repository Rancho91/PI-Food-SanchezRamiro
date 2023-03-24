const {Recipe} = require('../db')
const {saveRecipeDiet } = require('./saveRecipeDietDB')

const createRecipe = async ({name,image,summary, healthScore,steps = null, diets}) =>{
    steps = JSON.stringify(steps)
   
    const newRecipe = {name,image,summary,healthScore, steps}
    const createRecipe = await Recipe.create(newRecipe)
    if(diets.length !== 0){
        diets.forEach(d=>saveRecipeDiet(createRecipe.dataValues.id,d))
    }
 
    
return createRecipe.dataValues
}

module.exports = {createRecipe}