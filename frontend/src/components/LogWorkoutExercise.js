import React, { useState } from "react";
import {ImCross} from "react-icons/im";
import {GoPlus} from "react-icons/go";

const LogWorkoutExercise = ({ exercise, exerciseStats, setExerciseStats }) => {
  const [isActive, setIsActive] = useState(false);
  const [saveButton, setSaveButton] = useState("Save");
  const [invalidDataMessage, setInvalidDataMessage] = useState("** Invalid input for reps or weight **");

  const [data, setData] = useState([{
    reps: -1,
    weight: -1,
  }])

  const handleRepChange = (e, id) => {
    const numberRegex = new RegExp("^[0-9]+$");
    var value = -1
    if (numberRegex.test(e.target.value)) {
      value = Number(e.target.value);
    } 
  
    const newData = data.map((obj, index) => {
      if (index === id) { obj.reps = value }
      return obj
    })
    setData(newData)
  };

  const handleWeightChange = (e, id) => {
    const numberRegex = new RegExp("^[0-9]+$");
    var value = -1
    if (numberRegex.test(e.target.value)) {
      value = Number(e.target.value);
    } 
  
    const newData = data.map((obj, index) => {
      if (index === id) { obj.weight = value }
      return obj
    })
    setData(newData)
  };

  const validateInput = () => {
    console.log(data)
    var res = data.map((x) => {
      if (x.reps >= 1 && x.weight >= 1) {
        return true;
      }
      return false;
    })
    return res.every(v => v === true);
  }

  function clickHandler() {
    if (validateInput()) {
      setInvalidDataMessage("");
      setSaveButton("Saved");
      setExerciseStats((prev) => [
        ...prev,
        { exerciseID: exercise._id, sets_info: data },
      ]);
    } else {
      setInvalidDataMessage("** Invalid input for reps or weight **");
      setSaveButton("Save");
    }
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
              <div className="flex justify-between font-bold text-center mt-5 mr-1">
                <h1 className="pl-7">Set</h1>
                <h1 className="pl-2">Prev</h1>
                <h1>Reps</h1>
                <h1>Weight</h1>
              </div>
              <div className="gap-4 place-content-center">
                {[...Array(data.length).keys()].map((id) => {
                  return (
                    <div key={id} className="flex items-center gap-4 space-y-2">
                      <div className="pt-2 opacity-20"
                        onClick={()=>{if (data.length != 1) {setData(data.filter((_, index) => index != id))}}}>
                        <GoPlus className="w-5 h-5" style={{transform: 'rotate(45deg)'}} />
                      </div>
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
              <div className="flex justify-end opacity-20 pt-3"
                onClick={()=>{setData([...data, {reps: -1, weight: -1,}])}}>
                <GoPlus className="w-5 h-5"/>
              </div>
              <div className="text-red-600 text-center">
                {invalidDataMessage}
              </div>
              <button
                className="mt-5 items-center mx-9 py-2 rounded-md disabled:bg-disabled-gradient bg-default-gradient hover:bg-blue-700 text-white"
                onClick={clickHandler}
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
