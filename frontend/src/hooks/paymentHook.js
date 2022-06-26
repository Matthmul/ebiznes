import axios from '../config/backendConfig';

function sendPayment(id, price) {
    return axios.post('/payment',  {creditCardTokenId: id, value: price}).then((res) =>{
        return res.data;
    });
}

export const paymentHook = {
    sendPayment,
}
