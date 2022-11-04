import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import History from "./pages/History";
import Friends from "./pages/Friends";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AddFriends from "./pages/AddFriends";
import Registration from "./components/Form";
import "./pages/Pages.css";
import axios from "axios";
import ScheduleWorkout from "./pages/ScheduleWorkout";
import CreateWorkout from "./pages/CreateWorkout";
import Workouts from "./pages/Workouts";
import ViewWorkout from "./pages/ViewWorkout";
import LogWorkout from "./pages/LogWorkout";
import LogBodyStats from "./pages/LogBodyStats";

// Use cookies in requests
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <TopBar />
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/user/log-stats" element={<LogBodyStats />} />
          <Route
            exact
            path="/calendar/schedule-workout"
            element={<ScheduleWorkout />}
          />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/friends" element={<Friends />} />
          <Route exact path="/friends/add-friends" element={<AddFriends />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/workouts/create" element={<CreateWorkout />} />
          <Route exact path="/workouts" element={<Workouts />} />
          <Route exact path="/workout" element={<ViewWorkout />} />
          <Route exact path="/workout/log" element={<LogWorkout />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
