import axios from '../config/backendConfig';

async function fetchProducts() {
    const fullResponse = await axios.get('/product');
    const responseJson = fullResponse.data;
    return responseJson;
}

async function fetchProductsByCategory(category) {
    const fullResponse = await axios.get('/product/category/' + category);
    const responseJson = fullResponse.data;
    return responseJson;
}

export const productsHook = {
    fetchProducts,
    fetchProductsByCategory,
}