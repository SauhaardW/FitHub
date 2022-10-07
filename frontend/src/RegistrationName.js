import React from 'react'
import "./Form.css"

const RegistrationName = ({formData, setFormData}) => {
  return (
    <div className='registration_container'>
        <h1>What should we call you?</h1>
        <input type="text" placeholder='Name' class="bg-gray-50 border border-gray-300 
        text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
        w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black 
        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        value={formData.name} onChange={(event) => setFormData({... formData, name: event.target.value })
        
        }></input>

    </div>
  )
}

export default RegistrationName