import React, {useEffect, useState} from "react";
import axios from "axios";

const AddFriends = () => {

    const [searchResult, setSearchResult] = useState("");
    const [searchResultData, setSearchResultData] = useState([]);

    useEffect( () => {
        //hide topbar on mount
        document.getElementById('top-bar-hamburger-menu').style.display = "none"
        document.getElementById('top-bar-back-arrow').style.display = "initial"

        return () => {
            //show topbar on unmount
            document.getElementById('top-bar-hamburger-menu').style.display = "initial"
            document.getElementById('top-bar-back-arrow').style.display = "none"
        }
    }, []);

    function getSearchResults(query) {
        axios
            .get("http://localhost:3001/api/user", {
                params: {
                    name: query,
                },
            })
            .then((response) => {
                setSearchResultData(response.data.data);
            });
    }

    function sendFriendRequest(username) {
        axios.post("http://localhost:3001/api/send-friend-request", {
            username: username,
        });
    }

    return (
        <div>
            <h1 className="pages text-3xl text-gray-800 m-2 font-semibold">Add Friends</h1>
            <hr className="border-gray-400 border-1 m-2" />
            <div className="flex">
                <input
                    className="flex p-1 m-3 bg-gray-200 outline outline-1 outline-gray-300 rounded-lg w-9/12 text-gray-500"
                    type="text"
                    placeholder="Search Username"
                    onChange={(event) => {
                        setSearchResult(event.target.value);
                    }}
                />
                <button
                    className="block p-2 m-3 ml-px bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold"
                    onClick={() => {
                        getSearchResults(searchResult);
                    }}
                >
                    Search
                </button>
            </div>

            <div className="m-2 p-1">
                <ul>
                    {searchResultData.map((friend) => {
                        return (
                            <li
                                key={friend._id}
                                className="flex justify-between p-7 m-2 bg-gray-100 outline outline-1 outline-gray-500 rounded-lg"
                            >
                                <div>
                                    <p className="font-semibold text-md text-gray-500">
                                        {friend.username}
                                    </p>
                                    <p className="font-bold text-2xl text-sky-500">
                                        {friend.name}
                                    </p>
                                </div>
                                <button
                                    className="p-1 m-1 bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold"
                                    onClick={() => {
                                        sendFriendRequest(friend.username);
                                    }}
                                >
                                    Add
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AddFriends;
