import axios from '../config/backendConfig';

function sendProducts(paymentId, ...cart) {
    console.log(cart)
    return axios.post("/cart", {paymentId: paymentId, items: cart}).then((res) =>{
        return res.data;
    });
}

export const cartHook = {
    sendProducts,
}
