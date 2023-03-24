const {getAllRecipe} = require('../controllers/get/getAllRecipe')

const getNameSearch = async (name) => {
try {
    let allRecipe = await getAllRecipe()
    let filterName= allRecipe.filter(recipe=>recipe.name.toLowerCase().includes(name.toLowerCase()))
    return filterName
} catch (error) {
throw new Error('No se encontraron recetas')
}

}

module.exports= {getNameSearch}