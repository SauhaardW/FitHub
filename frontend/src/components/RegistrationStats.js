import React, {useEffect, useState} from 'react'

const RegistrationStats = ({formData, setFormData, disableNext, setDisableNext}) => {
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        //Runs on the first render and any time any dependency value changes
        validateInput()
    }, [formData.age, formData.weight, formData.height]);

    const validateInput = () => {
        setErrorMessage("")
        if (formData.age != "" && formData.height != "" && formData.weight != ""){
            //validate they are all numbers
            const numberRegex = new RegExp("^[0-9]+$");
            if (numberRegex.test(formData.age) && numberRegex.test(formData.weight) && numberRegex.test(formData.height)){
                setFormData({... formData, age: +formData.age, weight: +formData.weight, height: +formData.height })
                setDisableNext(false)
            }
            else{
                setErrorMessage("**All fields must be number values**")
            }
        }
        else if (disableNext == false){
            //when you go back to prev page and clear an input field, then formData.somefield == "", so first if is false but button is enabled
            setDisableNext(true)
        }
    }

    return (
    <div className='registration_container flex flex-col'>
        <div className="inputInfo">
          <h1>How old are you?</h1>
              <input type="text"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                       focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={formData.age}
                     onChange={(event) => {
                         setFormData({... formData, age: event.target.value })
                     }}
              />
        </div>

        <div className="inputInfo">
            <h1>What is your weight?</h1>
            <div className="flex items-center text-gray-900 ">
                <input type="text"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   value={formData.weight}
                   onChange={(event) => {
                       setFormData({... formData, weight: event.target.value })
                   }}
            />
            <span className="font-semibold">lbs</span>
            </div>
        </div>

        <div className="inputInfo">
            <h1>What is your height?</h1>
            <div className="flex items-center text-gray-900 ">
                <input type="text"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   value={formData.height}
                   onChange={(event) => {
                       setFormData({... formData, height: event.target.value })
                   }}
            />
            <span className="font-semibold">cm</span>
        </div>
        </div>

        {errorMessage &&
            <div className="text-red-500 text-small text-center mt-10">
                {errorMessage}
            </div>
        }

    </div>
    )
}

export default RegistrationStats