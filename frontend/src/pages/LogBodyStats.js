import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Pages.css";

import axios from 'axios';

const LogBodyStats = () => {
    const navigate = useNavigate();
    const current = new Date();
    const [StatsData, setStatsData] = useState({
        name: "",
        date: `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}/${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        value: 0
      })

    const NameOptions = ["weight", "height", "upper_arm_circumference", "forearm_circumference", "chest_circumference", "thigh_circumference", "calf_circumference", "waist_circumference","shoulder_circumference"];

    const LogStats = () => {
        axios.post("http://localhost:3001/api/stats", StatsData).then(res => {
          if (res.status === 200){
            if (res.data.success){
              navigate('/history');
            }
          }
        })
      }

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

  return (
    <div className="pages">
        <div className="flex justify-between px-4">
            <div className="text-4xl font-semibold mb-2">Log your stats</div>
        </div>

        <hr
            className="ml-5 mr-5"
            style={{
            borderColor: "black",
            }}
        />
        <div className='inputInfo'>
        <p>Statistic Type</p>
            <select 
              onChange={(event) => setStatsData({...StatsData, name: event.target.value })}
              value={StatsData.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Please select which statistic to log</option>
                  <option value={NameOptions[1]}>Height</option>
                  <option value={NameOptions[0]}>Weight</option>
                  <option value={NameOptions[2]}>Upper arm circumference</option>
                  <option value={NameOptions[3]}>Forearm circumference</option>
                  <option value={NameOptions[4]}>Chest circumference</option>
                  <option value={NameOptions[5]}>Thigh circumference</option>
                  <option value={NameOptions[6]}>Calf circumference</option>
                  <option value={NameOptions[7]}>Waist circumference</option>
                  <option value={NameOptions[8]}>Shoulder circumference</option>
              </select>
        </div>

        <div className='inputInfo'>
          <p>Value</p>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={StatsData.value}
            onChange={(event) => setStatsData({...StatsData, value: event.target.value })}
          />
 
      </div>
      
      <button
        className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl disabled:opacity-50"
        disabled={StatsData.name === "" || StatsData.value===0 || StatsData.value.length===0} 
        onClick={() => {LogStats();}}
        >
        Log
        </button>
      </div>
            
  )
}

export default LogBodyStats