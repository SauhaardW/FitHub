import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Pages.css";



const LogBodyStats = () => {
    const [StatsData, setStatsData] = useState({
        Height: "",
        Weight: ""
      })
    const navigate = useNavigate();
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
          <p>Height</p>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // value={formData.username}
            // onChange={(event) => setFormData({...formData, username: event.target.value })

          />
 
      </div>
      <div className='inputInfo'>
          <p>Weight</p>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // value={formData.email}
            // onChange={(event) => setFormData({...formData, email: event.target.value })

          
          />
      </div>

      <button
                    className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
                    onClick={() => {
                        navigate("#");
                    }}
                >
                    Log
                </button>
      </div>
            
  )
}

export default LogBodyStats