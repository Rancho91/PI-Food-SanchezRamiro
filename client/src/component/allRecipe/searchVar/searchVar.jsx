import { useSelector, useDispatch } from "react-redux"
import {useState }  from "react"
import styles from "./searchVar.module.css"

export default function SearchVar(props) {

const [indexName, setIndexName] = useState("")
const [indexDiet, setIndexDiet] = useState("")
const [indexDB, setIndexDB] = useState("")

  const handleOnChange =  (event) => {
    setIndexName(event.target.value)
    console.log(indexName)
  }
  const handleOnChangeDiet =(e)=>{
    setIndexDiet(e.target.value)
  }
  const handleOnChangeDB =(e)=>{
    setIndexDB(e.target.value)
  
  }
  const handleOnClick = () =>{
    props.filtrarNombre(indexName,indexDiet,indexDB)

  
  }
  const diets = useSelector(state=>state.dietsList)

    return (
      
        <div className={styles.searchVar}>
          <fieldset className={styles.fieldset}>
            <legend>Search</legend>
            <div className={styles.name}>
              <label>Title: <input type="text" name="name" onChange={handleOnChange} value={indexName}/></label>
            </div>
            <div className={styles.select}>
              <span>Diet: </span>
              <select className={styles.diets}name="diets" id="" onChange={handleOnChangeDiet}>
                <option value="none" id="0">none</option>
                {
                  diets.length?(diets.map((diet)=>{
                    return (
                    <option value={diet.name} id={diet.id}>{diet.name}</option>
                    )
                  })):(<option>no hay dietas</option>)
                }
              </select>
              <span>Prosedencia: </span>
              <select  onChange={handleOnChangeDB} name="db" id="">
                <option name="todo" value="todo"> Todo </option>
                <option name="api" value="api"> Api </option>
                <option name="db" value="db"> Data Base</option>
              </select> 
            </div>
            
              <button className={styles.button}onClick={handleOnClick}>enviar</button>
            </fieldset>
        </div>
    )
}