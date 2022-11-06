import React, {useState} from 'react';
import './Pages.css';

const WorkoutHistory = () => {
    const [workoutHistorySubset, setWorkoutHistorySubset] = useState(true);

    const changeHistorySubsetSetting = (pastMonth) => {
        if (workoutHistorySubset && !pastMonth || !workoutHistorySubset && pastMonth){
            setWorkoutHistorySubset(!workoutHistorySubset);
        }

    }


    return (
        <div className="pages mx-3 page-font flex flex-col justify-between">
            <div className="text-4xl font-bold">
                Workout History
            </div>
            <hr className="mt-1 mb-2 h-px bg-black border-0"></hr>

            <div>
                <button
                    className={"rounded-bl-lg rounded-tl-lg mt-4 text-xs px-4 " + (workoutHistorySubset ? 'p-2 bg-default-gradient text-white' : 'p-1.5 outline outline-2 outline-[#2980D1]')}
                    onClick={() => {changeHistorySubsetSetting(true)}}
                // className='rounded-bl-lg rounded-tl-lg mt-4 bg-default-gradient text-white text-sm p-2'>
                >
                    Past Month
                </button>
                <button
                // className='rounded-br-lg rounded-tr-lg mt-4 bg-default-gradient text-white text-sm p-2'>
                    className={"rounded-br-lg rounded-tr-lg mt-4 text-xs  px-4 " + (!workoutHistorySubset ? 'p-2 bg-default-gradient text-white' : 'p-1.5 outline outline-2 outline-[#2980D1]')}
                    onClick={() => {changeHistorySubsetSetting(false)}}
                >
                    All History
                </button>
            </div>
        </div>
    );
}

export default WorkoutHistory;