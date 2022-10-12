import React, {useEffect} from 'react'
import "./Form.css"

const RegistrationName = ({formData, setFormData, disableNext, setDisableNext}) => {

    useEffect(() => {
        //Runs on the first render and any time any dependency value changes
        validateInput()
        // be careful with the line below, it removes all eslint warnings about dependencies that should be added to dep array. Using it here because there are deps
        // that give warnings but should not be added: disableNext, setDisableNext. If you add new deps consider whether they should be included in deps array of useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.name]);

    const validateInput = () => {
        if (formData.name !== ""){
            setDisableNext(false)
        }
        else if (!disableNext){
            //when you go back to prev page and clear input field, then formData.name == "", so first if is false but button is enabled
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
                setFormData({...formData, name: event.target.value })
            }}
        />
    </div>
  )
}

export default RegistrationName