import { Link } from "react-router-dom";
import React from 'react';
import { NavBarOptions } from './NavBarOptions';
import './NavBar.css';
import Hamburger from 'hamburger-react'

class NavBar extends React.Component {
    state = {
        isOpen: false,
    };

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
                    <ul className="menu" onClick={this.handleMenuClick}>
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