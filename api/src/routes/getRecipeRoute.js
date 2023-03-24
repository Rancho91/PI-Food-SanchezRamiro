const {getRecipe} = require('../controllers/get/getRecipe')


async function  getRecipeRoute (req, res){
const {idRecipe} = req.params
try {
    const recipe = await getRecipe(idRecipe)

    res.status(200).json(recipe)
} catch (error) {
    res.status(400).json({error: error.message})
} 
}

module.exports = {getRecipeRoute}