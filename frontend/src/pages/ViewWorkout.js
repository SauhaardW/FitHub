import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseComponent from '../components/ExerciseComponent';
import axios from 'axios';

const ViewWorkout = () => {
    const {state} = useLocation();
    const workoutId = state.workoutId
    const [workout, setWorkout] = useState({});
    
    useEffect( () => {
        const params = {id: workoutId}
        axios.get("http://localhost:3001/api/workout", {params}).then( (res) => {
            setWorkout(res.data.data);
            console.log(res.data.data)
        })
    });

    return (
        <div className='p-4'>
            <div className="mt-20 text-4xl">{workout.name}</div>
            <div className="text-sm text-gray-600 mb-2 mt-1">Created by: {workout.username}</div>

            <div className="container mt-6">
                    {/* {workout.exercises.map(exercise=>(
                        <ExerciseComponent key={exercise} exercise={exercise}/>
                    ))} */}
            </div>

            <button className='sticky bottom-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded'>
                Log Workout
            </button>
        </div>
    );


};

export default ViewWorkout;
