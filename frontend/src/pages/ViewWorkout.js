import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseComponent from '../components/ExerciseComponent';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoKebabVertical } from "react-icons/go";
import { GrCopy } from "react-icons/gr";
import {AiFillLike} from "react-icons/ai";
import {AiFillDislike} from "react-icons/ai";


const ViewWorkout = () => {
    const {state} = useLocation();
    const workoutId = state !== null ? state.workoutId : "";
    const [workout, setWorkout] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [LikeisActive, setLikeIsActive] = useState(true);
    const [DislikeisActive, setDislikeIsActive] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect( () => {
        if (workoutId != ""){ //state changes to null when hamburger menu is opened, so workoutID will update to ""
            const params = {id: workoutId}
            axios.get("http://localhost:3001/api/workout", {params}).then( (res) => {
                setWorkout(res.data.data[0]);
            })
        }
    }, [workoutId]);

    function likeButtonPressed() {
        const url = "http://localhost:3001/api/like-status";
        axios.post(url, {workoutID: workout._id, status: true,});
        if (!DislikeisActive) {
            setDislikeIsActive(current => !current);
        }
        setLikeIsActive(current => !current);
    }

    function dislikeButtonPressed() {
        const url = "http://localhost:3001/api/like-status";
        axios.post(url, {workoutID: workout._id, status: false,});
        if (!LikeisActive) {
            setLikeIsActive(current => !current);
        }
        setDislikeIsActive(current => !current);
    }

    const navigate = useNavigate();

    return (
        <div className='p-4'>
            <div className='pt-20 flex justify-between align-middle'>
            <div className="text-4xl">{workout.name}</div>
            <div className='pt-2'>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <GoKebabVertical className="w-5 h-5"/>
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
                        handleClose() }}
                        >
                        <GrCopy/> - Copy
                    </MenuItem>
                    
                </Menu>
                </div>
            </div>

            <div className="mt-1 text-sm text-gray-600 ">Created by: {workout.username}
            <button className="mt-1 text-sm text-gray-600 p-2 outline-1 ml-40 w-5" onClick={likeButtonPressed} style={{

          color: LikeisActive ? '' : 'green',
        }}
        > <AiFillLike size={20}/></button>
            <button className="mt-1 text-sm text-gray-600 p-2 outline-1  ml-4" onClick={dislikeButtonPressed}
            style={{

                color: DislikeisActive ? '' : 'red',
              }}><AiFillDislike size={20} /></button>
            </div>
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