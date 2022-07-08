import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { logoutHook } from "../hooks/logoutHook";

function Logout() {
    const [, , removeCookie] = useCookies();

    useEffect(() => {
        removeCookie("username");
        removeCookie("token");
        logoutHook.redirectToLogout();
    }, [removeCookie])
}

export default Logout;