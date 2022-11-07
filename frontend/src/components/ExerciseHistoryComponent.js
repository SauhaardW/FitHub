import React, { useState } from "react";

const ExerciseHistoryComponent = (props) => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div>
            <div className="bg-white rounded-lg mt-3 shadow-gray-100">
                <div className="accordion-item px-3">
                    <div className=' justify-items-center'>
                        <div className="accordion-title flex py-4" onClick={() => setIsActive(!isActive)}>
                            <div className='w-80 font-medium'>{props.exercise.exercise_info.name}</div>
                            <div className='text-black'>{isActive ? '-' : '+'}</div>
                        </div>
                    </div>
                    {isActive && <div className="px-4 pb-4 accordion-content text-xs flex flex-col ">

                        <div> <span className='font-medium text-blue-600'>Mechanics: </span>{props.exercise.exercise_info.classification.mechanics}<br></br></div>
                        <div> <span className='font-medium text-blue-600'>Force: </span>{props.exercise.exercise_info.classification.force}<br></br></div>
                        <div> <span className='font-medium text-blue-600'>Utility:</span> {props.exercise.exercise_info.classification.utility}<br></br></div>
                        <div> <span className='font-medium text-blue-600'>Target Muscle:</span> {props.exercise.exercise_info.muscles.target}<br></br> </div>

                        <div className="flex justify-between mt-5">
                            <div className="w-1/3">Sets</div>
                            <div className="w-1/3">Reps</div>
                            <div className="w-1/3">Weight</div>
                        </div>
                        <hr className="mt-1 mb-2 h-px bg-gray-400 border-0"></hr>
                        {props.exercise.sets_info.map((set, index) => {
                            return(
                                <div key={index}>
                                    {(set.reps !== 0 || set.weight !== 0) && <div className="flex">
                                        <div className="w-1/3 pl-1">{index + 1}</div>
                                        <div className="w-1/3 pl-1">{set.reps}</div>
                                        <div className="flex justify-between w-1/3 pl-1"><div>{set.weight}</div> <div>lbs</div></div>
                                    </div>}
                                </div>

                            )
                        })
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ExerciseHistoryComponent;