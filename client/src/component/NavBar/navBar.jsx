import styles from "./navBar.module.css"
import { Link } from "react-router-dom"


export default  function NavBar (){


    return  (     
         <div className={styles.buttons} >
          <Link to="/home"><button>Home</button>
          </Link>
          <Link to="/form"><button>Form</button>
          </Link> 
      </div>)
     
}