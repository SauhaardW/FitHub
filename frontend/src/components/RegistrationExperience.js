import React from 'react'


const RegistrationExperience = ({formData, setFormData}) => {
    const experienceOptions = ["Beginner", "Intermediate", "Experienced"];

    return (
    <div className='registration_container mt-28'>
      <h1>How experienced are you?</h1>

      <div className="relative w-full lg:max-w-sm">
            <div className="grid justify-items-center">
              <select
              onChange={(event) => setFormData({...formData, experience: event.target.value })}
              value={formData.experience}
              className="bg-gray-50 mx-auto w-4/6 p-2.5 mt-1 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                  <option value={experienceOptions[0]}>{experienceOptions[0]}</option>
                  <option value={experienceOptions[1]}>{experienceOptions[1]}</option>
                  <option value={experienceOptions[2]}>{experienceOptions[2]}</option>
              </select>
            </div>

        </div>

    </div>
    )
}

export default RegistrationExperience