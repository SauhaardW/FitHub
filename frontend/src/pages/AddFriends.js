import React, { useState } from "react";
import axios from "axios";

function AddFriends() {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState(false);
  const [data, setData] = useState([]);

  function eventHandler(query) {
    setFound(false);

    axios
      .get("http://localhost:3001/api/user", {
        params: {
          name: query,
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      });

    setFound(true);
  }

  return (
    <div>
      <h1 className="text-3xl text-gray-800 m-2 font-semibold">Add Friends</h1>
      <hr className="border-gray-400 border-1 m-2" />
      <div className="flex">
        <input
          className="flex p-1 m-3 bg-gray-200 outline outline-1 outline-gray-300 rounded-lg w-9/12 text-gray-500"
          type="text"
          placeholder="Search Username"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button
          className="block p-2 m-3 ml-px bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold"
          onClick={() => {
            eventHandler(search);
          }}
        >
          Search
        </button>
      </div>

      <div className="m-4 p-4">
        <ul>
          {data.map((friend) => {
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
                <button className="p-1 m-1 bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold">
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
