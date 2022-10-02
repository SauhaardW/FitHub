import React from 'react';
import NavBar from './NavBar'
import './TopBar.css';
import { fitHub } from './../strings'

class TopBar extends React.Component {
    render() {
        return (
            <>
                <div className="top-bar">
                    <div className="top-bar-content">
                        <NavBar />
                        <span className="app-title">
                            {fitHub}
                        </span>
                    </div>
                </div>


            </>
        );
    }
}

export default TopBar;