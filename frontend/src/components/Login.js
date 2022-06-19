import React from 'react';
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";

function Login() {
    return (
        <div style={{ margin: '20% 30%' }}>
            <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

            <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />

            <FacebookLoginButton onClick={loginHooks.redirectToFacebookSSO} />
        </div>

    );
}

export default Login;