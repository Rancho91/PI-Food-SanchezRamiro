
const {GET_ALL_RECIPE, GET_DIETS, FILTER_RECIPE, ORDERBYHS, ORDERNAME} =require("./types") 
const axios =require("axios") 
console.log(axios)


function getAllRecipes(){
    return function (dispatch){
      fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return dispatch({type: GET_ALL_RECIPE,
            payload: data})
      })
    }
}

function getDiets(){
  return function (dispatch){
    fetch('http://localhost:3001/diets')
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: GET_DIETS, payload: data})
    })
  }
}

function filterName(name, diet, db){
  return function (dispatch){
    fetch(`http://localhost:3001/recipes?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
console.log(data)
      if(db==="db") data = data.filter((d)=>Object.keys(d).includes("createInDB"))
      if(db=== "api")data = data.filter((d)=>!Object.keys(d).includes("createInDB"))
      if(diet !== "none"){
        data = data.filter((d)=>d.diets.includes(diet)===true)
      }
      console.log(data)
      return dispatch({
        type: FILTER_RECIPE, payload: data})
    })
  }
}

const orderByHS = (ascDesc) =>{

  return {type: ORDERBYHS, payload: ascDesc}

}

const orderName = (ascDesc) =>{
  return {type: ORDERNAME, payload: ascDesc}
}
module.exports = {getAllRecipes, getDiets, filterName, orderByHS, orderName}