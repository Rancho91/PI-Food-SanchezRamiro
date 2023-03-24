import React, { useState } from 'react'
import styles from "./insertSteps.module.css"

export default function InsertSteps(props){

    const [step, setStep] = useState({
        number:1,
        step: "",
    });
    const [mostrarStep, setMostrarStep]= useState([])

    
    const handleSubmit = (event) =>{
        if(step.step){
                props.saveStep(step)
                const number=step.number +1
                setMostrarStep([...mostrarStep, step])
                    setStep({
                    number: number,
                    step : ''
        })
        } else window.alert("debe ingresar una descripsion del step")

        
        
        
    }

    const handleIndexInput = (e) =>{
        setStep({...step, [e.target.name]: e.target.value})
    }

    return(
        <div className={styles.conteiner}>
         
                <fieldset >
                    <legend>Steps</legend>
                    <label value="Step Number"> Steps {step.number}</label>
                    <textarea type="text" name="step" value={step.step} onChange={handleIndexInput}/>
                    <div className={styles.mostrarStep}>
                            {
                                mostrarStep.length !== 0?(
                                    mostrarStep.map((step)=>{
                                        return(
                                            <div>
                                                <h4>Number{step.number}: </h4>
                                                 <p> {step.step}</p>
                                                </div>
                                        )
                                        })
                                ): null
                            } 
                    </div>
                    
                    <button type="button" onClick={handleSubmit}>Agregar</button>
                </fieldset>

        </div>
    )
}