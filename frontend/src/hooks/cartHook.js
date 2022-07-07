import axios from '../config/backendConfig';

function sendProducts(paymentId, ...cart) {
    console.log(cart)
    return axios.post('/cart', { 
        paymentId: paymentId, items: cart 
    }, {
        withCredentials: true,
    }).then((res) => {
        return res.data;
    });
}

async function fetchCartHistoryByUser() {
    let fullResponse = null;
    let responseJson = null;
    try {
        fullResponse = await axios.get('/cart/user', {
            withCredentials: true
        });
        responseJson = fullResponse.data;
    } catch (err) {
        console.error(err.response.status);
    } finally {
        return responseJson;
    }
}

export const cartHook = {
    sendProducts,
    fetchCartHistoryByUser,
}
