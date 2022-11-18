import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {CreateWorkout } from "./../strings";
import {AiOutlineLike} from "react-icons/ai";
import {BsCheck2All} from "react-icons/bs";
import { isSameDay, parseISO, startOfToday } from 'date-fns'

const Home = () => {
    const {state} = useLocation();
    const loggedWorkout = state !== null ? state.loggedWorkout : false;
    const navigate = useNavigate();
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [name, setName] = useState("");
    const [streak, setStreak] = useState("");
    const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const today = startOfToday()


    useEffect( () => {
        axios.get("http://localhost:3001/api/current-user").then(res => {
            setName(res.data.data.name);
        })

       // can not update a state in for loop because state updates asynch, so by next iteration the state may not be updated yet
        const myWorkouts = []
        const recWorkouts = []

        const url = "http://localhost:3001/api/workouts?subset=true"
        axios.get(url).then(res => {
           const data = res.data.data;
            data.forEach(workout => {
                workout.exercisesString = workout.exercises_info.map(exercise => exercise.name).join(", ");
                workout.username === "FitHub" ? recWorkouts.push(workout) : myWorkouts.push(workout);
            })
            setUserWorkouts(myWorkouts);

            Promise.all(recWorkouts.map((wkt) => {
                return axios.get("http://localhost:3001/api/get-like-ratio?workoutID=" + wkt._id.toString())
            })).then((res) => {
                for (var i=0; i<recWorkouts.length; i++) {
                    const ratio = res[i].data.likeRatio; 
                    recWorkouts[i].ratio = ratio.toString();
                }
                setRecommendedWorkouts(recWorkouts);
            })
        })
    }, []);

    useEffect( () => {
        axios.get("http://localhost:3001/api/scheduled-workouts").then(res => {
             if (res.data.success && res.data.data.length !== 0) {
                 const scheduledForToday = res.data.data[0].scheduled_workouts.filter((workout) => isSameDay(parseISO(workout.date), today));
                 setTodaysWorkouts(scheduledForToday);
            }
        })
        // be careful with the line below, it removes all eslint warnings about dependencies that should be added to dep array. Using it here because there are deps
        // that give warnings but should not be added. If you add new deps consider whether they should be included in deps array of useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <div className="pages mx-3 page-font flex flex-col justify-between">
            <div>
                <div className="flex justify-between">
                    <div className="text-4xl font-bold">
                        Hello, {name}!
                    </div>

                    {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <span>{"🔥"}</span>
                        <span className="ml-1">{streak}</span>
                    </div>}
                </div>

                <hr className="mt-1 mb-5 h-px bg-black border-0"></hr>

                {loggedWorkout && <div className="text-green-500">
                    <div className="flex items-center mb-2"><BsCheck2All/> <span className="pl-2">Workout successfully logged!</span></div>
                </div>}

                {todaysWorkouts !== null && todaysWorkouts !== undefined && todaysWorkouts.length !== 0 &&
                        <div className="horizontal-scrollable-div mb-3">
                            <ul className="flex">
                                {
                                    todaysWorkouts.map((workout) => {
                                    return (
                                        <li key={workout.workout_info.name}
                                            onClick={() => {navigate('/workout', { state: {workoutId: workout.workout_info._id, friend: workout.friend}})}}
                                            className="flex w-72 justify-between p-3 m-1 mr-3 bg-default-gradient rounded">
                                            <div
                                                key={workout.workout_info.name}
                                                className="w-72 text-white"
                                            >
                                                <div className="font-semibold text-xl text-slate-100 mt-1">Today's Workout</div>
                                                <div className="text-slate-100 mb-4">
                                                    <span className='w-80 text-xs mt-1'>{workout.date}, at {workout.time}</span>
                                                    {workout.friend !== null && workout.friend !== undefined && workout.friend.length !== 0
                                                        && <span>
                                                            <span className='w-80 text-xs mt-1'>, with: </span>
                                                            <span className='w-80 text-xs mt-1'>{workout.friend}</span>
                                                        </span>}
                                                </div>

                                                <div className="font-medium text-2xl mb-1">
                                                    {workout.workout_info.name.toUpperCase()}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                    </div>}



                <div className="text-md m-1 font-semibold">
                    YOUR WORKOUTS
                </div>

                {(userWorkouts === null || userWorkouts === undefined || userWorkouts.length === 0)
                    ? <div className="text-sm ml-1 text-[#3898F2]">You have no workouts to display!</div>
                    : <div>

                    <div className="horizontal-scrollable-div">
                        <ul className="flex">
                            {userWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name} 
                                        onClick={()=>{navigate('/workout', { state: {workoutId: workout._id}})}}
                                        className="flex w-60 justify-between p-3 m-1 mr-3 outline outline-1 outline-[#3898F2] rounded">
                                        <div
                                            key={workout.name}
                                            className="w-60 text-[#3898F2]"
                                        >
                                            <div className="font-bold text-lg">
                                                {workout.name.toUpperCase()}
                                            </div>
                                            <hr className="mt-1 mb-3 h-px bg-[#3898F2] border-0"></hr>


                                            <div className="text-xs">
                                                {workout.exercisesString}
                                            </div>

                                            <div className="text-right font-semibold mt-2 text-sm text-black">
                                                {workout.exercises_info.length} exercises
                                            </div>

                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>}

                <div className="text-md m-1 mt-3 font-semibold">
                    OUR WORKOUTS
                </div>
                {(recommendedWorkouts === null || recommendedWorkouts === undefined || recommendedWorkouts.length === 0)
                    ? <div className="text-sm ml-1 text-[#3898F2]">We have no recommended workouts for you!</div>
                    : <div>

                    <div className="horizontal-scrollable-div">
                        <ul className="flex">
                            { recommendedWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name} 
                                        className="flex w-60 justify-between p-3 m-1 mr-3 outline outline-1 outline-[#3898F2] rounded"
                                        onClick={()=>{navigate('/workout', { state: {workoutId: workout._id}})}}>
                                        <div
                                            key={workout.name}
                                            className="w-60 text-[#3898F2]"
                                        >
                                            <div className="flex justify-between w-full align-middle">
                                                <div className="font-bold text-lg pr-3">
                                                    {workout === undefined ? "Undefined" : workout.name.toUpperCase()}
                                                </div>
                                                <div className="flex align-middle">
                                                    <AiOutlineLike/>
                                                    {workout.ratio + "%"}
                                                </div>
                                                <div>
                                                    
                                                </div>
                                            </div>

                                            <hr className="mt-1 mb-3 h-px bg-[#3898F2] border-0"></hr>

                                            <div className="text-xs">
                                                {workout.exercisesString}
                                            </div>

                                            <div className="text-right font-semibold mt-2 text-sm text-black">
                                                {workout.exercises_info.length} exercises
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>}
            </div>

            <div className="text-center mt-14">
                <button
                    className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
                    onClick={() => {
                        navigate("/workouts/create");
                    }}
                >
                    {CreateWorkout}
                </button>
            </div>
        </div>
    );
}

export default Home;