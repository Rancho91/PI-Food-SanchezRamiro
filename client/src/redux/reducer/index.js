import Recipe from "../../component/allRecipe/recipe";
import {
    GET_ALL_RECIPE,
    GET_DIETS,
    FILTER_RECIPE,
    ORDERBYHS,
    ORDERNAME,
    DELETE_RECIPE,
    FIILTER_DIET_AIP
  } from "../actions/types"; 

const initialState = {
    allRecipeApi: [],
    dietsList: [],
    filters: []
}

export default function reducer(state = initialState , { type, payload }) {
    switch(type){
    case GET_ALL_RECIPE:{
        return ({...state,allRecipeApi: payload, filters: payload})
    }
    case GET_DIETS:{
        return({...state, dietsList: payload})
    } 
    case FILTER_RECIPE:{
    
        return({...state, filters:[...payload]})  
    }
    case ORDERBYHS:{
        if(payload){
        function comparar ( a, b ){ return a.healthScore - b.healthScore; }
        const order = state.filters.sort(comparar)
        return{...state, filters:[...order]}
        } else {
        function comparar ( a, b ){ return -(a.healthScore - b.healthScore); }
        const order = state.filters.sort(comparar)
        return{...state, filters:[...order]}}
    }
    case ORDERNAME: {
        if(payload){
            function comparar ( a, b ){
                if (a.name.toLowerCase()> b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
              }
              console.log("estoy ordenando")
            const order= state.filters.sort(comparar)
            return{...state, filters:[...order]} 
        } else {function comparar ( a, b ){
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          }
        const order = state.filters.sort(comparar)
        return{...state, filters:[...order]}}
    } 
    case DELETE_RECIPE:{
      return{...state, filters:state.filters.filter((recipe)=>recipe.id !==payload)}
    }
    case FIILTER_DIET_AIP:{
        let filter = state.allRecipeApi
        const {diet, db} = payload
        if(db==="db") filter = filter.filter((d)=>Object.keys(d).includes("createInDB"))
        if(db=== "api")filter = filter.filter((d)=>!Object.keys(d).includes("createInDB"))
        if(diet !== "all")filter = filter.filter((d)=>d.diets.includes(diet)===true)
            return {...state, filters: filter}
    }
    
        default: return state
    } 

}

