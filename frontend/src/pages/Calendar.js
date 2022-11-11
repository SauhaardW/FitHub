import React, {useEffect, useState} from "react";
import "./Pages.css";
import CalendarComponent from "../components/CalendarComponent";
import { scheduleWorkout } from "./../strings";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Calendar = () => {
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
    <div className="page-title pages mx-3 ">
        <div className="flex justify-between">
            <div className="text-4xl font-bold">
                Calendar
            </div>

            {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <span>{"🔥"}</span>
                <span className="ml-1">{streak}</span>
            </div>}
        </div>
        <hr className="mt-1 mb-5 h-px bg-black border-0 px-4"></hr>

      <div className="flex flex-col">

        <CalendarComponent></CalendarComponent>
        <div className="sticky bottom-4 text-center mt-14">
            <button
                className="bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
                onClick={() => {
                navigate("/calendar/schedule-workout");
                }}
            >
                {scheduleWorkout}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
