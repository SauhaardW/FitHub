import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseComponent from '../components/ExerciseComponent';
import axios from 'axios';

const ViewWorkout = () => {
    const {state} = useLocation();
    const workoutId = state !== null ? state.workoutId : "";
    const [workout, setWorkout] = useState({});
    
    useEffect( () => {
        const params = {id: workoutId}
        axios.get("http://localhost:3001/api/workout", {params}).then( (res) => {
            setWorkout(res.data.data[0]);
        })
    }, [workoutId]);

    const navigate = useNavigate();

    return (
        <div className='p-4'>
            <div className="mt-20 text-4xl">{workout.name}</div>
            <div className="mt-1 text-sm text-gray-600">Created by: {workout.username}</div>
            <hr className="mt-3 mb-1 h-px bg-gray-300 border-0"></hr>

            <div className="container h-max-[calc(100vh-60px)] overflow-scroll">
                    
            </div>

            <button 
                onClick={() => { navigate("log", { state: {workout: workout}}) }}
                className='sticky bottom-4 mt-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded'>
                Log Workout
            </button>
        </div>
    );


};

export default ViewWorkout;
