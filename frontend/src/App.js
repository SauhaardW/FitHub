// import {React, useState} from "react"
// import axios from "axios"
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import History from "./pages/History";
import Friends from "./pages/Friends";
import './pages/Pages.css';



class App extends Component {
    render() {
        return (
            <Router>
                <TopBar />
                <div className="pages">
                    <Routes>
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/calendar" element={<Calendar />} />
                        <Route exact path="/history" element={<History />} />
                        <Route exact path="/friends" element={<Friends />} />
                        <Route exact path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router >
        );
    }
}

export default App;






// const App = () => {
//   const [input, setInput] = useState({
//     exercise_name: '',
//     exercise_instructions: ''
//   })

//   function handleChange(event){
//     const {name, value} = event.target;

//     setInput(prevInput => {
//         return {
//             ...prevInput,
//             [name]: value

//         }
//     })
//   }

//   function handleClick(event){
//     event.preventDefault();
//     const newExercise = {
//         name: input.exercise_name,
//         instructions: input.exercise_instructions
//     }

//     axios.post('http://localhost:3001/api/exercise', newExercise)
//   }

//   return (
//     <div className='container'>
//         <form>
//             <div className='form-group'>
//                 <input onChange={handleChange} name="exercise_name" placeholder="Exercise name" value={input.exercise_name} autoComplete="off" className="form-control"></input>
//             </div>

//             <div className='form-group'>
//                 <textarea onChange={handleChange} name="exercise_instructions" placeholder="Exercise instructions" value={input.exercise_instructions} autoComplete="off" className="form-control"></textarea>
//             </div>

//             <button onClick={handleClick} className="btn btn-lg btn-info">Add workout</button>
//         </form>
//     </div>
//     )
// }


// export default App
