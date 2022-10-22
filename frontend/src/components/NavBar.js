import { Link, useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import { NavBarOptions } from './NavBarOptions';
import './NavBar.css';
import Hamburger from 'hamburger-react'
import { ImArrowLeft2 } from 'react-icons/im'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();


    // function to handle clicking the hamburger menu icon, or any item/anywhere on the hamburger menu.
    // Function will reverse the state of the isOpen state property, indicating whether the menu is open
    const handleMenuClick = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
            <div>
                <Link to="#" id="top-bar-hamburger-menu" onClick={handleMenuClick} className="menu-icon" >
                    <Hamburger toggled={isOpen} />
                </Link>

                <div className="absolute top-3.5 left-5 scale-150 text-white">
                    <ImArrowLeft2 id="top-bar-back-arrow" className="hidden" onClick={() => navigate(-1)}/>
                </div>
            </div>

            <nav className={isOpen ? "nav-bar active" : "nav-bar"}>
                {/* the ternary operator above, is used to conditionally include different classes depending on the value of this.state.isOpen,
             because we want different css when the menu is open vs closed. If the condition is truthy, "nav-bar active" classes will be included,
             otherwise "nav-bar" class will be included */}
                <ul className="menu mt-11 ml-5" onClick={handleMenuClick}>
                    {/* iterates over NavBarOptions and creates a clickable list element for each with the page title and icon.  */}
                    {NavBarOptions.map(item => {
                        return (
                            <li className="nav-bar-items" key={item.pageTitle}>
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

export default NavBar;
