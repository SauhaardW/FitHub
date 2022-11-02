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
              <div className="flex justify-between font-bold text-center mt-5">
                <h1>Set</h1>
                <h1>Prev</h1>
                <h1>Reps</h1>
                <h1>Weight</h1>
              </div>
              <div className="gap-4 place-content-center">
                {[1, 2, 3, 4].map((id) => {
                  return (
                    <div key={id} className="flex gap-4 space-y-2">
                      <h1 className="w-8/12 mt-2">{id}</h1>
                      <h1 className="w-8/12 ">Prev</h1>
                      <input
                        className="w-8/12 rounded-xl px-2"
                        type="text"
                      ></input>
                      <input
                        className="w-8/12 rounded-xl px-2"
                        type="text"
                        placeholder="lbs"
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogWorkoutExercise;
