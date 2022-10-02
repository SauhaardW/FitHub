import { React, useState } from "react"
import axios from "axios"

const NewExercise = () => {
    const [input, setInput] = useState({
        exercise_name: '',
        exercise_instructions: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value

            }
        })
    }

    function handleClick(event) {
        event.preventDefault();
        const newExercise = {
            name: input.exercise_name,
            instructions: input.exercise_instructions
        }

        axios.post('http://localhost:3001/api/exercise', newExercise)
    }

    return (
        <div className='container'>
            <form>
                <div className='form-group'>
                    <input onChange={handleChange} name="exercise_name" placeholder="Exercise name" value={input.exercise_name} autoComplete="off" className="form-control"></input>
                </div>

                <div className='form-group'>
                    <textarea onChange={handleChange} name="exercise_instructions" placeholder="Exercise instructions" value={input.exercise_instructions} autoComplete="off" className="form-control"></textarea>
                </div>

                <button onClick={handleClick} className="btn btn-lg btn-info">Add workout</button>
            </form>
        </div>
    )
}


export default NewExercise
