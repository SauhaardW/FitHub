import React from 'react';
import './Pages.css';

import { useNavigate } from "react-router-dom";


const History = () => {
    const navigate = useNavigate();
    return (
        <div className="page-title pages">
            <div className="flex justify-between px-4">
                <div className="text-4xl font-semibold">History</div>
            </div>

            <hr
                className="ml-5 mr-5"
                style={{
                borderColor: "black",
                }}
            />
            <div className='redirect'>
            <a onClick={() => {
                        navigate("/history/workouts");
                    }}
                class="pl-48 pt-1 inline-flex items-center font-normal text-gray-600 dark:text-gray-500 underline">
                View workout history
                <svg aria-hidden="true" class="ml-1 w-5 h-5 hover:ml-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>   
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