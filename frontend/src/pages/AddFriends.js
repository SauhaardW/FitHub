import React from "react";

function AddFriends() {
  return (
    <div>
      <h1 className="text-3xl text-gray-800 m-2 font-semibold">Add Friends</h1>
      <hr className="border-gray-400 border-1 m-2" />
      <div className="flex">
        <input
          className="flex p-1 m-3 bg-gray-200 outline outline-1 outline-gray-300 rounded-lg w-9/12 text-gray-500"
          type="text"
          placeholder="Search Username"
        />
        <button className="block p-2 m-3 ml-px bg-default-gradient outline outline-1 rounded-lg w-3/12 text-white font-semibold">
          Search
        </button>
      </div>
    </div>
  );
}

export default AddFriends;
