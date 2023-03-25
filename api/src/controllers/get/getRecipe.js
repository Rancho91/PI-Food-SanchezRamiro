const axios = require('axios');
const {Recipe, RecipeDiet} = require("../../db")
const {getDiets} = require("./getDiets")

 
const getRecipe = async (id) => {
try {
    if(isNaN(id)){
        const recipeDB = await Recipe.findByPk(id)
        console.log(recipeDB)
        if(recipeDB) {
            const listDiets = await getDiets()
            const dietRecipe = await RecipeDiet.findAll({
                attributes: ["DietId"],
                where:{
                    RecipeId: [id]
                }
            })
            let diets = []
            dietRecipe.forEach(diet => {
            let findDiet = listDiets.find(d=> d.id === diet.dataValues.DietId)
            diets.push(findDiet.name)});
            recipeDB.dataValues["diets"] = diets
            return recipeDB.dataValues}
    }
    const apiRecipe = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.DB_KEY}`) 
    const data= apiRecipe.data
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
data.vegetarian? newRecipe.diets.push(data.vegetarian) : null
data.vegan? newRecipe.diets.push(data.vegan) : null
data.glutenFree ? newRecipe.diets.push(data.vegan) : null
if(data.diets.length){
    data.diets.forEach(element => {
        newRecipe.diets.push(element)
    });
}

return newRecipe
} catch (error) {
    throw new Error(`A recipe with the id ${id} does not exist.`)
}

}

module.exports = { getRecipe }