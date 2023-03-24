const { Diet } = require('../../db')
const { getAllRecipe } = require('./getAllRecipe')

const saveDiets = async () =>{

    const allRecipe = await getAllRecipe()
    const recipeDiet = allRecipe.map(recipe =>{
        const diets = recipe.diets
        return diets
    })

    let findDiets = await Diet.findAll({
        attributes : ['name'],
    })
    
    findDiets = findDiets.map((diet)=>{
        return diet.dataValues
    })

    recipeDiet.forEach(diet => {
        diet?(diet.forEach(async d=>{
            if(!findDiets.some(diet=>diet.name===d)){
                const newDiet = {name: d}
                findDiets.push(newDiet)
                await Diet.create(newDiet)
            }
        })):(null)
    });

    return findDiets
}

module.exports = {saveDiets}