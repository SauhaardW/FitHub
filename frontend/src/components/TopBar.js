import React from 'react';
import './TopBar.css';
import { fitHubLabel } from './../strings'

class TopBar extends React.Component {
    render() {
        return (
            <div className="top-bar">
                <div className="flex justify-center">
                    <span className="app-title">
                         {fitHubLabel}
                     </span>
                </div>
            </div>
        );
    }
}

export default TopBar;