import axios from '../config/backendConfig';

async function fetchCategories() {
    const fullResponse = await axios.get('/category');
    const responseJson = fullResponse.data;
    return responseJson;
}

export const categoryHook = {
    fetchCategories,
}