const {getAllRecipe} = require('../controllers/get/getAllRecipe')
const {getNameSearch} = require('./getNameSearch')
async function  getAllRecipeRoute (req, res){

    try {
        const {name} = req.query
        let allRecipe = []
    if(name){
             allRecipe= await getNameSearch(name)
        } else  { allRecipe = await getAllRecipe()}
       
        res.status(200).json(allRecipe)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
 
} 

module.exports = {getAllRecipeRoute }