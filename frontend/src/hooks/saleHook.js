import axios from '../config/backendConfig';

async function fetchSales() {
    const fullResponse = await axios.get('/sale');
    return fullResponse.data;
}

export const salesHook = {
    fetchSales,
}
