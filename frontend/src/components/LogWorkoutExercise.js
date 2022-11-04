import React, { useState } from "react";

const LogWorkoutExercise = ({ exercise, exerciseStats, setExerciseStats }) => {
  const [isActive, setIsActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [saveButton, setSaveButton] = useState("Save");

  const val = [];

  const data = [
    {
      id: 0,
      reps: 0,
      weight: 0,
    },
    {
      id: 1,
      reps: 0,
      weight: 0,
    },
    {
      id: 2,
      reps: 0,
      weight: 0,
    },
    {
      id: 3,
      reps: 0,
      weight: 0,
    },
  ];

  const handleRepChange = (e, id) => {
    const value = Number(e.target.value);

    data.forEach((object) => {
      if (object.id === id) {
        data[id].reps = value;
      }
    });
  };

  const handleWeightChange = (e, id) => {
    const value = Number(e.target.value);

    data.forEach((object) => {
      if (object.id === id) {
        data[id].weight = value;
      }
    });
  };

  function clickHandler() {
    setClicked(true);
    setSaveButton("Saved");
    data.forEach((object) => {
      val.push({
        reps: object.reps,
        weight: object.weight,
      });
    });

    setExerciseStats((prev) => [
      ...prev,
      { exerciseID: exercise._id, sets_info: val },
    ]);
  }


  return (
    <div>
      <div className="filters-container bg-disabled-gradient-lighter rounded-lg mt-3 shadow-gray-100">
        <div className="accordion-item">
          <div className="grid justify-items-center">
            <div
              className="accordion-title flex py-4"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="w-80 font-medium">{exercise.name}</div>
              <div className="">{isActive ? "-" : "+"}</div>
            </div>
          </div>
          {isActive && (
            <div className="p-6 accordion-content flex flex-col ">
              <div>
                <span className="font-medium text-blue-600">Preparation:</span>
                {exercise.instructions.preparation}
                <br></br>
              </div>
              <div>
                <span className="font-medium text-blue-600">Execution: </span>
                {exercise.instructions.execution}
                <br></br>
              </div>
              <div>
                <span className="font-medium text-blue-600">Comments: </span>
                {exercise.comments}
                <br></br>
              </div>
              <div className="flex justify-between font-bold text-center mt-5">
                <h1>Set</h1>
                <h1>Prev</h1>
                <h1>Reps</h1>
                <h1>Weight</h1>
              </div>
              <div className="gap-4 place-content-center">
                {[0, 1, 2, 3].map((id) => {
                  return (
                    <div key={id} className="flex gap-4 space-y-2">
                      <h1 className="w-8/12 mt-2">{id + 1}</h1>
                      <h1 className="w-8/12 ">Prev</h1>
                      <input
                        className="w-8/12 rounded-xl px-2"
                        type="text"
                        name="reps"
                        onChange={(e) => {
                          handleRepChange(e, id);
                        }}
                      ></input>
                      <input
                        className="w-8/12 rounded-xl px-2"
                        type="text"
                        name="weight"
                        placeholder="lbs"
                        onChange={(e) => {
                          handleWeightChange(e, id);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-5 items-center mx-9 py-2 rounded-md disabled:bg-disabled-gradient bg-default-gradient hover:bg-blue-700 text-white"
                onClick={clickHandler}
                disabled={clicked}
              >
                {saveButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogWorkoutExercise;
