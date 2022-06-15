import axios from 'axios';   

export default axios.create({
  baseURL: `https://the-shop-backend.azurewebsites.net/`,

  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081, https://the-shop-backend.azurewebsites.net:8081',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }
});