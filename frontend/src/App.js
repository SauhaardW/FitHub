import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import History from "./pages/History";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import AddFriends from "./pages/AddFriends";
import "./pages/Pages.css";

const App = () => {
  return (
    <Router>
      <TopBar />
      <div className="pages">
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/friends" element={<Friends />} />
          <Route exact path="/friends/add-friends" element={<AddFriends />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
