const {deleteRecipe} = require("../controllers/deleteRecipeDB")

const deleteRecipeDBrouter = async (req,res) =>{
try {
    const {id} = req.params
    res.status(200).json(await deleteRecipe(id))
    
} catch (error) {
    res.status(400).json(error.error)
}
}

module.exports = {deleteRecipeDBrouter}