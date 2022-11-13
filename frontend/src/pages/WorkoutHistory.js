import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import WorkoutHistoryComponent from '../components/WorkoutHistoryComponent';

const WorkoutHistory = () => {
    const [workoutHistorySubset, setWorkoutHistorySubset] = useState(true);
    const [pastMonthHistory, setPastMonthHistory] = useState([]);
    const [allHistory, setAllHistory] = useState([]);
    const [streak, setStreak] = useState("");

    const changeHistorySubsetSetting = (pastMonth) => {
        if ((workoutHistorySubset && !pastMonth) || (!workoutHistorySubset && pastMonth)){
            setWorkoutHistorySubset(!workoutHistorySubset);
        }
        getAllHistoryData();
    }

    useEffect( () => {
        var today = new Date();
        axios.post("http://localhost:3001/api/workout-history/streak", {
            date: today
        }).then(res => {
            axios.get("http://localhost:3001/api/workout-history/streak").then((res) => {
                if (res.data.success){
                    setStreak(res.data.data.streak);
                }
            })
        })
    }, []);

    const getAllHistoryData = () => {
        if (allHistory.length === 0){
            const url = "http://localhost:3001/api/workout-history?subset=false"
            axios.get(url).then(res => {
                setAllHistory(res.data.data);
            });
        }
    }

    useEffect( () => {
        const url = "http://localhost:3001/api/workout-history?subset=true"
        axios.get(url).then(res => {
            setPastMonthHistory(res.data.data);
        });
    }, []);

    useEffect( () => {
        //hide topbar on mount
        document.getElementById('top-bar-hamburger-menu').style.display = "none"
        document.getElementById('top-bar-back-arrow').style.display = "initial"

        return () => {
            //show topbar on unmount
            document.getElementById('top-bar-hamburger-menu').style.display = "initial"
            document.getElementById('top-bar-back-arrow').style.display = "none"
        }
    }, []);

    return (
        <div className="pages mx-3 page-font flex flex-col justify-between">
            <div className="flex justify-between">
                <div className="text-4xl font-bold">
                    Workout History
                </div>

                {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <span>{"🔥"}</span>
                    <span className="ml-1">{streak}</span>
                </div>}
            </div>
            <hr className="mt-2 mb-2 h-px bg-black border-0"></hr>

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

                {workoutHistorySubset && pastMonthHistory.length !== 0 && pastMonthHistory.map(workout => {
                        return (
                            <WorkoutHistoryComponent key={(new Date(workout.workout_history.date)).getTime()} workout={workout.workout_history}/>
                        )
                    })
                }
                {workoutHistorySubset && pastMonthHistory.length === 0 && <div className="mt-8 text-black text-sm p-1">
                    No workout history to display!
                </div>}

                {!workoutHistorySubset && allHistory.length !== 0 && allHistory.map(workout => {
                    return (
                        <WorkoutHistoryComponent key={(new Date(workout.workout_history.date)).getTime()} workout={workout.workout_history}/>
                    )
                })
                }
                {!workoutHistorySubset && allHistory.length === 0 && <div className="mt-8 text-black text-sm p-1">
                    No workout history to display!
                </div>}
            </div>
        </div>
    );
}

export default WorkoutHistory;