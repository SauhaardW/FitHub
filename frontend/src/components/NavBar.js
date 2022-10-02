import { AiOutlineMenu } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import React from 'react';
import { NavBarOptions } from './NavBarOptions';
import './NavBar.css';
import Hamburger from 'hamburger-react'

class NavBar extends React.Component {
    state = {
        sideBarOpen: false,
    };

    handleMenuClick = () => {
        this.setState({ sideBarOpen: !this.state.sideBarOpen })
    }

    render() {
        return (
            <>
                <div >
                    <Link to="#" onClick={this.handleMenuClick} >
                        <AiOutlineMenu className="menu-icon" />
                    </Link>
                </div>

                <nav className={this.state.sideBarOpen ? "nav-bar active" : "nav-bar"}>
                    <ul className="menu" onClick={this.handleMenuClick}>
                        <li className="nav-bar-items">
                            <Link to="#">
                                <IoIosClose className="nav-bar-close" />
                            </Link>
                        </li>
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






// render() {
//     return (
//         <>
//             <div >
//                 <Link to="#" onClick={this.handleMenuClick} >
//                     <Hamburger className="menu-icon" />
//                 </Link>
//             </div>

//             <nav className={this.state.sideBarOpen ? "nav-bar active" : "nav-bar"}>
//                 <ul className="menu" onClick={this.handleMenuClick}>
//                     <li className="nav-bar-items">
//                         <Link to="#">
//                             <IoIosClose className="nav-bar-close" />
//                         </Link>
//                     </li>
//                     {NavBarOptions.map(item => {
//                         return (
//                             <li className="nav-bar-items">
//                                 <Link to={item.path} className={item.className}>
//                                     {item.icon}
//                                     <span className="nav-bar-page-title">{item.pageTitle}</span>
//                                 </Link>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </nav>
//         </>
//     );
// }