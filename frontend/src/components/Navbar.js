import '../componentsStyles/Navbar.scss';
import * as React from 'react';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function UserGreeting(props) {
    return <Link to="/" className="brand-name">Witamy {props.name}!</Link>;
}

function LoginLink() {
    return (
        <Link to="/login">Login</Link>
    );
}

function LogoutLink() {
    return (
        <Link to="/logout">Logout</Link>
    );
}

function Navbar(props) {
    const [cookies] = useCookies(['username']);

    let linkLog;
    let greetings;
    if (props.isLoggedIn) {
        linkLog = <LogoutLink />;
        greetings = <UserGreeting name={cookies.username} />;
    } else {
        linkLog = <LoginLink />;
    }

    return (
        <nav className="navigation">
            <Link to="/" className="brand-name">
                The Shop
            </Link>
            {greetings}
            <div
                className="navigation-menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        props.isLoggedIn ?
                            <li>
                                <Link to="/orderHistory">Historia</Link>
                            </li>
                            :
                            <></>
                    }
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