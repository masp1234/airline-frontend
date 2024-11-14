import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    currentUser: any;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
        }
        , []);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            throw new Error('Login failed');
        }
    };

    const signup = async (email: string, password: string) => {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
        } else {
            throw new Error('Signup failed');
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setCurrentUser(null);
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
        
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};