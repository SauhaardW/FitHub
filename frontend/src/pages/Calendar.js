import React from "react";
import "./Pages.css";
import { calendar, scheduleWorkout } from "./../strings";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  return (
    <div className="page-title pages">
      <div className="text-4xl font-semibold">{calendar}</div>
      <button
        className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded"
        onClick={() => {
          navigate("/calendar/schedule-workout");
        }}
      >
        {scheduleWorkout}
      </button>
    </div>
  );
};

export default Calendar;
