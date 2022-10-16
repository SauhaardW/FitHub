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
        // Anything in here is fired on component mount.

       // can not update a state in for loop because state updates asynch, so by next iteration the state may not be updated yet
        const myWorkouts = []
        const recWorkouts = []

        const url = "http://localhost:3001/api/workouts"
        axios.get(url).then(res => {
           const data = res.data.data;
            data.forEach(workout => {
                if (workout.username === "FitHub"){
                    recWorkouts.push(workout)
                }
                else{
                    myWorkouts.push(workout)
                }
            })
            setUserWorkouts(myWorkouts);
            setRecommendedWorkouts(recWorkouts)
        })
    }, []);


    return (
        <div className="pages mx-3 page-font">
            <div className="text-4xl font-normal mb-5 underline">
                Hello, {name}!
            </div>
            {userWorkouts !== null && userWorkouts !== undefined && userWorkouts !== [] && <div>
                <div className="text-lg font-semibold">
                    YOUR WORKOUTS
                </div>

                <div className="horizontal-scrollable-div">
                    <ul className="flex">
                        {(userWorkouts === undefined || userWorkouts === null || userWorkouts.length === 0) ? <div key="None" className="text-black text-sm p-2">No friends to display!</div> : userWorkouts.map((workout) => {
                            return (
                                //change outline colour
                                <li key={workout.name} className="flex w-52 justify-between p-5 m-1 outline outline-1 outline-blue-700 rounded-lg">
                                    <div
                                        key={workout.name}
                                        // className="m-1 p-4 bg-gray-200 rounded-md flex justify-between items-center shadow-md md:filter-none"
                                        className="w-52"
                                    >
                                        <div className="font-bold text-sm">
                                            {workout.name}
                                        </div>

                                        {/*<button*/}
                                        {/*    className="px-2 py-1 bg-default-gradient rounded-lg w-30 text-white text-sm"*/}
                                        {/*    // onClick={onScheduleClicked}*/}
                                        {/*>*/}
                                        {/*    /!*{schedule}*!/*/}
                                        {/*</button>*/}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>}


            <button
                className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded"
                onClick={() => {
                    navigate("/workouts/create");
                }}
            >
                {CreateWorkout}
            </button>
        </div>
    );
}

export default Home;