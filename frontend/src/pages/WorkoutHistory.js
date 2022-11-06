import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import WorkoutHistoryComponent from '../components/WorkoutHistoryComponent';

const WorkoutHistory = () => {
    const [workoutHistorySubset, setWorkoutHistorySubset] = useState(true);
    const [pastMonthHistory, setPastMonthHistory] = useState([]);
    const [allHistory, setAllHistory] = useState([]);


    const changeHistorySubsetSetting = (pastMonth) => {
        if ((workoutHistorySubset && !pastMonth) || (!workoutHistorySubset && pastMonth)){
            setWorkoutHistorySubset(!workoutHistorySubset);
        }
        getAllHistoryData();
    }

    const getAllHistoryData = () => {
        if (allHistory.length === 0){
            const url = "http://localhost:3001/api/workout-history?subset=false"
            axios.get(url).then(res => {
                console.log("all res");
                console.log(res.data.data);
                setAllHistory(res.data.data);
            });
        }
    }

    useEffect( () => {
        const url = "http://localhost:3001/api/workout-history?subset=true"
        axios.get(url).then(res => {
            console.log("all res");
            console.log(res.data.data);
            setPastMonthHistory(res.data.data);
        });
    }, []);


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
                >
                    Past Month
                </button>
                <button
                    className={"rounded-br-lg rounded-tr-lg mt-4 text-xs  px-4 " + (!workoutHistorySubset ? 'p-2 bg-default-gradient text-white' : 'p-1.5 outline outline-2 outline-[#2980D1]')}
                    onClick={() => {changeHistorySubsetSetting(false)}}
                >
                    All History
                </button>

                {workoutHistorySubset && pastMonthHistory.map(workout => {
                        return (
                            <WorkoutHistoryComponent key={(new Date(workout.workout_history.date)).getTime()} workout={workout.workout_history}/>
                        )
                    })
                }

                {!workoutHistorySubset && allHistory.map(workout => {
                    return (
                        <WorkoutHistoryComponent key={(new Date(workout.workout_history.date)).getTime()} workout={workout.workout_history} date={(new Date(workout.workout_history.date)).getTime()}/>
                    )
                })
                }
            </div>
        </div>
    );
}

export default WorkoutHistory;