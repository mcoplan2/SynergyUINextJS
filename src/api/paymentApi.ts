import { Payment } from '../types/Payment';
import { AuthenticationResponse } from '../types/User';
import { updateApi } from '../utils/API';
import { getUserById } from './userApi'; // Adjust the path for your user API function

export async function getUnpaidPaymentsByUser(appUser: AuthenticationResponse) {
  const { username, token } = appUser;

  try {
    const userId = await getUserById(username);
    const tokenAPI = updateApi(token);
    const res = await tokenAPI.get(`/payments/userid/${userId}/paystatus/UNPAID`);
    return res.data; // Return the fetched payments
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error; // Rethrow the error for further handling
  }
}

export async function getFullyPaidPaymentsByUser(appUser: AuthenticationResponse) {
    const { username, token } = appUser;
  
    try {
      const userId = await getUserById(username);
      const tokenAPI = updateApi(token);
      const res = await tokenAPI.get(`/payments/userid/${userId}/paystatus/FULLY_PAID`);
      return res.data; // Return the fetched approved requests
    } catch (error) {
      console.error('Error fetching approved requests:', error);
      throw error; // Rethrow the error for further handling
    }
}

export async function getAllPayments(appUser: AuthenticationResponse) {
    const { token } = appUser;
  
    try {
      const tokenAPI = updateApi(token);
      const res = await tokenAPI.get("/payments/paystatus/FULLY_PAID");
      return res.data; // Return the fetched payments
    } catch (error) {
      console.error('Error fetching all payments:', error);
      throw error; // Rethrow the error for further handling
    }
}

export async function getEveryPayment(appUser: AuthenticationResponse) {
  const { token } = appUser;

  try {
    const tokenAPI = updateApi(token);
    const res = await tokenAPI.get("/payments");
    return res.data; // Return the fetched payments
  } catch (error) {
    console.error('Error fetching all payments:', error);
    throw error; // Rethrow the error for further handling
  }
}

export async function updatePayment(appUser: AuthenticationResponse, payment: Payment) {
    const { username, token } = appUser;

    try {
        const userId = await getUserById(username);
        const tokenAPI = updateApi(token);
        const response = await tokenAPI.post('payments/update', {
            paymentId: payment.paymentId,
            amount: payment.amount,
            medicationId: {
                id: payment.medicationId.id
            },
            payStatus: "FULLY_PAID",
            user: {
                userId: userId
            },
            reqId: {
                id: payment.reqId.requestId
            },
        });
        return response.data; // Return the response data for further use
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error; // Rethrow the error for further handling
    }
}
