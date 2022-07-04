import '../componentsStyles/Login.scss';
import React from 'react';
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton, DiscordLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";
import Typography from '@mui/material/Typography';

function Login() {
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