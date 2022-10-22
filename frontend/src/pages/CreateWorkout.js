import React, { useEffect, useState} from 'react';
import ExercisesSearch from "../components/ExercisesSearch"
import axios from 'axios';
import { Create } from "./../strings";
import WorkoutComponent from '../components/WorkoutComponent';
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs"

const CreateWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [done, setDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [list_exercises, setList_exercises] = useState([]);
    const change_list = (id) => {
        if(list_exercises.indexOf(id) === -1) {
            setList_exercises(list_exercises => [...list_exercises, id]);
        }
    }

      function getUsername() {
        axios
            .get("/api/current-user")
            .then((response) => {
                setUsername(response.data.data.username);
        });
    }

    useEffect(()=>{
        getUsername();
    }, [])

    const navigate = useNavigate()

    const addWorkout = () => {
        axios.post("/api/workouts", {name: name,username: username,exercises: list_exercises.map(ex=>ex._id)}).then(res => {
            if (res.status === 200){
                if (res.data.success){
                    setDone(true);
                    setExercises([]);
                    setName("");
                    setList_exercises([]);
                    navigate("/workouts")
                }else if (res.data.workoutExists){
                    setErrorMessage(res.data.error);
                }
            }
            })
    }    

    
    return (
        <div className='p-4'>
            <div className="mt-20 text-4xl mb-2">Create Workout</div>
            <div className='flex justify-items-center'>
                <div>
                    <input
                        id="name-input"
                        type="text"
                        placeholder='Name'
                        className="py-2 px-2 w-[calc(100vw-32px)] bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value )
                            setDone(false);
                        }}
                    />
                    {errorMessage !== "" &&
                    <div className="text-xs pt-2 pl-2 text-red-500">{errorMessage}!</div>}
                </div>
            </div>
            {done && <div id='success-notification' className='mt-5 -mb-5 text-green-500 text-sm'>Your workout has been created!</div>}
            
            <div className="container mt-6">
                    <div className="exercises-label text-4xl mb-2">Exercises</div>
                    
                    {list_exercises.length===0 ? <div>Add exercises to see them displayed here</div> : list_exercises.map(exercise=>(
                        <div className={"filters-container bg-disabled-gradient-lighter rounded-lg mt-3 shadow-gray-100"}>
                            <div className='grid justify-items-center'>
                                <div className="flex justify-items-between align-middle py-4">
                                    <div className='w-80 font-medium'>{exercise.name}</div>
                                    <BsTrash
                                        className="w-6 h-6"
                                        onClick={(e)=> {
                                            console.log(e.target);
                                            setList_exercises(list_exercises.filter((ex)=> ex._id !== exercise._id))
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="container mt-6">
                    <div className="exercises-label text-4xl mb-2">Add Exercises</div>
                    
                    <ExercisesSearch exerciseSetter={setExercises}/>
                    {exercises.map(exercise=>(
                        <WorkoutComponent key={exercise._id} change_list={change_list} list_exercises={list_exercises} exercise={exercise}/>
            ))}
            </div>

            <button className='sticky bottom-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded'
                disabled={!list_exercises.length>0 || name===""} onClick={addWorkout} >
                {Create}
            </button>
        </div>
    );


};

export default CreateWorkout;
