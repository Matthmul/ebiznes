import '../componentsStyles/Navbar.scss';
import * as React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutHook } from "../hooks/logoutHook";

function UserGreeting(props) {
    return <dir className="brand-name">Witamy {props.name}!</dir>;
}

function LoginLink() {
    return (
        <Link to="/login">Login</Link>
    );
}

function LogoutLink() {
    return (
        <Link onClick={logoutHook.redirectToLogout}>Logout</Link>
    );
}

function Navbar(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [name] = useState(
        document.cookie.split(';').some((item) => item.trim().startsWith('username=')));

    let linkLog;
    let greetings;
    if (props.isLoggedIn) {
        linkLog = <LogoutLink />;
        greetings = <UserGreeting name={name} />;
    } else {
        linkLog = <LoginLink />;
    }

    return (
        <nav className="navigation">
            <Link to="/" className="brand-name">
                The Shop
            </Link>
            {greetings}
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {linkLog}
                    </li>
                    <li>
                        <Link to="/cart">Koszyk</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;