import React, {useEffect} from 'react';
import './Pages.css';
import axios from "axios";

const Home = () => {

    useEffect( () => {
        // Anything in here is fired on component mount.
        const url = "http://localhost:3001/api/get-workouts"
        axios.get(url).then(res => {
           console.log(res.data.data)
        })
    }, []);


    return (
        <div className="page-title pages">
            Home PAGE
        </div>
    );
}

export default Home;