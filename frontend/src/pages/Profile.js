import React, {useEffect, useState} from 'react';
import './Pages.css';
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { usernameLabel, nameLabel, logOut, invalidUserData, emailLabel, ageLabel, weightLabel, heightLabel, experienceLabel, editLabel, doneLabel, myAccountLabel, poundsLabel, centimetersLabel } from './../strings'
import 'react-dropdown/style.css';
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { useCookies } from "react-cookie";

const experienceOptions = ["Beginner", "Intermediate", "Experienced"];

const Profile = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [editMode, setEditMode] = useState("");
    const [experience, setExperience] = useState(experienceOptions[0]);
    const [displayInvalidDataMessage, setDisplayInvalidDataMessage] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect( () => {
        // Anything in here is fired on component mount.
        const url = "http://localhost:3001/api/current-user"
        axios.get(url).then(res => {
            const userData = res.data.data

            typeof userData.weight != 'undefined' ? setWeight(userData.weight) : setWeight("")
            typeof userData.height != 'undefined' ? setHeight(userData.height) : setHeight("")
            setName(userData.name);
            setEmail(userData.email);
            setAge(userData.age);
            setExperience(userData.experience);
        })
    }, []);

    const navigate = useNavigate();

    const handleSetUsername = (newUsername) => {
        setUsername(newUsername)
    };

    const handleSetName = (newName) => {
        setName(newName)
    };

    const handleSetEmail = (newEmail) => {
        setEmail(newEmail)
    };

    const handleSetAge = (newAge) => {
        setAge(newAge)
    };

    const handleSetWeight = (newWeight) => {
        setWeight(newWeight)
    };

    const handleSetHeight = (newHeight) => {
        setHeight(newHeight)
    };

    const handleSetExperience = (newExperience) => {
        setExperience(newExperience)
    };

    const handleEditClick = () => {
        if (editMode){ //if we are switching from edit to display mode (when done button is pressed)
            if (!userDataIsInvalid()){ //if all fields are populated, then data is valid
                setDisplayInvalidDataMessage(false);
                updateUserData()
                setEditMode(!editMode);
            }
        }else{
            setEditMode(!editMode);
        }
    };

    const userDataIsInvalid = () => {
        //allow weight, height to be empty since they are not entered on registration
        const isInvalid = (name == "" ||  email == "" ||  age == "" ||  experience == "");
        setDisplayInvalidDataMessage(isInvalid);
        return isInvalid;
    };

    const updateUserData = () => {
        const url = "http://localhost:3001/api/current-user"
        const newUserData = {
            name: name,
            email: email,
            age: age,
            weight: weight,
            height: height,
            experience: experience,
        }
        axios.patch(url, newUserData).catch(err => {
            // Handle error
            setUsername("");
            setName("");
            setEmail("");
            setAge("");
            setWeight("");
            setHeight("");
            setExperience(experienceOptions[0]);
            console.log(err);
        });
    };

    const getEditOrDoneButton = () => {
        if (!editMode) {
            return (
                <>
                    {editLabel}
                    < MdEdit />
                </>
            )
        }
        else {
            return (
                <div className={"done-button px-4 font-semibold text-white"}>
                    {doneLabel}
                </div>
            )
        }
    };

    return (
        <div className="page-font mx-4">
            <div className="font-semibold text-3xl">
                {myAccountLabel}
            </div>
            <hr className="my-3 h-px bg-black border-0"></hr>

            <div className="flex">
                <BsPersonCircle size={70} className="mr-3"/>
                <div>
                    <span className="font-semibold text-3xl">{name}</span>
                    <div className="experience-info">
                        <span className={"px-2"}>{experience}</span>
                    </div>
                </div>

            </div>

            <div>
                <Link to="#" onClick={handleEditClick} className="edit-button flex justify-end items-center mb-1">
                    {getEditOrDoneButton()}
                </Link>
            </div>

            <div className="input-form">

                {editMode && <hr className="my-3 h-px bg-gray-200 border-0"></hr>}

                {editMode && <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2"}>
                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{nameLabel}</label>
                    <input
                        type="text"
                        className="edit-mode-input"
                        value={name}
                        onChange={(event) => handleSetName(event.target.value)}
                    />
                </div>}

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>
                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{usernameLabel}</label>
                    <input
                        type="text"
                        className={editMode ? "edit-mode-input text-gray-500" : "display-mode-input"}
                        value={username}
                        onChange={(event) => handleSetUsername(event.target.value)}
                        disabled
                    />
                </div>

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>
                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{emailLabel}</label>
                    <input
                        type="text"
                        className={editMode ? "edit-mode-input" : "display-mode-input"}
                        value={email}
                        onChange={(event) => handleSetEmail(event.target.value)}
                        disabled={!editMode}
                    />
                </div>

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>

                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{ageLabel}</label>
                    <input
                        type="text"
                        className={editMode ? "edit-mode-input" : "display-mode-input"}
                        value={age}
                        onChange={(event) => handleSetAge(event.target.value)}
                        disabled={!editMode}
                    />
                </div>

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>
                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{weightLabel}</label>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            className={editMode ? "edit-mode-input" : "display-mode-input"}
                            value={weight}
                            onChange={(event) => handleSetWeight(event.target.value)}
                            disabled={!editMode}
                        />
                        <div className={editMode ? "display-mode-label ml-3 font-normal" : "display-mode-label text-black ml-3"}>{poundsLabel}</div>
                    </div>
                </div>

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>

                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{heightLabel}</label>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            className={editMode ? "edit-mode-input" : "display-mode-input"}
                            value={height}
                            onChange={(event) => handleSetHeight(event.target.value)}
                            disabled={!editMode}
                        />
                        <div className={editMode ? "display-mode-label ml-3 font-normal" : "display-mode-label text-black ml-3"}>{centimetersLabel}</div>
                    </div>
                </div>

                <hr className="my-3 h-px bg-gray-200 border-0"></hr>

                <div className={editMode ? "flex flex-col mx-2" : "flex justify-between mx-2 my-1"}>
                    <label className={editMode ? "edit-mode-label" : "display-mode-label"}>{experienceLabel}</label>


                    <select
                        value={experience}
                        onChange={(event) => handleSetExperience(event.target.value)}
                        className="mt-2 p-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        disabled={!editMode}
                    >
                        <option value={experienceOptions[0]}>{experienceOptions[0]}</option>
                        <option value={experienceOptions[1]}>{experienceOptions[1]}</option>
                        <option value={experienceOptions[2]}>{experienceOptions[2]}</option>
                    </select>
                </div>

                {displayInvalidDataMessage && <div className="text-red-500 mt-5">
                    {invalidUserData}
                </div>}
            </div>

            <button
               type="submit"
               className="absolute bottom-5 left-[17vw] mx-auto block w-2/3 px-7 py-3 bg-slate-50 border-2 border-red-600 text-red-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
               data-mdb-ripple="true"
               data-mdb-ripple-color="light"
               onClick={ (event) => {
                removeCookie("x-access-token");
                navigate("/login");
               } }
            >Log Out</button>
        </div >

    );
}

export default Profile;