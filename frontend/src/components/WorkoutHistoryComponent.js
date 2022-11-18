import React, { useState } from "react";
import ExerciseHistoryComponent from '../components/ExerciseHistoryComponent';

const WorkoutHistoryComponent = (props) => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div>
            <div className="filters-container bg-disabled-gradient-lighter rounded-lg mt-3 shadow-gray-100 drop-shadow-md">
                <div className="accordion-item">
                    <div className='grid justify-items-center'>
                        <div className="accordion-title flex py-4" onClick={() => setIsActive(!isActive)}>
                            <div >
                                <div className='w-80 font-semibold text-lg'>{props.workout.workout_name}</div>
                                <span className='w-80 text-xs text-blue-600 mt-1'>{(new Date(props.workout.date)).toDateString()}, {(new Date(props.workout.date)).toLocaleTimeString()}</span>
                                {props.workout.friend !== null && props.workout.friend !== undefined && props.workout.friend.length !== 0
                                    && <span>
                                        <span className='w-80 text-xs text-gray-600 mt-1'>, With: </span>
                                        <span className='w-80 text-xs text-blue-600 mt-1'>{props.workout.friend}</span>
                                    </span>}
                            </div>
                            <div className=''>{isActive ? '-' : '+'}</div>
                        </div>
                    </div>
                    {isActive && <div className="px-6 pb-6 accordion-content flex flex-col drop-shadow-md">
                        { props.workout.exercises.map(exercise => {
                            return (
                                <ExerciseHistoryComponent key={(new Date(props.workout.date)).getTime() + " " + exercise.exercise_info._id} exercise={exercise}/>
                            )
                        })
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default WorkoutHistoryComponent;