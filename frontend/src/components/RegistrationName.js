import React, {useEffect, useState} from 'react'
import "./Form.css"

const RegistrationName = ({formData, setFormData, disableNext, setDisableNext}) => {

    useEffect(() => {
        //Runs on the first render and any time any dependency value changes
        validateInput()
    }, [formData.name]);

    const validateInput = () => {
        console.log("one ")

        if (formData.name != ""){
            setDisableNext(false)
            console.log("here 2")

        }
        else if (disableNext == false){
            //when you go back to prev page and clear input field, then formData.name == "", so first if is false but button is enabled
            console.log("going to disable")

            setDisableNext(true)
        }
    }

    return (
    <div className='registration_container'>
        <h1>What should we call you?</h1>
        <input
            id="name-input"
            type="text"
            placeholder='Name'
            className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.name}
            onChange={(event) => {
                setFormData({... formData, name: event.target.value })
            }}
        />
    </div>
  )
}

export default RegistrationName