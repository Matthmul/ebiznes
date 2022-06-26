import axios from '../config/backendConfig';

const redirectToLogout = () => {
    axios.get('/logout').then((logoutURL) => {
        console.log(logoutURL.data);
        window.open(logoutURL.data, "_self");
    });
}

export const logoutHook = {
    redirectToLogout
}
