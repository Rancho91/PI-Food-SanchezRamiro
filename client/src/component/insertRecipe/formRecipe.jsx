import React, { useState } from 'react'
import axios from 'axios'
import InsertSteps from "./InsertSteps"
import SelectDiets from './SelectDiets';
import validate from "./validate"
import styles from "./formRecipe.module.css"
import NavBar from '../NavBar/navBar';
import { Link } from 'react-router-dom';


export default function FormRecipe(props){

    const [index, setIndex] = useState({
        id: 0,
        name: "",
        image:"",
        summary: "",
        healthScore: "",
        steps: [],
        diets:[],
    });
    const [error, setError] = useState({})
    const[ quest, setQuest] = useState(false) 

    const saveStep = (step) =>{
        if(index.steps.length === 0)setIndex({...index, steps:[step]})
        else setIndex({...index, steps:[...index.steps, step]})
}

const change = (e) =>{
   
    setIndex({...index,[e.target.name]:e.target.value })
    setError(validate({...index,[e.target.name]:e.target.value}))
    console.log(index)
}
const saveRecipe = async (event) =>{
    event.preventDefault()
    setError(validate({...index}))
    if(Object.keys(error).length===0 && index.name){
        setQuest(true)
        const post = await axios.post("http://localhost:3001/recipes", index)
        window.alert("it was created correctly")
    }else {window.alert("Please check the data entered")}

        }
const checkboxOnChange = (id, bool) => {
    if(bool){
        setIndex({...index, diets : [...index.diets,id]})
        
    }
    if(!bool){
        setIndex({...index, diets : index.diets.filter(d=> d != id)})
    }

        }
const newRecipe = (e) =>{
    setIndex({id: 0, name: "", image:"", summary: "", healthScore: "", steps: [], diets:[],})
    setQuest(false)
    setError({})
    
        
}
    return (
        <div className={styles.conteiner}>
            <NavBar/>
            <form action="" onSubmit={saveRecipe} >
                <fieldset >
                  <legend>New Recipe</legend>
                <div className={styles.conteinerInputs}>
                        <div >
                            <label htmlFor="name" >Name: </label>
                            <input type="text" name="name" className={error.name?styles.errorName:null} onChange={change} value={index.name} disabled={quest?true:false}/>
                        </div>
                        <div >
                         <label htmlFor="image">Imagen URL:</label>
                         <input type="text" name="image" onChange={change} value={index.image} className={error.image?styles.errorName:null} disabled={quest?true:false} />
                        </div>
                        <div >
                            <label htmlFor="healthScore">Health Score:</label>
                            <input type="text" name="healthScore" onChange={change}className={error.healthScore?styles.errorName:null} value={index.healthScore} disabled={quest?true:false}/>           
                        </div>
                <div className={styles.error}>
                 {error.name?(<h3>{error.name}</h3>):null}
                 {error.healthScore?(<h3>{error.healthScore}</h3>):null}
                 {error.image?(<h3>{error.image}</h3>):null}  
                 {error.summary?(<h3>{error.summary}</h3>):null} 
             </div>

                </div>
                <div className={styles.summary}>
                    <label htmlFor="summary">Summary:</label>
                    <textarea type="text" name="summary" onChange={change} value={index.summary} className={error.summary?styles.errorName:null} disabled={quest?true:false}/>
                </div>
                <div className={styles.diets}>
                     <SelectDiets checkboxOnChange={checkboxOnChange} quest={quest} />
                </div>
                <div className={styles.step}>
                    <InsertSteps saveStep={saveStep} quest={quest}/>
                </div>
                    
                    <button type="submit" disabled={quest?true:false} className={quest?styles.deshabilitar:null}>record Recipe</button>
                    {quest?(    
                    <div>
                        <Link to="/home"> <button>Back</button></Link>   
                        <Link ><button onClick={newRecipe}>New Recipe</button></Link>
                    </div>
                            ):null}
                </fieldset>
            </form>
        </div>
    )
}