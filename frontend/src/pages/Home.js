import React, {useEffect} from 'react';
import './Pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {CreateWorkout } from "./../strings";

const Home = () => {
    const navigate = useNavigate();
    useEffect( () => {
        // Anything in here is fired on component mount.
        const url = "http://localhost:3001/api/workouts"
        axios.get(url).then(res => {
           console.log(res.data.data)
        })
    }, []);


    return (
        <div className="page-title pages">
      <button
        className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded"
        onClick={() => {
          navigate("/workouts/create");
        }}
      >
        {CreateWorkout}
      </button>
    </div>
    );
}

export default Home;