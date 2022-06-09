import axios from 'axios';   

export default axios.create({
  baseURL: `http://localhost:9000`,

  headers: {
    "Access-Control-Allow-Origin": "http://localhost:9000",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
});