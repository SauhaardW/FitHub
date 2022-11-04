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
  const [friendRequests, setFriendRequests] = useState([]);

  function getFriendsData() {
    const url = "http://localhost:3001/api/current-user"
    axios.get(url).then((res) => {
      setFriends(res.data.data.friends);
    });
  }

  const getFriendRequests = () => {
    const url = "http://localhost:3001/api/get-friend-requests"
    axios.get(url).then((res) => {
      setFriendRequests(res.data.friendRequests);
    });
  }

  const acceptFriendRequest = (username) => {
    const url = "http://localhost:3001/api/accept-friend-request"
    axios.post(url, {
      username: username
    }).then((res) => {
      getFriendRequests()
      getFriendsData()
    });
  }

  useEffect(() => {
    getFriendsData();
    getFriendRequests();
  }, []);

  const navigate = useNavigate();
  const onScheduleClicked = () => {
    //to do
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

          <hr className="ml-5 mr-5 border-black"/>

          <div className="scrollable-div">
            <ul className="grid grid-justify-center">
              {(friends === undefined || friends === null || friends.length === 0) ? <div key="None" className="text-black text-sm p-2">No friends to display!</div> : friends.map((friend) => {
                return (
                    <li key={friend}>
                      <div
                          key={friend}
                          className="m-1 p-4 bg-gray-200 rounded-md flex justify-between items-center shadow-md md:filter-none"
                      >
                        <div className="font-bold text-sm">
                          {friend}
                        </div>

                        <button
                            className="px-2 py-1 bg-default-gradient rounded-lg w-30 text-white text-sm"
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
        </div>
        <button
            className="px-2 py-1 bg-default-gradient rounded-lg w-30 text-white text-sm"
            onClick={() => {someFunction()}}
        >
          Log workout
        </button>
        <button
            className="px-2 py-1 bg-default-gradient rounded-lg w-30 text-white text-sm"
            onClick={() => {getHistories()}}
        >
          Get
        </button>

        <div className="mt-16">
          <div className="text-4xl font-semibold px-4">Friend Requests</div>
          <hr className="ml-4 mr-4 border-black"/>

          <div className="scrollable-div">
            <ul className="grid grid-justify-center">
              {(friendRequests === undefined || friendRequests === null || friendRequests.length === 0) ? <div key="None" className="text-black text-sm p-2">No friend requests to display!</div> : friendRequests.map((request) => {
                return (
                    <li key={request}>
                      <div
                          key={request}
                          className="m-1 p-4 bg-gray-200 rounded-md flex justify-between items-center shadow-md md:filter-none"
                      >
                        <div className="font-bold text-sm">
                          {request}
                        </div>


                        <button
                            className="px-2 py-1 bg-default-gradient rounded-lg w-30 text-white text-sm"
                            onClick={() => {acceptFriendRequest(request)}}
                        >
                          Accept
                        </button>
                      </div>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Fragment>
  );
};
export default Friends;