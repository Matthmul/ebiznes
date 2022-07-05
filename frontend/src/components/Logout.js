import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { logoutHook } from "../hooks/logoutHook";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [, , removeCookie] = useCookies();
    let navigate = useNavigate();

    useEffect(() => {
        removeCookie("username");
        removeCookie("email");
        logoutHook.redirectToLogout();
    }, [removeCookie])

    return (navigate("/"));
}

export default Logout;