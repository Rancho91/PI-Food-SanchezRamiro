import { useSelector, useDispatch } from "react-redux"
import {useState }  from "react"
import styles from "./searchVar.module.css"

export default function SearchVar(props) {

const [indexName, setIndexName] = useState("")
const [indexDiet, setIndexDiet] = useState("all")
const [indexDB, setIndexDB] = useState("all")
const [select, setSelect] = useState(false)

  const handleOnChange =  (event) => {
    setIndexName(event.target.value)
    setSelect(false)
  }
  const handleOnChangeDiet =(e)=>{
    setIndexDiet(e.target.value)
    setSelect(false)
  }
  const handleOnChangeDB =(e)=>{
    setIndexDB(e.target.value)
    setSelect(false)
  }
  const handleOnClick = () =>{
    props.filtrarNombre(indexName,indexDiet,indexDB)
    setIndexName("")
    setIndexDiet("all")
    setIndexDB("all")
    setSelect(true)
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
              <select className={styles.diets} name="diets" id="" onChange={handleOnChangeDiet} value={select?"all":null}>
                <option value="all" id="0">All</option>
                {
                  diets.length?(diets.map((diet)=>{
                    return (
                    <option value={diet.name} id={diet.id}>{diet.name}</option>
                    )
                  })):(<option>no hay dietas</option>)
                }
              </select>
              <span>Origin: </span>
              <select  onChange={handleOnChangeDB} name="db" value={select?"all":null}>
                <option name="all" value="all"> All </option>
                <option name="api" value="api"> Api </option>
                <option name="db" value="db"> Data Base</option>
              </select> 
            </div>
            
              <button className={styles.button}onClick={handleOnClick}>Send</button>
            </fieldset>
        </div>
    )
}