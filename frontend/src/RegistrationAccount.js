import React from 'react'

const RegistrationAccount = ({formData, setFormData}) => {
  return (
    <div className='registration_container'>
      <h1>Lets make you an account!</h1>

      <div className='inputInfo'>
      <p>Username</p>
      <input type="text" placeholder='' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={formData.username} onChange={(event) => setFormData({... formData, username: event.target.value })
        
      }></input>
      </div>
      <div className='inputInfo'>
      <p>Email</p>
      <input type="text" placeholder='' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={formData.email} onChange={(event) => setFormData({... formData, email: event.target.value })
        
      }
      ></input>
      </div>
      <div className='inputInfo'>
      <p>Password</p>
      <input type="password" placeholder='' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={formData.password} onChange={(event) => setFormData({... formData, password: event.target.value })
        
      }></input>
      </div>
      </div>
  )
}

export default RegistrationAccount