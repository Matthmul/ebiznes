import '../componentsStyles/LoginOrGuest.scss';
import { React } from "react";
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton, DiscordLoginButton } from "react-social-login-buttons";
import { loginHooks } from "../hooks/loginHooks";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function LoginOrGuest() {
    let navigate = useNavigate();

    return (
        <div className='loginOrGuest'>
            <div className='login'>
                <Typography variant="h4" className='tittle'>Zaloguj się</Typography>
                <div className="login-buttons">
                    <GoogleLoginButton onClick={loginHooks.redirectToGoogleSSO} />

                    <GithubLoginButton onClick={loginHooks.redirectToGitHubSSO} />

                    <FacebookLoginButton onClick={loginHooks.redirectToFacebookSSO} />

                    <DiscordLoginButton onClick={loginHooks.redirectToDiscordSSO} />
                </div>
            </div>
            <div className='guest'>
                <Typography variant="h4" className='tittle'>Kup jako gość</Typography>
                <Button className="button" variant='contained' onClick={() => navigate("/delivery")}>
                    Zapłać
                </Button>
            </div>
        </div>
    );
}

export default LoginOrGuest;