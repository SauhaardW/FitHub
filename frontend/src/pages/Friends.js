import React, { Fragment, useEffect } from "react";
import "./Pages.css";
import axios from "axios";
import { useState } from "react";
import { friend } from "./../strings";
import { schedule } from "./../strings";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriendsData();
    getFriendRequests();
  }, []);

  function getFriendsData() {
    const url = "http://localhost:3001/api/current-user"
    axios.get(url).then((res) => {
      setFriends(res.data.data.friends);
    });
  }

  const getFriendRequests = () => {
    const url = "http://localhost:3001/api/get-friend-requests"
    axios.get(url).then((res) => {
    });
  }

  const navigate = useNavigate();

  const onScheduleClicked = () => {
    console.log("Sucessfully clicked");
  };

  return (
    <Fragment>
      <div className="pages">
        <div className="flex justify-between px-4">
          <div className="text-4xl font-semibold">{friend}</div>
          <AiOutlineUsergroupAdd className="w-10 h-10" onClick={()=>{
            navigate('/friends/add-friends');
          }}/>
        </div>

        <hr
          className="ml-5 mr-5"
          style={{
            borderColor: "black",
          }}
        />

        <ul className="m-5 grid grid-justify-center">
          {friends === undefined ? <div key="None" className=" text-black font-bold text-3xl">No friends to display</div> : friends.map((friend) => {
            return (
              <li key={friend} className="px-4">
                <div
                  key={friend}
                  className="m-1 p-5 bg-gray-200 rounded-md flex justify-between shadow-md md:filter-none"
                >
                  <div className="flex items-center font-bold text-lg">
                    {friend}
                  </div>
                  
                  <button
                    className="p-2 m-1 bg-default-gradient rounded-lg w-30 text-white font-semibold"
                    onClick={onScheduleClicked}
                  >
                    {schedule}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Friends;
