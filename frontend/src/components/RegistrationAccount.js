import React, {useEffect} from 'react'

const RegistrationAccount = ({formData, setFormData, disableNext, setDisableNext, isUsernameUnique}) => {

    useEffect(() => {
        //Runs on the first render and any time any dependency value changes
        validateInput()
        // be careful with the line below, it removes all lint warnings about dependencies that should be added to dep array. Using it here because there are a lot of deps
        // that give warnings but should not be added disableNext, setDisableNext, etc. If you add new deps consider whether they should be included in deps array of useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.username, formData.email, formData.password]);

    const validateInput = () => {
        if (formData.username !== "" && formData.email !== "" && formData.password !== ""){
            setDisableNext(false)
        }
        else if (!disableNext){
            //when you go back to prev page and clear an input field, then formData.somefield == "", so first if is false but button is enabled
            setDisableNext(true)
        }
    }

  return (
    <div className='registration_container'>
      <h1>Lets make you an account!</h1>

      <div className='inputInfo'>
          <p>Username</p>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.username}
            onChange={(event) => setFormData({...formData, username: event.target.value })

          }/>
          {!isUsernameUnique &&
              <div className="text-red-500 text-sm text-center mt-2">
                  ** This username is taken. Please choose another **
              </div>
          }
      </div>
      <div className='inputInfo'>
          <p>Email</p>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.email}
            onChange={(event) => setFormData({...formData, email: event.target.value })

          }
          />
      </div>
      <div className='inputInfo'>
          <p>Password</p>
            <input type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.password}
            onChange={(event) => setFormData({...formData, password: event.target.value })

            }/>
      </div>
      </div>
  )
}

export default RegistrationAccount