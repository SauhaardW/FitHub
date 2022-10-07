import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import {useState} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorText, setErrorText] = useState("");
    let navigate = useNavigate();

    useEffect( () => {
        //hide topbar on mount
        document.getElementById('top-bar').style.display = "none"
        return () => {
            //show topbar on unmount
            document.getElementById('top-bar').style.display = "initial"
        }
    }, []);


    const SubmitLogin = () => {
        var payload = {
            username: usernameInput,
            password: passwordInput
        }
        console.log(payload)
        axios.post("http://localhost:3001/api/login", payload).then( (res) => {
            if (res.status === 200) {
                var data = res.data;
                if (data.success) {
                    var cookie = new Cookies();
                    cookie.set('x-access-token', data.token, { path: '/' });
                    setErrorText("");
                    navigate('/');
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
            <div className='container px-6 py-12 flex flex-col items-center justify-between w-screen h-[calc(100vh-60px)] g-6 text-gray-800'>
                <div className='input-container flex flex-col w-full space-y-5'>
                    <p className='text-black-800 text-4xl font-bold self-center text-center pb-10 pt-10'>
                        Welcome back, lets get you signed in!
                    </p>

                    <div className='error-text text-red-800 self-center'>
                        {errorText}
                    </div>

                    <div className='flex flex-col mx-10'>
                        <p className='font-bold text-gray-700'>Username</p>
                        <input name='username' onChange={event => setUsernameInput(event.target.value)} type='text' className='px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col mx-10'>
                        <p className='font-bold text-gray-700'>Password</p>
                        <input name='password' onChange={event => setPasswordInput(event.target.value)} type='password' className='px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                    </div>
                    
                </div>
                <button
                    type="submit"
                    className="block w-full px-7 py-3 bg-default-gradient text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={ event => SubmitLogin() }
                >
                    Sign in
                </button>
            </div>
        </Fragment>
    )
}

export default Login;