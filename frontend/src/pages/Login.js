import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import {useState} from 'react';

const Login = () => {

    return (
        <Fragment>
            <div className='container px-6 py-12 h-full w-96'>
                <div className='flex justify-center items-center space-y-5 flex-wrap h-full g-6 text-gray-800'>
                    <div>
                        <input name='username' type='text' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                        <label for="username" className='absolute top-0'>Username</label>
                    </div>
                    <div>
                        <input name='password' type='password' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
                        <label for="password" className='absolute top-0'>Username</label>
                    </div>

                    <button
                        type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;