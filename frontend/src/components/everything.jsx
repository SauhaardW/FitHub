import React, {useState} from 'react'
import axios from "axios";

const Everything = () => {
    const [input, setInput] = useState({
        exercise: '',
        instructions: ''
    })

    function handleChange(event){
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value

            }
        })
    }

    function handleClick(event){
        event.preventDefault();
        const newExercise = {
            exercise: input.exercise,
            instructions: input.instructions
        }
        
        axios.post('http://localhost:3000', newExercise)
    }

    return (
        <div className='container'>
            <form>
                <div className='form-group'>
                    <input onChange={handleChange} name="exercise" placeholder="Excersise name" value={input.exercise} autoComplete="off" className="form-control"></input>
                </div>
                
                <div className='form-group'>
                    <textarea onChange={handleChange} name="instructions" placeholder="Excersise instructions" value={input.instructions} autoComplete="off" className="form-control"></textarea>
                </div>

                <button onClick={handleClick} className="btn btn-lg btn-info">Add workout</button>
            </form>
        </div>

    )
}

export default Everything