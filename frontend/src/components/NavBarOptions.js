import { AiFillHome } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
import { BiStats } from "react-icons/bi";

export const NavBarOptions = [
    {
        pageTitle: "Home",
        path: "/home",
        className: "nav-option",
        icon: <AiFillHome />,
    },
    {
        pageTitle: "Friends",
        path: "/friends",
        className: "nav-option",
        icon: <FaUserFriends />,
    },
    {
        pageTitle: "Workouts",
        path: "/workouts",
        className: "nav-option",
        icon: <BiDumbbell />,
    },
    {
        pageTitle: "History",
        path: "/history",
        className: "nav-option",
        icon: <BiStats />,
    },
    {
        pageTitle: "Calendar",
        path: "/calendar",
        className: "nav-option",
        icon: <BsFillCalendarFill />,
    },
    {
        pageTitle: "My Account",
        path: "/profile",
        className: "nav-option",
        icon: <IoMdPerson />,
    }
]