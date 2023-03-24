const {getDiets} = require('../controllers/get/getDiets')

async function  getDietsRoute (req, res){
try {

    const diets = await getDiets()
    res.status(200).json(diets)
} catch (error) {
    res.status(300).json({error: 'No se encontraron Dietas'})
}
}

module.exports = {getDietsRoute}