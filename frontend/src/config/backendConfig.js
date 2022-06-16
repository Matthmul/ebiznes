import axios from 'axios';   

export default axios.create({
  baseURL: `https://the-shop-backend.azurewebsites.net/`,
  // baseURL: `http://localhost:9000/`,

  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Origin': 'https://the-shop-backend.azurewebsites.net:8082',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }
});