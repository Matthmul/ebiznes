import axios from '../config/backendConfig';

async function fetchSales() {
    const fullResponse = await axios.get('/sale');
    const responseJson = fullResponse.data;
    console.log(responseJson);
    return responseJson;
}

export const salesHook = {
    fetchSales,
}
