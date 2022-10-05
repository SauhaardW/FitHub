import React, { useState } from "react";
import MOCK_DATA from "./MOCK_DATA.json";

function AddFriends() {
  const [foundData, setFound] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  function eventHandler(data, search) {
    setFound(false);
    const dataArray = [];

    data.filter((val) => {
      if (search == "") {
        setData([]);
      } else if (val.username.toLowerCase().includes(search.toLowerCase())) {
        dataArray.push(val);
      }
    });

    setData(dataArray);
    setFound(true);
  }

  function addUsername(username) {
    console.log("Added " + username);
  }

  return (
    <div>
      <h1 className="text-3xl text-gray-800 m-2 font-semibold">Add Friends</h1>
      <hr className="border-gray-400 border-1 m-2" />
      <div className="flex">
        <input
          className="flex p-1 m-2 bg-gray-200 outline outline-1 outline-gray-300 rounded-lg w-10/12 text-gray-500"
          type="input"
          placeholder="Search Username"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button
          className="block p-2 m-2 bg-default-gradient outline outline-1 rounded-lg w-2/12 text-white font-semibold"
          onClick={() => {
            eventHandler(MOCK_DATA, search);
          }}
        >
          Search
        </button>
      </div>
      {foundData && (
        <div>
          <div>
            <ul>
              {data.map((friend) => {
                return (
                  <li
                    className="flex justify-between p-7 m-2 bg-gray-100 outline outline-1 outline-gray-500 rounded-lg"
                    key={friend.id}
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
                      onClick={() => {
                        addUsername(friend.username);
                      }}
                      className="p-1 m-2 bg-default-gradient outline outline-1 rounded-lg w-2/12 text-white font-semibold"
                    >
                      Add
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddFriends;
