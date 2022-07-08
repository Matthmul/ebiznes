import axios from '../config/backendConfig';

function sendProducts(token, paymentId, ...cart) {
    console.log(cart)
    return axios.post('/cart/' + token, {
        paymentId: paymentId, items: cart
    }).then((res) => {
        return res.data;
    });
}

async function fetchCartHistoryByUser(token) {
    let fullResponse = null;
    let responseJson = null;
    try {
        fullResponse = await axios.get('/cart/user/' + token);
        responseJson = fullResponse.data;
        return responseJson;
    } catch (err) {
        console.error(err.response.status);
    }
}

export const cartHook = {
    sendProducts,
    fetchCartHistoryByUser,
}
