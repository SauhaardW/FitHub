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
    const friend = state !== null ? state.friend : "";

    const [workout, setWorkout] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [likeStatus, setLikeStatus] = useState(0);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect( () => {
        //hide topbar on mount
        document.getElementById('top-bar-hamburger-menu').style.display = "none"
        document.getElementById('top-bar-back-arrow').style.display = "initial"

        return () => {
            //show topbar on unmount
            document.getElementById('top-bar-hamburger-menu').style.display = "initial"
            document.getElementById('top-bar-back-arrow').style.display = "none"
        }
    }, []);

    useEffect( () => {
        if (workoutId !== ""){ //state changes to null when hamburger menu is opened, so workoutID will update to ""
            const params = {id: workoutId}
            axios.get("http://localhost:3001/api/workout", {params}).then( (res) => {
                var workout_obj = res.data.data[0];
                const url = "http://localhost:3001/api/get-like-ratio";
                axios.get(url, {params: {workoutID: workoutId}}).then((res) => {
                    setLikeStatus(res.data.userStatus)
                    workout_obj.ratio = res.data.likeRatio.toString();
                    setWorkout(workout_obj);
                })
            })
        }
    }, [workoutId, likeStatus]);

    function likeButtonPressed() {
        const url = "http://localhost:3001/api/like-status";
        axios.post(url, {workoutID: workout._id, status: true});
        if (likeStatus === 0 || likeStatus === -1) {
            setLikeStatus(1);
        } else if (likeStatus === 1) {
            setLikeStatus(0);
        }
    }

    function dislikeButtonPressed() {
        const url = "http://localhost:3001/api/like-status";
        axios.post(url, {workoutID: workout._id, status: false});
        if (likeStatus === 0 || likeStatus === 1) {
            setLikeStatus(-1);
        } else if (likeStatus === 1) {
            setLikeStatus(0);
        }
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
                            //careful with the following line, it makes eslint ignore the warning it gives that there is unexpected string concatenation
                            // eslint-disable-next-line
                        return   "Name: " + (ex).name + "\n" + "Instructions: " + JSON.stringify(ex.instructions) + "\n" }).join("\n\n"))
                        handleClose() }}
                        >
                        <GrCopy/> - Copy
                    </MenuItem>
                    
                </Menu>
                </div>
            </div>
            
            <div className="mt-1 flex justify-between align-middle">
                <div className="text-sm text-gray-600 ">Created by: {workout.username}</div>
                <div className='text-[#3898F2]'>
                    {workout.ratio + "%"}
                    <button className="text-sm text-gray-600 p-2 outline-1 ml-4 w-5" onClick={likeButtonPressed} style={{color: likeStatus===1 ? 'green' : ''}}>
                    <AiFillLike size={20}/></button>
                    <button className="text-sm text-gray-600 p-2 outline-1  ml-4" onClick={dislikeButtonPressed}style={{color: likeStatus===-1 ? 'red' : ''}}>
                    <AiFillDislike size={20} /></button>
                </div>
            </div>
            
            <hr className="mt-3 mb-1 h-px bg-gray-300 border-0"></hr>
            <div className="container h-max-[calc(100vh-60px)] overflow-scroll">
                {workout.exercises_info === undefined ? <div>No exercises to display</div> : workout.exercises_info.map(exercise=>(
                        <ExerciseComponent key={exercise._id} exercise={exercise}/>
                    ))}
            </div>
            <button 
                onClick={() => { navigate("log", { state: {workout: workout, friend: friend}}) }}
                className='sticky bottom-4 mt-4 w-[calc(100vw-32px)] h-[calc(5vh)] bg-default-gradient hover:bg-blue-700 text-white disabled:bg-disabled-gradient font-bold px-8 rounded'>
                Log Workout
            </button>

        </div>
    );


};

export default ViewWorkout;