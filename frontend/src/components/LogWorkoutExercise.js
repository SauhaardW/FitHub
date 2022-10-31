import React, { useState } from "react";

const LogWorkoutExercise = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [reps, setReps] = useState([]);

  function getReps() {}

  return (
    <div>
      <div className="filters-container bg-disabled-gradient-lighter rounded-lg mt-3 shadow-gray-100">
        <div className="accordion-item">
          <div className="grid justify-items-center">
            <div
              className="accordion-title flex py-4"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="w-80 font-medium">{props.exercise.name}</div>
              <div className="">{isActive ? "-" : "+"}</div>
            </div>
          </div>
          {isActive && (
            <div className="p-6 accordion-content flex flex-col ">
              <div>
                <span className="font-medium text-blue-600">Preparation:</span>
                {props.exercise.instructions.preparation}
                <br></br>
              </div>
              <div>
                <span className="font-medium text-blue-600">Execution: </span>
                {props.exercise.instructions.execution}
                <br></br>
              </div>
              <div>
                <span className="font-medium text-blue-600">Comments: </span>
                {props.exercise.comments}
                <br></br>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogWorkoutExercise;
