import React from "react";
import { useLocation } from "react-router-dom";
import LogWorkoutExercise from "../components/LogWorkoutExercise";

const LogWorkout = (props) => {
  const { state } = useLocation();
  const workout = state !== null ? state.workout : {};

  return (
    <div className="p-4">
      <div className="mt-20 text-4xl">{workout.name}</div>
      <div className="mt-1 text-sm text-gray-600">
        Created by: {workout.username}
      </div>
      <hr className="mt-3 mb-1 h-px bg-gray-300 border-0"></hr>

      <div className="container h-max-[calc(100vh-60px)] overflow-scroll">
        {workout.exercises_info === undefined ? (
          <div>No exercises to display</div>
        ) : (
          workout.exercises_info.map((exercise) => (
            <LogWorkoutExercise key={exercise._id} exercise={exercise} />
          ))
        )}
      </div>
      <button className="sticky bottom-4 mt-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded">
        End Workout
      </button>
    </div>
  );
};

export default LogWorkout;
