import axios from '../config/backendConfig';

async function fetchProducts() {
    const fullResponse = await axios.get('/product');
    const responseJson = fullResponse.data;
    console.log(responseJson);
    return responseJson;
}

export const productsHook = {
    fetchProducts,
}