import React from 'react';
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";

function Login() {
    return (
        <div style={{ margin: '20% 30%' }}>
            <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

            <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />
        </div>

    );
}

export default Login;