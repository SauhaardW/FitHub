import React from 'react';
import './Pages.css';

import { useNavigate } from "react-router-dom";


const History = () => {
    const navigate = useNavigate();
    return (
        <div className="page-title pages">
            History PAGE

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