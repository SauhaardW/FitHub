import React, { Fragment, useEffect } from "react";
import "./Pages.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { friend } from "./../strings";
import { addfriend } from "./../strings";
import { schedule } from "./../strings";
const Friends = () => {
  const [data, setData] = useState([]);

  function getfriendsData() {
    const url = "http://localhost:3001/api/current-user"
    axios.get(url).then((res) => {
        setData(res.data.data.friends);
    });
  }

  useEffect(() => {
    getfriendsData();
  }, []);

  const onScheduleClicked = () => {
    console.log("Sucessfully clicked");
  };

  return (
    <Fragment>
      <div>
        <div className="flex justify-between px-4">
          <div className="text-4xl font-semibold">{friend}</div>
          <Link
            to="/friends/add-friends"
            className="bg-blue-500 p-6 mb-4 ml-3 py-3 text-white rounded-md"
          >
            {addfriend}
          </Link>
        </div>

        <hr
          className="ml-5 mr-5"
          style={{
            borderColor: "black",
          }}
        />

        <ul className="m-5 grid grid-justify-center">
          {data === undefined ? <div key="None" className=" text-black font-bold text-3xl">No friends to display</div> : data.map((friend) => {
            return (
              <li key={friend} className="px-4">
                <div
                  key={friend}
                  className="m-1 p-5 grid grid-cols-2 bg-gray-300 rounded-md"
                >
                  {friend}
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full"
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
