import { CreateMedication } from "../types/Medication";
import { AuthenticationResponse } from "../types/User";
import { updateApi } from "../utils/API";

export async function addMedication(appUser: AuthenticationResponse, data: CreateMedication) {
    const { token } = appUser;
    const tokenAPI = updateApi(token);

    try {
        await tokenAPI.post('/medications', {
            name: data.name,
            stock: data.stock,
            price: data.price,
            type: data.type,
            status: data.status,
        });
    } catch (error) {
        console.error('Error adding medication:', error);
        throw error; // Rethrow the error for further handling
    }
}

export async function getAllMedication(appUser: AuthenticationResponse, selectedLetter: string | null, selectedSearch: string | null) {
    const { token } = appUser;
    const tokenAPI = updateApi(token);

    let query = '';
    if (selectedLetter) {
        query += `letter=${selectedLetter}`;
    }
    if (selectedSearch) {
        query += (query ? '&' : '') + `query=${selectedSearch}`;
    }
    try {
        const res = await tokenAPI.get(`/medications/filter${query ? `?${query}` : ''}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllMedicationNoFilter(appUser: AuthenticationResponse) {
    const { token } = appUser;
    const tokenAPI = updateApi(token);

   
    try {
        const res = await tokenAPI.get(`/medications`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}