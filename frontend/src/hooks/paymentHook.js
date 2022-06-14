import axios from '../config/backendConfig';

function sendPayment(payment) {
    console.log(payment)

    return axios.post("/payment", payment).then((res) =>{
        return res.data;
    });
}

export const paymentHook = {
    sendPayment,
}
