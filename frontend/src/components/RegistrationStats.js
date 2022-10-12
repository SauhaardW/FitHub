import React, {useEffect, useState} from 'react'

const RegistrationStats = ({formData, setFormData, disableNext, setDisableNext}) => {
    const [invalidDataMessage, setInvalidDataMessage] = useState("");

    useEffect(() => {
        //Runs on the first render and any time any dependency value changes
        validateInput()
        // be careful with the line below, it removes all eslint warnings about dependencies that should be added to dep array. Using it here because there are deps
        // that give warnings but should not be added: disableNext, setDisableNext. If you add new deps consider whether they should be included in deps array of useEffect

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.age, formData.weight, formData.height]);

    const validateInput = () => {
        setInvalidDataMessage("** Age, weight, height must be positive numeric values **");
        if (formData.age !== "" && formData.height !== "" && formData.weight !== ""){
            const numberRegex = new RegExp("^[0-9]+$");
            if (numberRegex.test(formData.age) && numberRegex.test(formData.weight) && numberRegex.test(formData.height)) {
                setFormData({...formData, age: +formData.age, weight: +formData.weight, height: +formData.height})
                setDisableNext(false);
                setInvalidDataMessage("");
            }else{
                setDisableNext(true);
                // setInvalidDataMessage("** Age, weight, height must be positive numeric values **")
            }
        }
        else if (!disableNext){
            //when you go back to prev page and clear an input field, then formData.somefield == "", so first if statement is false but button is enabled
            setDisableNext(true);
            // setInvalidDataMessage("** Age, weight, height must be positive numeric values **")
        }
        else{
            // setInvalidDataMessage("** Age, weight, height must be positive numeric values **")
        }
    };

    return (
    <div className='registration_container flex flex-col'>
        <div className="inputInfo">
          <h1>How old are you?</h1>
              <input type="number"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                       focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={formData.age}
                     onChange={(event) => {
                         setFormData({...formData, age: event.target.value })
                     }}
              />
        </div>

        <div className="inputInfo">
            <h1>What is your weight?</h1>
            <div className="flex items-center text-gray-900 ">
                <input type="number"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   value={formData.weight}
                   onChange={(event) => {
                       setFormData({...formData, weight: event.target.value })
                   }}
            />
            <span className="font-semibold">lbs</span>
            </div>
        </div>

        <div className="inputInfo">
            <h1>What is your height?</h1>
            <div className="flex items-center text-gray-900 ">
                <input type="number"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   value={formData.height}
                   onChange={(event) => {
                       setFormData({...formData, height: event.target.value })
                   }}
                />
                <span className="font-semibold">cm</span>
            </div>
        </div>

        {invalidDataMessage && <div className="text-red-500 text-center text-sm mt-12">
            {invalidDataMessage}
        </div>}
    </div>
    )
}

export default RegistrationStats