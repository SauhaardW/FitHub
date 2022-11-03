import React from 'react'
import { useNavigate } from "react-router-dom";


const LogBodyStats = () => {
    const navigate = useNavigate();
  return (
    <div className="page-title pages">
      <div className="flex justify-between px-4">
        <div className="text-4xl font-semibold">Hi! Here you can log your stats!</div>
      </div>
    </div>
            
  )
}

export default LogBodyStats