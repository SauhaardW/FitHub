import React from 'react';
import { useLocation } from "react-router-dom";

const LogWorkout = (props) => {
    const {state} = useLocation();
    const workout = state !== null ? state.workout : {};

    return (
        <div className='p-4'>
            <div className="mt-20 text-4xl">Workout Name</div>
            {JSON.stringify(workout)}
        </div>
    );


};

export default LogWorkout;
