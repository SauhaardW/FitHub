import React, { Fragment } from 'react';
import axios from 'axios';
import {useState} from 'react';

const Login = () => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorText, setErrorText] = useState("");

    function SubmitLogin() {
        var payload = {
            username: usernameInput,
            password: passwordInput
        }
        console.log(payload)
        axios.post("http://localhost:3001/api/login", payload).then( (res) => {
            if (res.status === 200) {
                var data = res.data;
                if (data.success) {
                    localStorage.setItem("x-access-token", data.token);
                    setErrorText("");
                } else {
                    setErrorText(data.error);
                }
            } else {
                setErrorText("Failed to log in");
            }
            
        })
    }

    return (
        <Fragment>
            <div className='container px-6 py-12 h-full w-96'>
                <div className='form flex justify-center items-center space-y-5 flex-wrap h-full g-6 text-gray-800'>
                    <div className='error-text text-red-800'>
                        {errorText}
                    </div>
                    <div>
                        <input name='username' onChange={event => setUsernameInput(event.target.value)} type='text' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                        <label htmlFor="username" className='absolute top-0'>Username</label>
                    </div>
                    <div>
                        <input name='password' onChange={event => setPasswordInput(event.target.value)} type='password' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                        <label htmlFor="password" className='absolute top-0'>Username</label>
                    </div>

                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={ event => SubmitLogin() }
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;