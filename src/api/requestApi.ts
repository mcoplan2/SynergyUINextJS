import { AuthenticationResponse } from "../types/User";
import { updateApi } from "../utils/API";
import { getUserById } from "./userApi";

export async function getAllRequests(appUser: AuthenticationResponse, selectedLetter?: string, selectedSearch?: string) {
    const { token } = appUser; // Assuming appUser has these properties

    let query = '';
    if (selectedLetter) {
        query += `letter=${selectedLetter}`;
    }
    if (selectedSearch) {
        query += (query ? '&' : '') + `query=${selectedSearch}`;
    }

    try {
        const tokenAPI = updateApi(token);
        const res = await tokenAPI.get(`/requests/filter${query ? `?${query}` : ''}`);
        return res.data; // Return the data for further use
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error; // Rethrow the error for handling in the calling component
    }
}

export async function getApprovedRequests(appUser: AuthenticationResponse) {
    const { username, token } = appUser; // Destructure appUser to get username and token

    try {
        const userId = await getUserById(username); // Assuming this function is defined and imported
        const tokenAPI = updateApi(token);
        const res = await tokenAPI.get(`/payments/userid/${userId}/paystatus/FULLY_PAID`);
        return res.data; // Return the data for further use
    } catch (error) {
        console.error('Error fetching approved requests:', error);
        throw error; // Rethrow the error for handling in the calling component
    }
}

export async function getNumberOfRequests(appUser: AuthenticationResponse) {
    const { username, token } = appUser;

    try {
        const userId = await getUserById(username); // Assuming this function is defined and imported
        const tokenAPI = updateApi(token);
        const res = await tokenAPI.get(`/requests/user/${userId}/type/OPEN`);
        return res.data; // Return the number of requests for further use
    } catch (error) {
        console.error('Error fetching number of requests:', error);
        throw error; // Rethrow the error for handling in the calling component
    }
}

export async function getRequestById(appUser: AuthenticationResponse, requestId: number) {
    const { username, token } = appUser;

    try {
        const userId = await getUserById(username); // Assuming this function is defined and imported
        const tokenAPI = updateApi(token);
        const res = await tokenAPI.get(`/requests/${requestId}`);
        return res.data; // Return the number of requests for further use
    } catch (error) {
        console.error('Error fetching number of requests:', error);
        throw error; // Rethrow the error for handling in the calling component
    }
}