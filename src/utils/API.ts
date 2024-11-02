import axios, { AxiosInstance } from 'axios';

// Define the base URL for your API
const BASE_API_URL: string = "http://localhost:8080";

// Create a default Axios instance for public API calls
let API: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials: true,
    },
});

// Function to create an Axios instance with authorization
export function updateApi(token: string): AxiosInstance {
    API = axios.create({
        baseURL: BASE_API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
    });
    return API;
}

// Export the default API instance
export default API;