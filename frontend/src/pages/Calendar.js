import React from "react";
import "./Pages.css";
import CalendarComponent from "../components/CalendarComponent";
import { calendar, scheduleWorkout } from "./../strings";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  return (
    <div className="page-title pages">
      <div className="flex justify-between px-4">
        <div className="text-4xl font-semibold">{calendar}</div>
      </div>

      <hr
        className="ml-5 mr-5"
        style={{
          borderColor: "black",
        }}
      />
      <div className="flex flex-col">

      <CalendarComponent></CalendarComponent>
      <button
        className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
        onClick={() => {
          navigate("/calendar/schedule-workout");
        }}
      >
        {scheduleWorkout}
      </button>
      </div>
    </div>
  );
};

export default Calendar;
