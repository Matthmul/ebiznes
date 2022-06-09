import axios from '../config/backendConfig';

function sendProducts(...cart) {
    console.log(cart)
    return axios.post("/cart", {items: cart}).then((res) =>{
        return res.data;
    });
}

export const cartHook = {
    sendProducts,
}
