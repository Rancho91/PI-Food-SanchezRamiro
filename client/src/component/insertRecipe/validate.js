const formImg = [".bmp", ".gif", ".jpg", ".tif", ".png"]
const soloLetras = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
export default function validate (recipe){
    const error = {}
    if(!recipe.name)  error.name="The recipe must have a title"
    if(soloLetras.test(recipe.name)===false) error.name="Only letters can be entered to name"

    if(!recipe.healthScore) error.healthScore = "You must enter a value in health Score"
    if(isNaN(recipe.healthScore)) error.healthScore = "Only numbers can be entered"
    if(recipe.healthScore > 100) error.healthScore = "The maximum value that can be entered is 100"
    if(recipe.healthScore < 0) error.healthScore = "Negative numbers cannot be entered"
    if(recipe.summary.length >200) error.summary = "the summary cannot be longer than 300 characters"
    if(!formImg.includes(recipe.image.substr(-4))) error.image ="The image must be in bmp, gif, jph, tif or png format"
    return error
}
