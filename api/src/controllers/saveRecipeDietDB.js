const {RecipeDiet} = require('../db')

const saveRecipeDiet = async (idRecipe, idDiet) =>{

    const obj = {RecipeId: idRecipe, DietId : idDiet}
const newRecipeDiet = await RecipeDiet.create(obj)
return newRecipeDiet
}

module.exports = {saveRecipeDiet}