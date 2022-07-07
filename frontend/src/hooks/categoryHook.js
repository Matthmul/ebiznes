import axios from '../config/backendConfig';

async function fetchCategories() {
    const fullResponse = await axios.get('/category');
    return fullResponse.data;
}

export const categoryHook = {
    fetchCategories,
}