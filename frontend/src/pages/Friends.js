import React, { Fragment, useEffect } from 'react';
import './Pages.css';
import axios from 'axios';
import { useState} from 'react';
import {Link} from "react-router-dom";
import { friend } from './../strings';
import { addfriend } from './../strings';
import { schedule } from './../strings';
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
        
        <div className='flex'>
            <div className="text-4xl pl-4 font-semibold">{friend}</div>
            <Link to="/Profile" className="bg-blue-500 p-6 mb-4 ml-3 py-3 text-white rounded-md">{addfriend}</Link>
        </div>

        <hr className='ml-5 mr-5'
                    style={{
                    borderColor: "black",
                    }}
        />

        <ul className='m-5 grid grid-justify-center'>
            {data.map((friend)=>{
                return(
                    <li className='px-4'>
                    <div key={friend._id} className='m-1 p-5 grid grid-cols-2 bg-gray-300 rounded-md'> 
                        {friend.name}
                        <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full"
                        onClick={onScheduleClicked}>{schedule}</button>
                    </div>
                    </li>
                )
            })}
        </ul>
    </div>
    </Fragment>);
}

export default Friends;
