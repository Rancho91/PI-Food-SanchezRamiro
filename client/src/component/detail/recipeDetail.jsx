import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import styles from "./recipeDetail.module.css"
import NavBar from "../NavBar/navBar"


export default function RecipeDetail(){
    const [recipe, setRecipe] = useState({})
    const {id} = useParams()
console.log(id)
    useEffect(()=>{
        fetch(`http://localhost:3001/recipes/${id}`)
        .then((response) => response.json())
        .then((data) => {
            if(Object.keys(data).includes("createInDB")){
                if(data.steps !== "null"){
                let steps = JSON.parse(data.steps)
                setRecipe({...data, steps:[...steps]})
                } else {
                    let steps = null
                    setRecipe({...data, steps:steps})}              
            } else {
              data?(setRecipe(data)):window.alert("There are no characters with that ID");  
            }            
        })
        .catch((err) => {
            window.alert("There are no characters with that ID");
          });
        
     return setRecipe({})
    },[id])
    console.log(recipe.diets)
    console.log(recipe)

    return(
        <div className={styles.conteiner}>
            <NavBar/>           
            <div className={styles.diets}>
                 {recipe.diets?(
                 <ul>
                    {recipe.diets.map((d)=>{
                        if(d===true) return null
                    return(
                        <li>{d}</li>
                    )
                    })}
                 </ul>
                ):null}
            </div>
            
            {recipe.healthScore?<h3>Health Score: {recipe.healthScore}</h3>:null}
            <img src={recipe.image} alt="" />
            <div className={styles.summary}>
                <h2> Summary: </h2>
                <p>{recipe.summary?recipe.summary.replace(/(<([^>]+)>)/gi, ''):"does not have abstract"}</p>
            </div>
            <div className={styles.steps}>
                <h2> Steps: </h2>
                {
                    recipe.steps?(recipe.steps.map((step)=>{
                        return(<div>
                            <h4>Number {step.number}: </h4>
                            <p> {step.step}</p>
                            </div>
                        )
                    })):(<h3>This recipe has no steps</h3>)
                }
            </div>
           

           

        </div>
    )
}