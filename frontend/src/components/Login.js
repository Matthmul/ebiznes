import React from 'react';
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton, DiscordLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";

function Login() {
    return (
        <div style={{ margin: '20% 30%' }}>
            <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

            <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />

            <FacebookLoginButton onClick={loginHooks.redirectToFacebookSSO} />

            <DiscordLoginButton onClick={loginHooks.redirectToDiscordSSO} />
        </div>

    );
}

export default Login;