const formImg = [".bmp", ".gif", ".jpg", ".tif", ".png"]
export default function validate (recipe){
    const error = {}
    if(!recipe.name)  error.name="La receta debe tener un titulo"
    

    if(!recipe.healthScore) error.healthScore = "debe ingresar un valor en healtScore"
    if(isNaN(recipe.healthScore)) error.healthScore = "solo se pueden ingresar numeros"
    if(recipe.healthScore > 100) error.healthScore = "el valor maxio que se puede ingresar es 100"
    if(recipe.healthScore < 0) error.healthScore = "No se pueden ingresar numeros negativos"

    if(!formImg.includes(recipe.image.substr(-4))) error.image ="la imagen debe tener formato bmp, gif, jph, tif o png"
    return error
}
