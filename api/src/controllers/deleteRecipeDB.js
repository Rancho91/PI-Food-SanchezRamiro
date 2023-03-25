const {Recipe, RecipeDiet} = require("../db")


const deleteRecipe = async (id) =>{
try {
    const borrarRecipeDiet = await RecipeDiet.destroy({
        where:{
            RecipeId : [id]
        }
    })
    await Recipe.destroy({
        where: {
        id: [id]
        }
    });
    return "se elimino correctamente"
} catch (error) {
    return "hubo un error al borrar la receta"
}

}

module.exports = {deleteRecipe}