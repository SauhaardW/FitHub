import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import LogWorkoutExercise from "../components/LogWorkoutExercise";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogWorkout = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const workout = state !== null ? state.workout : {};
    const friend = state !== null ? state.friend : "";

    const [exerciseStats, setExerciseStats] = useState([]);
  const [workoutLogged, setWorkoutLogged] = useState(false);
  const [logWorkout, setLogWorkout] = useState("Finish Workout");

    useEffect( () => { // does not save set info if go back to prev page
        //hide topbar on mount
        document.getElementById('top-bar-hamburger-menu').style.display = "none"
        document.getElementById('top-bar-back-arrow').style.display = "initial"

        return () => {
            //show topbar on unmount
            document.getElementById('top-bar-hamburger-menu').style.display = "initial"
            document.getElementById('top-bar-back-arrow').style.display = "none"
        }
    }, []);

  function getTodaysDate(date = new Date()) {
    return `${date.getFullYear()}-${(date.getMonth() + 1) //add one to month because getMonth returns 0-12
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  function endWorkoutClicked() {
    setWorkoutLogged(true);
    setLogWorkout("Workout logged");
    const url = "http://localhost:3001/api/workout-history";
    axios
      .post(url, {
        workout_history: {
          workoutID: workout._id,
          date: getTodaysDate(),
            friend: friend,
          exercises: exerciseStats,
        },
      })
      .then((res) => {
        navigate("/home", { state: { loggedWorkout: true } });
      });
  }

  return (
    <div className="p-4">
      <div className="mt-20 text-4xl">{workout.name}</div>
        <div className="flex justify-between mt-1 text-sm text-gray-600">
          <div>
            Created by: {workout.username}
          </div>
            { friend !== null && friend !== undefined && friend.length !== 0 && <div>Scheduled with: {friend}</div>}
        </div>
      <hr className="mt-3 mb-1 h-px bg-gray-300 border-0"></hr>
      <p className="text-center font-bold mt-2 text-default-gradient">
        Workout started. Good luck!
      </p>
      <div className="container h-max-[calc(100vh-60px)] overflow-scroll">
        {workout.exercises_info === undefined ? (
          <div>No exercises to display</div>
        ) : (
          workout.exercises_info.map((exercise) => (
            <LogWorkoutExercise
              key={exercise._id}
              exercise={exercise}
              exerciseStats={exerciseStats}
              setExerciseStats={setExerciseStats}
            />
          ))
        )}
      </div>
      <button
        className="sticky bottom-4 mt-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded"
        onClick={endWorkoutClicked}
        disabled={workoutLogged}
      >
        {logWorkout}
      </button>
    </div>
  );
};

export default LogWorkout;
