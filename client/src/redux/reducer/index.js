import {
    GET_ALL_RECIPE,
    GET_DIETS,
    FILTER_RECIPE,
    ORDERBYHS,
    ORDERNAME
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
        default: return state
    }
}

