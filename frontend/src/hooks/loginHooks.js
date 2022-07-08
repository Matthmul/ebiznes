import axios from '../config/backendConfig';

const redirectToGitHubSSO = async () => {
    axios.get('/github/login-redirect', {
        withCredentials: true
    }).then((githubLoginURL) => {
        console.log(githubLoginURL.data);
        window.open(githubLoginURL.data, "_self");
    });
}

const redirectToGoogleSSO = async () => {
    axios.get("/google/login-redirect", {
        withCredentials: true
    }).then((googleLoginURL) => {
        console.log(googleLoginURL.data);
        window.open(googleLoginURL.data, "_self");
    });
}

const redirectToFacebookSSO = async () => {
    axios.get("/facebook/login-redirect", {
        withCredentials: true
    }).then((facebookLoginURL) => {
        console.log(facebookLoginURL.data);
        window.open(facebookLoginURL.data, "_self");
    });
}

const redirectToDiscordSSO = async () => {
    axios.get("/discord/login-redirect", {
        withCredentials: true
    }).then((discordLoginURL) => {
        console.log(discordLoginURL.data);
        window.open(discordLoginURL.data, "_self");
    });
}

export const loginHooks = {
    redirectToGitHubSSO,
    redirectToGoogleSSO,
    redirectToFacebookSSO,
    redirectToDiscordSSO
}
