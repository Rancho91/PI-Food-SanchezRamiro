const {createRecipe} = require('../controllers/createRecipe')

async function  postRecipe (req, res){
const recipe = req.body
try {
        const create = await createRecipe(recipe)
                res.status(200).json(create)
} catch (error) {
     res.status(404).json({error: 'no se pudo crear la receta'})

}
}

module.exports = {postRecipe}