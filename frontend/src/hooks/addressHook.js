import axios from '../config/backendConfig';

function sendAddress(address) {
    return axios.post('/address',  address).then((res) =>{
        return res.data;
    });
}

export const addressHook = {
    sendAddress,
}