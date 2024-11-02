import { AuthenticationResponse } from "../types/User";
import { updateApi } from "../utils/API";

export async function addMedication(appUser: AuthenticationResponse, data: any) {
    const { token } = appUser;
    const tokenAPI = updateApi(token);

    try {
        await tokenAPI.post('/medications', {
            name: data.MedicationName,
            stock: data.AmountInStock,
            price: data.PricePerUnit,
            type: data.Type,
            status: data.Status,
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
    }
}