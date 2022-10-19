import React, {useCallback, useEffect, useState} from 'react';
import ExercisesSearch from "../components/ExercisesSearch"
import axios from 'axios';
import { Create } from "./../strings";
import { workoutcreate } from "./../strings";



const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [done, setDone] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [WorkoutData, setWorkoutData] = useState({
        name: "",
        username: "",
        exercises: [],
      });
     

      function getUsername(query) {
        axios
            .get("http://localhost:3001/api/current-user", {
                params: {
                    username: query,
                },
            })
            .then((response) => {
                setWorkoutData({...WorkoutData, username: response.data.data.username});
        });
    }

    useEffect(()=>{
        getUsername();
    }, [])

    const addworkout = () => {
        axios.post("http://localhost:3001/api/workouts", WorkoutData).then(res => {
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
            <h1 className='font-medium text-2xl mb-4'>{workoutcreate}</h1>
            <div className='flex place-content-center'>
                <input
                    id="name-input"
                    type="text"
                    placeholder='Name'
                    className="py-2 px-8 bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500"
                    value={WorkoutData.name}
                    onChange={(event) => {
                        setWorkoutData({...WorkoutData, name: event.target.value })
                    }}
                />

                <button className='bg-default-gradient hover:bg-blue-700 text-white disabled:opacity-50 font-bold px-8 rounded mx-2'
                            onClick={addworkout}>
                            {Create}
                </button>
                
            </div>

            {done && <div id='success-notification' className='mt-5 -mb-5 text-green-500 text-sm'>Your workout has been created!</div>}
        
        </div>

        
        <div className="container">
                <ExercisesSearch exerciseSetter={setExercises}/>
                {exercises.map(exercise=>(
                    <div>
                    <div className="filters-container bg-gray-200 rounded-lg mt-3">
                    <div className="accordion-item">
                    <div className="accordion-title flex" onClick={() => setIsActive(!isActive)}>
                        <div>{exercise.name}</div>
                        <div className=''>{isActive ? '-' : '+'}</div>
                    </div>
                    {isActive && <div className="accordion-content">
                          {/* <img src={exercise.gif} onError="this.onerror=null; this.src='https://www.planetfitness.com/sites/default/files/feature-image/xbreak-workout_602724.jpg.pagespeed.ic.v8byD7su-e.jpg';" /> */}
                          <div> Target Muscle: {exercise.muscles.target}<br></br> </div>
                           <div> Mechanics: {exercise.classification.mechanics}<br></br></div>
                           <div> Force: {exercise.classification.force}<br></br></div>
                           <div> Utility: {exercise.classification.utility}<br></br></div>
                           <div> Preparation: {exercise.instructions.preparation}<br></br></div>
                           <div> Execution: {exercise.instructions.execution}<br></br></div>
                           <div> Comments: {exercise.comments}<br></br></div>
                        </div>}
                    </div>
                </div>
                </div>

                ))}
                <div className='registration_container'></div>
        
        </div>
        </div>
        
    );


};

export default CreateWorkout;
