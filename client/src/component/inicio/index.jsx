import { Link } from "react-router-dom";
import styles from "./index.module.css"

export default function Index(props){

    

    return(
        <div className={styles.index}>
            <Link to="/home">
            <button>Login</button>
            </Link>
            
        </div>
    )
}