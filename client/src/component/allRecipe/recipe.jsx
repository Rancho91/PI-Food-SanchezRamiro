import { Link } from "react-router-dom";
import styles from "./recipe.module.css"
export default function Recipe({id,name,image,diets, healthScore}){


console.log(diets)
    return(<div className={styles.recipe}> 
            <h1>{name}</h1>
            <h4>{healthScore}</h4>
            <Link to={`/recipe/${id}`}>
            <img src={image} alt={name}></img>
            </Link >
            <ul>
            {
            diets?(diets.map((diet)=>{
                return(<li>{ diet}  </li>)
            })):(<h6>No posee dietas</h6>)
            }
            </ul>
  

    </div>)
}