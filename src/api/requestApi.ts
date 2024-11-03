import { CreateRequest, ReqId } from "../types/Request";
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

export const createRequest = async (appUser: AuthenticationResponse, data: CreateRequest) => {
    const { username, token } = appUser;
    const userId = await getUserById(username);
    const tokenAPI = updateApi(token);

    try {
        const response = await tokenAPI.post('requests', {
            dosageCount: data.dosageCount,
            dosageFreq: data.dosageFreq,
            med: {
                id: data.med.id,
            },
            user: {
                userId: `${userId}`,
            },
        });
        return response.data; // Return the response data for further use
    } catch (error) {
        console.error('Error creating medication request:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const approveRequest = async (appUser: AuthenticationResponse, data: ReqId) => {
    const { username, token } = appUser;
    const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            const response = await tokenAPI.post('requests/approve/'+`${userId}`, {
                id: data.id,
                requestType: data.requestType,
                dosageCount: data.dosageCount,
                dosageFreq: data.dosageFreq,
                user: {
                    userId: userId,
                },
                med: {
                    id: data.med.id
                },
            })
            return response.data;
        } catch (error) {
            console.error('Error creating medication request:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
};

export const denyRequest = async (appUser: AuthenticationResponse, data: ReqId) => {
    const { username, token } = appUser;
    const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            const response = await tokenAPI.post('requests/deny/'+`${userId}`, {
                id: data.id,
                requestType: data.requestType,
                dosageCount: data.dosageCount,
                dosageFreq: data.dosageFreq,
                user: {
                    userId: userId,
                },
                med: {
                    id: data.med.id
                },
            })
            return response.data;
        } catch (error) {
            console.error('Error creating medication request:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
};