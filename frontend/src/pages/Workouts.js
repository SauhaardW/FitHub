import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {CreateWorkout } from "./../strings";
import {AiOutlineLike} from "react-icons/ai";
import Emoji from "../components/Emoji";

const Workouts = () => {
    const navigate = useNavigate();
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [streak, setStreak] = useState(""); // do not want to display streak before GET streak value so can't set this
    // to zero since streak can be zero in other situations

    useEffect( () => {
        const myWorkouts = []
        const recWorkouts = []

        const url = "http://localhost:3001/api/workouts?subset=false"
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
                        Workouts
                    </div>

                    {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Emoji label="sheep" symbol="🔥"/>
                        <span className="ml-1">{streak}</span>
                    </div>}
                </div>
                <hr className="mt-1 mb-5 h-px bg-black border-0"></hr>

                <div className="text-md m-1 font-semibold">
                    YOUR WORKOUTS
                </div>

                {(userWorkouts === null || userWorkouts === undefined || userWorkouts.length === 0)
                    ? <div className="text-sm ml-1 text-[#3898F2]">You have no workouts to display!</div>
                    : <div>

                    <div className="scrollable-div m-0 rounded p-1 bg-gray-50 border border-gray-300 h-full max-h-screen">
                        <ul>
                            {userWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name} 
                                        onClick={()=>{navigate('/workout', { state: {workoutId: workout._id}})}}
                                        className="flex justify-between p-3 m-1 mb-2 outline outline-1 outline-[#3898F2] rounded">
                                        <div
                                            key={workout.name}
                                            className="text-[#3898F2] w-full"
                                        >
                                            <div className="font-bold text-lg">
                                                {workout === undefined ? "Undefined" : workout.name.toUpperCase()}
                                            </div>

                                            
                                            <hr className="mt-1 mb-3 h-px bg-[#3898F2] border-0"></hr>


                                            <div className="text-xs">
                                                {workout.exercisesString}
                                            </div>

                                            <div className="text-right font-semibold mt-1 text-sm text-black">
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

                    <div className="scrollable-div m-0 rounded p-1 bg-gray-50 border border-gray-300 h-full max-h-screen">
                        <ul>
                            { recommendedWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name}
                                        onClick={()=>{navigate('/workout', { state: {workoutId: workout._id}})}}
                                        className="flex justify-between p-3 m-1 mb-2 outline outline-1 outline-[#3898F2] rounded">
                                        <div
                                            key={workout.name}
                                            className="text-[#3898F2] w-full"
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
                                            <div className="text-right font-semibold mt-1 text-sm text-black">
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

            <div className="sticky bottom-4 text-center mt-14">
                <button
                    className="bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
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

export default Workouts;