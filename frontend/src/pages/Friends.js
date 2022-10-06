import React, { Fragment, useEffect } from 'react';
import './Pages.css';
import axios from 'axios';
import { useState} from 'react';
const Friends = () => {


    const [data, setData] = useState([]);

    function getfriendsData(){
        axios.get('http://localhost:3001/api/exercise').then(res => {
           setData(res.data.data)
        })
    }
    
    useEffect(()=>{
        getfriendsData();
    }, [])


    const onScheduleClicked = () => {
        console.log('Sucessfully clicked')
    }
    

    return(<Fragment>
        <div>
    </div>
    </Fragment>);
}

export default Friends;
