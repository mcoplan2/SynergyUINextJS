import axios, { AxiosInstance } from 'axios';

// Define the base URL for your API
const BASE_API_URL: string = "https://synergypharmacy-api-latest.onrender.com";

// Create a default Axios instance for public API calls
let API: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Function to create an Axios instance with authorization
export function updateApi(token: string): AxiosInstance {
    API = axios.create({
        baseURL: BASE_API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return API;
}

// Export the default API instance
export default API;