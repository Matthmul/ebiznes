import '../componentsStyles/Login.scss';
import React from 'react';
import { useEffect } from "react";
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton, DiscordLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";
import Typography from '@mui/material/Typography';
import { useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login() {
    const [searchParams] = useSearchParams();
    const [_cookies, setCookie] = useCookies();

    useEffect(() => {
        console.log(searchParams.get("username"));
        console.log(searchParams.get("email"));

        setCookie("username", searchParams.get("username"))
        setCookie("email", searchParams.get("email"));
    }, [])

    return (
        <div className='login'>
            <Typography variant="h4" className='tittle'>Wybierz sposób logowania</Typography>
            <div className="button">
                <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

                <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />

                <FacebookLoginButton onClick={loginHooks.redirectToFacebookSSO} />

                <DiscordLoginButton onClick={loginHooks.redirectToDiscordSSO} />
            </div>
        </div>
    );
}

export default Login;