
import { AuthenticationResponse, User } from '../types/User'; 
import API from '../utils/API';

export async function getUserById(username: string): Promise<number | undefined> {
    try {
        const res = await API.get<User>(`/users/username/${username}`);
        const { userId } = res.data;
        return userId;
    } catch (error) {
        console.error(error);
    }   
}


export async function login(user: User | null): Promise<AuthenticationResponse | null | undefined> {
    if (!user) return;

    const { username, password } = user;

    try {
        const response = await API.post<AuthenticationResponse>("/authenticate", { username, password });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
    }
}


export async function register(user: User | null): Promise<AuthenticationResponse | undefined> {
    if (!user) return;

    try {
        await API.post<AuthenticationResponse>('/users', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
        });
    } catch (error) {
        console.error('Registration failed:', error);
    }       
}