import React, { useState } from "react";
import "./Pages.css";
import { scheduleWorkout } from "./../strings";
import axios from "axios";

const ScheduleWorkout = () => {
  const [workout, setWorkout] = useState("");
  const [withFriend, setWithFriend] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [searchResultData, setSearchResultData] = useState([]);

  function scheduleWithFriend(event) {
    if (event.target.value === "Yes") {
      setWithFriend(true);
    } else if (event.target.value === "No") {
      setWithFriend(false);
    }
  }

  function getSearchResult(query) {
    const url = "http://localhost:3001/api/current-user";
    axios.get(url).then((res) => {
      setSearchResultData(res.data.data.friends);
    });
  }

  return (
    <div className="page-title pages">
      <div className="flex justify-between px-4">
        <div className="text-4xl font-semibold">{scheduleWorkout}</div>
      </div>
      <hr
        className="ml-5 mr-5"
        style={{
          borderColor: "black",
        }}
      />
      <div className="block mx-5 mt-2">
        <p className="text-xl font-semibold mt-2 mb-1">Choose a workout</p>
        <select
          //   onChange={(event) => setWorkout({ workout: event.target.value })}
          onChange={(event) => setWorkout(event.target.value)}
          className="flex px-4 py-4 outline outline-1 outline-gray-500 rounded-xl bg-gray-200 w-full"
        >
          <option select disabled>
            Please select an option:
          </option>
        </select>
      </div>
      <hr
        className="ml-5 mr-5 mt-8"
        style={{
          borderColor: "black",
        }}
      />
      <div>
        <div className="flex mx-5 mt-3 mb-3 justify-between">
          <h1 className="text-xl font-semibold my-2">Date</h1>
          <input
            className="px-3 rounded-l"
            type="date"
            onChange={(event) => event.target.value} //Need to send data to backend
          />
        </div>
        <hr
          className="ml-5 mr-5"
          style={{
            borderColor: "black",
          }}
        />
      </div>
      <div>
        <div className="flex mx-5 mt-3 mb-3 justify-between">
          <h1 className="text-xl font-semibold my-2">Time</h1>
          <input
            className="px-3 rounded-l"
            type="time"
            onChange={(event) => event.target.value} //Need to send data to backend
          />
        </div>
        <hr
          className="ml-5 mr-5"
          style={{
            borderColor: "black",
          }}
        />
      </div>
      <div>
        <div className="flex mx-5 mt-3 mb-3 justify-between">
          <h1 className="text-xl font-semibold my-2">Workout with a friend:</h1>
          <select
            onChange={scheduleWithFriend}
            className=" px-2 py-2 rounded-xl bg-gray-200 w-3/12"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <hr
          className="ml-5 mr-5"
          style={{
            borderColor: "black",
          }}
        />
        {withFriend && (
          <div>
            <div className="flex">
              <input
                className="flex p-2 m-5 bg-gray-200 outline outline-1 outline-gray-300 rounded-lg w-8/12 text-gray-500"
                type="text"
                placeholder="Search Username"
                onChange={(event) => setSearchResult(event.target.value)}
              />
              <button
                className="block p-auto mr-5 my-5 ml-px bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold"
                onClick={() => getSearchResult(searchResult)}
              >
                Search
              </button>
            </div>
            <div>
              {searchResultData
                .filter((friend) =>
                  friend.toLowerCase().includes(searchResult.toLowerCase())
                )
                .map((friend) => {
                  return (
                    <li
                      key={friend}
                      className="flex justify-between px-7 py-5 mx-5 my-3 bg-gray-100 outline outline-1 outline-gray-500 rounded-lg"
                    >
                      <div>
                        <p className="font-bold text-2xl text-sky-500">
                          {friend}
                        </p>
                      </div>
                      <button className="p-1 m-1 bg-default-gradient outline outline-1 rounded-lg w-4/12 text-white font-semibold">
                        Schedule
                      </button>
                    </li>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleWorkout;
