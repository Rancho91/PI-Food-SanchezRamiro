const {Recipe, RecipeDiet} = require('../../db')
const {getDiets} = require ("./getDiets")


const getAllRecipesDB = async (id) => {

    const allRecipeDB = await Recipe.findAll()
    const listDiets = await getDiets()
    let allRecipe =  allRecipeDB.map(async (recipe)=>{
        let dietRecipe = await RecipeDiet.findAll({
            attributes: ["DietId"],
            where:{
                RecipeId: [recipe.id]
            }
        })
        let diets = []
        dietRecipe.forEach(diet => {
            let findDiet = listDiets.find(d=> d.id === diet.dataValues.DietId)
            diets.push(findDiet.name)

        });
        recipe.dataValues["diets"] = diets

        return recipe.dataValues
    })
    const allRecipes = await Promise.all(allRecipe)
    return allRecipes

}

module.exports = {getAllRecipesDB}