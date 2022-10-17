import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {CreateWorkout } from "./../strings";

const Home = () => {
    const navigate = useNavigate();
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [name, setName] = useState("");

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
            setRecommendedWorkouts(recWorkouts)
        })
    }, []);


    return (
        <div className="pages mx-3 page-font flex flex-col justify-between">
            <div>
                <div className="text-4xl font-normal">
                    Hello, {name}!
                </div>

                <hr className="mt-1 mb-5 h-px bg-black border-0"></hr>

                {userWorkouts !== null && userWorkouts !== undefined && userWorkouts !== [] && <div>
                    <div className="text-md m-1 font-semibold">
                        YOUR WORKOUTS
                    </div>

                    <div className="horizontal-scrollable-div">
                        <ul className="flex">
                            {userWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name} className="flex w-60 justify-between p-3 m-1 mr-3 outline outline-1 outline-[#3898F2] rounded">
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

                {recommendedWorkouts !== null && recommendedWorkouts !== undefined && recommendedWorkouts !== [] && <div>
                    <div className="text-md m-1 mt-3 font-semibold">
                        OUR WORKOUTS
                    </div>

                    <div className="horizontal-scrollable-div">
                        <ul className="flex">
                            { recommendedWorkouts.map((workout) => {
                                return (
                                    <li key={workout.name} className="flex w-60 justify-between p-3 m-1 mr-3 outline outline-1 outline-[#3898F2] rounded">
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
            </div>

            <div className="text-center mt-14">
                <button
                    className="bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded"
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