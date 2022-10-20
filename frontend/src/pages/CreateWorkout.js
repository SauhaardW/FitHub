import React, {useCallback, useEffect, useState} from 'react';
import ExercisesSearch from "../components/ExercisesSearch"
import axios from 'axios';
import { Create } from "./../strings";
import { workoutcreate } from "./../strings";
import WorkoutComponent from '../components/WorkoutComponent';


const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [done, setDone] = useState(false);

    const [list_exercises, setList_exercises] = useState([]);
    const change_list = (id) => {

        if(list_exercises.indexOf(id) === -1) {
            setList_exercises(list_exercises => [...list_exercises, id]);
        }
    }

      function getUsername(query) {
        axios
            .get("http://localhost:3001/api/current-user", {
                params: {
                    username: query,
                },
            })
            .then((response) => {
                setUsername(response.data.data.username);
        });
    }

    useEffect(()=>{
        getUsername();
    }, [])

    const addWorkout = () => {
        


        axios.post("http://localhost:3001/api/workouts", {name: name,username: username,exercises: list_exercises}).then(res => {
            if (res.status === 200){
                if (res.data.success){
                    setDone(true);
                }
            }
            })
    }

    // Wraps the setExercises function so that the ExercisesSearch component can set the state
    const wrapperSetExercises = useCallback( (value) => {
        setExercises(value)
    }, [setExercises]);

    

    
    return (
        <div className='p-2'>
        <div className='mt-20 grid justify-items-center'>
            
            <div className='flex place-content-center'>
                <input
                    id="name-input"
                    type="text"
                    placeholder='Name'
                    className="py-2 w-56 bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value )
                    }}
                />
                <button className='bg-default-gradient hover:bg-blue-700 text-white disabled:opacity-50 font-bold px-8 rounded mx-2'
                    disabled={!list_exercises.length>0 || name===""} onClick={addWorkout} >
                    {Create}
                </button>
            </div>

            {done && <div id='success-notification' className='mt-5 -mb-5 text-green-500 text-sm'>Your workout has been created!</div>}
        
        </div>

        
        <div className="container">
                <ExercisesSearch exerciseSetter={setExercises}/>
                {exercises.map(exercise=>(
                    <WorkoutComponent change_list={change_list} list_exercises={list_exercises} exercise={exercise}/>
        ))}

        <div className='registration_container'></div>
        
        
        </div>
        </div>


        
    );


};

export default CreateWorkout;
