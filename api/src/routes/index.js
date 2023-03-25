const { Router } = require('express');
const { getRecipeRoute } = require('./getRecipeRoute')
const { postRecipe } = require('./postRecipeRoute')
const { getAllRecipeRoute } = require('./getAllRecipeRoute')
const {getDietsRoute} = require ('./getDietsRoute')
const {deleteRecipeDBrouter} = require("./deleteRecipeDB")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes/:idRecipe', getRecipeRoute)
router.post('/recipes', postRecipe)
router.get('/recipes', getAllRecipeRoute)
router.get('/diets', getDietsRoute)
router.delete('/recipes/:id', deleteRecipeDBrouter)

module.exports = router;
