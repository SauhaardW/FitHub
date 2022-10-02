import { Link } from "react-router-dom";
import React from 'react';
import { NavBarOptions } from './NavBarOptions';
import './NavBar.css';
import Hamburger from 'hamburger-react'

class NavBar extends React.Component {
    state = {
        isOpen: false,
    };

    // function to handle clicking the hamburger menu icon, or any item/anywhere on the hamburger menu.
    // Function will reverse the state of the isOpen state property, indicating whether the menu is open
    handleMenuClick = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <>
                <div>
                    <Link to="#" onClick={this.handleMenuClick} className="menu-icon" >
                        <Hamburger toggled={this.state.isOpen} />
                    </Link>
                </div>

                <nav className={this.state.isOpen ? "nav-bar active" : "nav-bar"}>
                    {/* the ternary operator above, is used to conditionally include different classes depending on the value of this.state.isOpen, 
                because we want different css when the menu is open vs closed. If the condition is truthy, "nav-bar active" classes will be included, 
                otherwise "nav-bar" class will be included */}
                    <ul className="menu" onClick={this.handleMenuClick}>
                        {/* iterates over NavBarOptions and creates a clickable list element for each with the page title and icon.  */}
                        {NavBarOptions.map(item => {
                            return (
                                <li className="nav-bar-items">
                                    <Link to={item.path} className={item.className}>
                                        {item.icon}
                                        <span className="nav-bar-page-title">{item.pageTitle}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </>
        );
    }
}

export default NavBar;