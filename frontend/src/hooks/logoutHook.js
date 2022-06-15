import axios from '../config/backendConfig';

const redirectToLogout = async () => {
    await axios.get('/logout');
}

export const logoutHook = {
    redirectToLogout
}
