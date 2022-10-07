import React, {useState} from 'react'


const RegistrationExperience = ({formData, setFormData}) => {
  const [experience, setExperience] = useState("");

  return (
    <div className='registration_container'>
      <h1>How experienced are you?</h1>
      
      <div className="relative w-full lg:max-w-sm">

            <div className="grid justify-items-center">
              <select 
              onChange={(event) => setFormData({... formData, experience: event.target.value })}
              value={formData.experience}
              className="bg-gray-50 mx-auto w-4/6 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>Please select an option:</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Experienced</option>
              </select>
            </div>

        </div>

    </div>
  )
}

export default RegistrationExperience