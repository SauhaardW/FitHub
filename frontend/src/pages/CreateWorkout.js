import React, {useCallback, useState} from 'react';
import ExercisesSearch from "../components/ExercisesSearch"

const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);

    // Wraps the setExercises function so that the ExercisesSearch component can set the state
    const wrapperSetExercises = useCallback( (value) => {
        setExercises(value)
    }, [setExercises]);

    return (
        <div className="container">
            <ExercisesSearch exerciseSetter={setExercises}/>
        </div>
        
    );
};

export default CreateWorkout;
