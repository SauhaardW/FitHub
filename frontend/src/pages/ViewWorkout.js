import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseComponent from '../components/ExerciseComponent';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoKebabHorizontal } from "react-icons/go";
import { GrCopy } from "react-icons/gr";


const ViewWorkout = () => {
    const {state} = useLocation();
    const workoutId = state !== null ? state.workoutId : "";
    const [workout, setWorkout] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect( () => {
        const params = {id: workoutId}
        axios.get("http://localhost:3001/api/workout", {params}).then( (res) => {
            setWorkout(res.data.data[0]);
        })
    }, [workoutId]);

    const navigate = useNavigate();


    return (
        <div className='p-4'>
            <div className='flex'>
            <div className="mt-20 text-4xl">{workout.name}</div>
            <div className='mt-20 px-24'>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <GoKebabHorizontal className="w-10 h-10 ml-16"/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={()=>{
                    navigator.clipboard.writeText("Workout Name: "+ workout.name + "\n" +
                    "Creator: " + workout.username + "\n" + 
                    "Exercises: " + workout.exercises_info.map((ex) => {
                    return   "Name: " + (ex).name + "\n" + "Instructions: " + JSON.stringify(ex.instructions) + "\n" }).join("\n\n")) 
                    handleClose() }}>
                        <GrCopy></GrCopy> - Copy</MenuItem>
            </Menu>
            </div>
            </div>

            <div className="mt-1 text-sm text-gray-600">Created by: {workout.username}</div>
            <hr className="mt-3 mb-1 h-px bg-gray-300 border-0"></hr>
            <div className="container h-max-[calc(100vh-60px)] overflow-scroll">
                {workout.exercises_info === undefined ? <div>No exercises to display</div> : workout.exercises_info.map(exercise=>(
                        <ExerciseComponent key={exercise._id} exercise={exercise}/>
                    ))}
            </div>
            <button 
                onClick={() => { navigate("log", { state: {workout: workout}}) }}
                className='sticky bottom-4 mt-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded'>
                Log Workout
            </button>

        </div>
    );


};

export default ViewWorkout;
