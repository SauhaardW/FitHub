import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Chart, Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';

ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
)

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

    const [data, setData]= useState({
        labels:["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        datasets:[
            {
                label:"Height",
                hidden: true,
                data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
                backgroundColor:'Black',
                borderColor:'Red',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Weight",

                data:[40, 35, 50, 60, 28, 39, 31, 59, 41, 50, 54, 58],
                backgroundColor:'Black',
                borderColor:'Green',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Forearm Circumference",
                hidden: true,
                data:[10, 11, 21, 14, 8, 12, 6, 9, 11, 16, 18, 14],
                backgroundColor:'Black',
                borderColor:'Blue',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Calf Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Brown',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            }

        ]
    })


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

            <div className='redirect flex justify-end'>
                <button onClick={() => {
                    navigate("/history/workouts");
                }}
                        className="flex pt-1 items-center font-normal text-gray-600 dark:text-gray-500 underline"
                >
                    <div className="flex items-center">
                        <span className="pr-2">View workout history</span>
                        <BsArrowRight/>
                    </div>
                </button>
            </div>




            <Line data={data} className="mt-8" height={"300%"}>

            </Line>

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