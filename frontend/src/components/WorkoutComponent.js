import React, { useState } from "react";



const WorkoutComponent = (props) => {
    
    const [isActive, setIsActive] = useState(false);

    const {list_exercises, change_list, exercise} = props;

    return(
    <div>
        <div className={list_exercises.includes(exercise._id) ? "filters-container bg-disabled-gradient-lighter rounded-lg mt-3 shadow-gray-100" : "filters-container bg-gray-200 rounded-lg mt-3 shadow-gray-100"}>
            <div className="accordion-item">
                <div className='grid justify-items-center'>
                    <div className="accordion-title flex py-4" onClick={() => setIsActive(!isActive)}>
                        <div className='w-80 font-medium'>{props.exercise.name}</div>
                        <div className=''>{isActive ? '-' : '+'}</div>
                    </div>
                </div>
                {isActive && <div className="p-6 accordion-content flex flex-col ">
                    <div> <span className='font-medium text-blue-600'>Mechanics: </span>{props.exercise.classification.mechanics}<br></br></div>
                    <div> <span className='font-medium text-blue-600'>Force: </span>{props.exercise.classification.force}<br></br></div>
                    <div> <span className='font-medium text-blue-600'>Utility:</span> {props.exercise.classification.utility}<br></br></div>
                    <div> <span className='font-medium text-blue-600'>Target Muscle:</span> {props.exercise.muscles.target}<br></br> </div>
                    <div> <span className='font-medium text-blue-600'>Preparation:</span> {props.exercise.instructions.preparation}<br></br></div>
                    <div> <span className='font-medium text-blue-600'>Execution: </span>{props.exercise.instructions.execution}<br></br></div>
                    <div> <span className='font-medium text-blue-600'>Comments: </span>{props.exercise.comments}<br></br></div>
                    <button className='self-center bg-default-gradient mt-4 w-3/5 hover:bg-blue-700 place-content-center py-3 text-white font-bold px-8 rounded mx-2'
                            onClick={()=>{
                                change_list(props.exercise._id)
                            }}>
                            {list_exercises.includes(props.exercise._id) ? "Added" : "Add"}
                        </button>
                    </div>}
            </div>
        </div>
    </div>)
}

export default WorkoutComponent;