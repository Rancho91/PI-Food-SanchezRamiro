import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import Recipe from "./recipe"
import  {getAllRecipes, getDiets, filterName, orderByHS, orderName}  from "../../redux/actions/index"
import SearchVar from "./searchVar/searchVar"
import styles from "./allRecipe.module.css"
import NavBar from "../NavBar/navBar"

export default function AllRecipes(props) {

    const [numPagina, setNumPagina] = useState(1)
    const [ascDescHS, setAscDescHS] = useState(true)
    const [ascDescName, setAscDescName] = useState(true)
    const [healthScore, setHealtScore] = useState(false)
    const [name, setName] = useState(false)
    const [load, setLoad] = useState({name:"", diets:"", prosedencia:""})

    const dispatch = useDispatch();
    useEffect(()=>{
        const traerTodo = async () => {
            dispatch( await getAllRecipes());
            dispatch(getDiets())
          };
          traerTodo()
          
    },[])
    
    const filtrarNombre = (name,diet,db)=>{
        if(name === load.name && diet===load.diets && db ===load.prosedencia) return
        dispatch(filterName(name,diet,db))
        setHealtScore(false)
        setName(false)
        setLoad({name: name, diets: diet, prosedencia: db})
    }
    
    let allRecipes = useSelector((state) => {
        let paginado = {}
        let i = 1
        let contador = 0
        state.filters.forEach(recipe => {  
            if(contador === 0){
                paginado[i]= [recipe]
                console.log(contador)
                contador++
            }else if(contador !== 9){
                paginado[i].push(recipe)
              contador++
            } else{ 
                contador = 0
                i++
            }
        })
        return paginado})

 const OnClickNumb=(e)=>{
    setNumPagina(e.target.value)
 }

 const clickOrder = (e) =>{
    if(e.target.name === "name") {
        dispatch(orderName(ascDescName))
        setAscDescName(!ascDescName)
        setNumPagina(1)
        setHealtScore(false)
        setName(true)
    }
    if(e.target.name === "HS"){
        ascDescHS?setHealtScore("saludable"): setHealtScore("menosSaludable")
       
        dispatch(orderByHS(ascDescHS))
        setAscDescHS(!ascDescHS)
        setNumPagina(1)
        setHealtScore(true)
        setName(false)
 }
    }

 let numbers = Object.keys(allRecipes)
 console.log(numbers)
const hambr= <img src="/hamburger.png" style={{width: "20px", height: "20px"}}/>
const saludable = <img src="/apple.webp" style={{width: "20px", height: "20px"}}/>
    return (
        <div>
        <NavBar/>
        <SearchVar filtrarNombre={filtrarNombre}/>
            <div className={styles.order}>
                
                <button onClick={clickOrder} name="HS" className={healthScore?styles.SelectButton:styles.unSelectButton}> Order by Healt Score  {ascDescHS?saludable: hambr}</button>
                <button onClick={clickOrder} name="name" className={name?styles.SelectButton:styles.unSelectButton}>Order by title</button>
            </div>

            <div className={styles.buttonPag}>
                 {
               numbers?numbers.map((key)=>{
                    return <button className={key===numPagina?styles.selectPag : styles.button} value={key} onClick={OnClickNumb}> {key}</button>
                }):(<h3>No hay paginas</h3>)
             }
            </div>

            <div className={styles.paginado}> 
            {
            Object.keys(allRecipes).length?(allRecipes[numPagina].map((recipe)=>{

                return <Recipe className={styles.box}
                    id={recipe.id?recipe.id:null} 
                    name={recipe.name?recipe.name:null}
                    image={recipe.image?recipe.image:null}
                    summary={recipe.summary?recipe.summary:null}
                    healthScore={recipe.healthScore?recipe.healthScore:null}
                    steps={recipe.steps?recipe.steps:null}
                    diets={recipe.diets?recipe.diets:null}
                    createInDB={recipe.createInDB?recipe.createInDB:null}
                    
                />
            }
                )): (  <h3>Loading</h3>)

            }</div>
        </div>
    )
}
