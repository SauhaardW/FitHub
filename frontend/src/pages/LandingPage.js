import React, {useEffect} from 'react';
import './Pages.css';
import { Link, useNavigate } from "react-router-dom";
import "../components/ExercisesSearch";

const LandingPage = () => {
    let navigate = useNavigate();

    useEffect( () => {
        //hide topbar on mount
        document.getElementById('top-bar').style.display = "none"
        return () => {
            //show topbar on unmount
            document.getElementById('top-bar').style.display = "initial"
        }
    }, []);

    return (
        <div className="h-screen mt-0 page-font flex justify-center">
            <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Experienced gymgoer doing pullups"
                className="object-cover object-center brightness-50 opacity-80 h-full"
            />
            <div className="absolute top-36 w-full text-white flex justify-center">
                <div className="text-6xl blue-text font-medium">
                    FitHub
                </div>
            </div>

            <div className="absolute bottom-36 w-full text-white flex justify-center flex-col items-center">
                    <button
                        className='bg-default-gradient hover:bg-blue-700 text-3xl text-white disabled:opacity-50 font-bold py-3 px-12 rounded'
                        onClick={() =>{
                            navigate('/registration');
                        }}
                    >
                        Get Started
                    </button>
                <div className="mt-3 text-sm">
                    Already have an account?
                </div>
                <Link className="mt-2 text-sm underline" to="/login">
                    Log in
                </Link>
            </div>


        </div>
    );
}

export default LandingPage;