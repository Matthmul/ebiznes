import axios from '../config/backendConfig';

const redirectToGitHubSSO = async () => {
    axios.get('/github/login-redirect').then((githubLoginURL) => {
        console.log(githubLoginURL.data);
        window.open(githubLoginURL.data, "_self");
    });
}

const redirectToGoogleSSO = async () => {
    // axios.get("/google/login-redirect").then((googleLoginURL) => {
    //     console.log(googleLoginURL.data);
    //     window.open(googleLoginURL.data, "_self");
    // });
}

export const loginHooks = {
    redirectToGitHubSSO,
    redirectToGoogleSSO
}
