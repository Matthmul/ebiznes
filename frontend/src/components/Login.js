import '../componentsStyles/Login.scss';
import { React, useEffect } from "react";
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton, DiscordLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";
import Typography from '@mui/material/Typography';
import { useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login(props) {
    const [searchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (searchParams.get("username")) {
            setCookie("username", searchParams.get("username"))
            setCookie("token", searchParams.get("token"))
            props.setIsLoggedIn(true)
        }
    }, [searchParams, setCookie, props])

    return (
        !props.isLoggedIn ?
            <div className='login'>
                <Typography variant="h4" className='tittle'>Wybierz sposób logowania</Typography>
                <div className="button">
                    <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

                    <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />

                    <FacebookLoginButton onClick={loginHooks.redirectToFacebookSSO} />

                    <DiscordLoginButton onClick={loginHooks.redirectToDiscordSSO} />
                </div>
            </div>
            :
            <div className='login'>
                <Typography variant="h4" className='tittle'>Zalogowano jako {cookies.username}</Typography>
            </div>
    );
}

export default Login;