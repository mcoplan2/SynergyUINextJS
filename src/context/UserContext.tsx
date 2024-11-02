import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthenticationResponse } from '../types/User';


// Define the context type
interface UserContextType {
    user: AuthenticationResponse | null;
    setUser: (user: AuthenticationResponse  | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// UserProvider component to wrap around the app
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthenticationResponse  | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
