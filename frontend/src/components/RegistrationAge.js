import React from 'react'

const RegistrationAge = ({formData, setFormData}) => {
  return (
    <div className='registration_container'>
      <h1>How old are you?</h1>
      <input type="text" placeholder='Age' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={formData.age} onChange={(event) => setFormData({... formData, age: event.target.value })
        
      }
      ></input>

    </div>
  )
}

export default RegistrationAge