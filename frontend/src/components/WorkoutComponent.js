import React, { useState } from "react";



const WorkoutComponent = (props) => {
    // var list_exercises = [];
    
    const [isActive, setIsActive] = useState(false);

    const {list_exercises, change_list, exercise} = props;

    return(<div>
        <div className="filters-container bg-gray-200 rounded-lg mt-3">
        <div className="accordion-item">
        <div className='grid justify-items-center'>
            <div className="accordion-title flex" onClick={() => setIsActive(!isActive)}>
                <div className='w-80 font-medium'>{props.exercise.name}</div>
                <div className=''>{isActive ? '-' : '+'}</div>
            </div>
        </div>
        {isActive && <div className="p-6 accordion-content">
              {/* <img src={props.exercise.gif} onError="this.onerror=null; this.src='https://www.planetfitness.com/sites/default/files/feature-image/xbreak-workout_602724.jpg.pagespeed.ic.v8byD7su-e.jpg';" /> */}
               <div> <span className='font-medium text-blue-600'>Mechanics: </span>{props.exercise.classification.mechanics}<br></br></div>
               <div> <span className='font-medium text-blue-600'>Force: </span>{props.exercise.classification.force}<br></br></div>
               <div> <span className='font-medium text-blue-600'>Utility:</span> {props.exercise.classification.utility}<br></br></div>
              <div>  <span className='font-medium text-blue-600'>Target Muscle:</span> {props.exercise.muscles.target}<br></br> </div>
               <div> <span className='font-medium text-blue-600'>Preparation:</span> {props.exercise.instructions.preparation}<br></br></div>
               <div> <span className='font-medium text-blue-600'>Execution: </span>{props.exercise.instructions.execution}<br></br></div>
               <div> <span className='font-medium text-blue-600'>Comments: </span>{props.exercise.comments}<br></br></div>
               <button className='bg-default-gradient mt-2 hover:bg-blue-700 ml-24 place-content-center px-12 py-4 text-white font-bold px-8 rounded mx-2'
                    onClick={()=>{
                        change_list(props.exercise._id)
                    }}>
                    Add
                </button>
            </div>}
        </div>
    </div>
    </div>)
}

export default WorkoutComponent;