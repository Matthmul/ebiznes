import axios from '../config/backendConfig';

async function fetchProducts() {
    const fullResponse = await axios.get('/product');
    return fullResponse.data;
}

async function fetchProductsByCategory(category) {
    const fullResponse = await axios.get('/product/category/' + category);
    return fullResponse.data;
}

export const productsHook = {
    fetchProducts,
    fetchProductsByCategory,
}