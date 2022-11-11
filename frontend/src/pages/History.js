import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";

import { useNavigate } from "react-router-dom";


const History = () => {
    const navigate = useNavigate();

    const NameOptions = ["weight", "height", "upper_arm_circumference", "forearm_circumference", "chest_circumference", "thigh_circumference", "calf_circumference", "waist_circumference","shoulder_circumference"];

    const [streak, setStreak] = useState("");

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
        <div className="page-title mx-3 pages">
            <div className="flex justify-between">
                <div className="text-4xl font-bold">
                    Statistics
                </div>

                {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <span>{"🔥"}</span>
                    <span className="ml-1">{streak}</span>
                </div>}
            </div>
            <hr className="mt-2 mb-2 h-px bg-black border-0"></hr>

            <div className='redirect'>
            <a onClick={() => {
                        navigate("/history/workouts");
                    }}
                class="pl-44  inline-flex items-center font-normal text-gray-600 dark:text-gray-500 underline">
                View workout history
                <svg aria-hidden="true" class="ml-1 w-5 h-5 hover:ml-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>   
                </div>  

                <div className='inputInfo'>
            <p>Statistic Type</p>
                <select 

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Please select statistic type</option>
                    <option value={NameOptions[1]}>Height</option>
                    <option value={NameOptions[0]}>Weight</option>
                    <option value={NameOptions[2]}>Upper arm circumference</option>
                    <option value={NameOptions[3]}>Forearm circumference</option>
                    <option value={NameOptions[4]}>Chest circumference</option>
                    <option value={NameOptions[5]}>Thigh circumference</option>
                    <option value={NameOptions[6]}>Calf circumference</option>
                    <option value={NameOptions[7]}>Waist circumference</option>
                    <option value={NameOptions[8]}>Shoulder circumference</option>
                </select>
            </div>   



            <button
                    className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
                    onClick={() => {
                        navigate("/user/log-stats");
                    }}
                >
                    Add Stats
                </button>
        </div>
        
        
    );
}

export default History;