import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import { getDiets } from '../../redux/actions/index'
import { useEffect } from 'react'
import styles from "./selectDiets.module.css"


export default function SelectDiets(props){

const dispatch= useDispatch()
const [clear, setClear] = useState(false)

useEffect(() => {
    const fetchData = async () => {
       dispatch(await getDiets());
    };
    fetchData();

  }, [dispatch]);
  useEffect(()=>{
    if(props.quest){
        setClear(true)
    }
    if(!props.quest){
        setClear(false)
    }
},[props.quest])
console.log(clear)
let diets = useSelector((state)=>state.dietsList)



const handleOnChang = (e) =>{

    if(e.target.checked){
       props.checkboxOnChange(e.target.id, e.target.checked)
    }
    if(!e.target.checked){
        props.checkboxOnChange(e.target.id, e.target.checked)
    }
}


    return(<div className={styles.diets}>
            {
                diets.length?(diets.map((diet)=>{
                    return (
                        <label>{diet.name}:
                        <input type="checkbox" id={diet.id}value={diet.name} onChange={handleOnChang}
                        checked = {clear?"false":null}/> 
                        </label>
                    )
                })): <p>no hay dietas cargadas</p>
            }



    </div>)
}