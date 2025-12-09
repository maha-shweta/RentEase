// Authentication Context for RentEase

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Landlord } from '@/services/landlord';

interface AuthState {
    landlord: Landlord | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (landlord: Landlord, token: string) => void;
    logout: () => void;
}

const AUTH_STORAGE_KEY = 'rentease_auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        landlord: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Load auth state from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setState({
                    landlord: parsed.landlord,
                    token: parsed.token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } catch {
                localStorage.removeItem(AUTH_STORAGE_KEY);
                setState(prev => ({ ...prev, isLoading: false }));
            }
        } else {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = (landlord: Landlord, token: string) => {
        const authData = { landlord, token };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
        setState({
            landlord,
            token,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setState({
            landlord: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext };
