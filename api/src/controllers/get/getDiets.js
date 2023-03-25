const { Diet } = require('../../db')

const getDiets = async () =>{
    let findDiets = await Diet.findAll({})
    findDiets = findDiets.map((diet)=>{
        return diet.dataValues
    })
    return findDiets

}

module.exports = {getDiets}