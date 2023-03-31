import { Link } from "react-router-dom";
import styles from "./recipe.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import  {deleteRecipe}  from "../../redux/actions/index"
import axios from "axios"


export default function Recipe({id,name,image,diets, healthScore,createInDB}){

    const [isError, setIsError] =useState(false)
    const dispatch = useDispatch()

const deleteRecipeDB= async()=>{
  
    await axios.delete(`http://localhost:3001/recipes/${id}`)
    dispatch(deleteRecipe(id))
   
}
const handleImageError=()=>{
 
        setIsError(true)
    
    
}
const handleImageLoad = () =>{
    setIsError(false)
}

    return(
            <div className={styles.recipe}> 
                <h1>{name}</h1>
                <Link to={`/recipe/${id}`}>
                {
                    isError&&createInDB?(<img src="/imgPorDefecto.jpg" alt="Imagen por defecto" />)
                    :
                    (<img src={image} onError={handleImageError} onLoad={handleImageLoad} alt={name}></img>)
                }
                    
                </Link >
                <ul>
            {
            diets?(diets.map((diet)=>{
                return(<li>{ diet}  </li>)
            })):(<h6>No posee dietas</h6>)
            }
            
            </ul>
            <div className={styles.delete}>
            {createInDB?(<button onClick={deleteRecipeDB} >X</button>):null}
            </div>

    </div>)
}