import React from 'react';
import NavBar from './NavBar'
import './TopBar.css';
import { fitHubLabel } from './../strings'

class TopBar extends React.Component {
    render() {
        return (
            <div className="top-bar" id="top-bar">
                <div className="top-bar-content">
                    <NavBar />
                    <span className="app-title">
                         {fitHubLabel}
                     </span>
                </div>
            </div>
        );
    }
}

export default TopBar;