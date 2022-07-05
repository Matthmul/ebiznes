import axios from '../config/backendConfig';

async function fetchCategories() {
    const fullResponse = await axios.get('/category');
    const responseJson = fullResponse.data;
    console.log(responseJson);
    return responseJson;
}

export const categoryHook = {
    fetchCategories,
}