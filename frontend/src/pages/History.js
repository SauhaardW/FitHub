import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";

import { useNavigate } from "react-router-dom";


const History = () => {
    const navigate = useNavigate();
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
            <hr className="mt-1 mb-5 h-px bg-black border-0"></hr>

            <div className='redirect flex justify-end'>
                <button onClick={() => {
                            navigate("/history/workouts");
                        }}
                    className="flex pt-1 items-center font-normal text-gray-600 dark:text-gray-500 underline"
                >
                    View workout history
                    <svg aria-hidden="true" class="ml-1 w-5 h-5 hover:ml-4" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path></svg>
                </button>
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