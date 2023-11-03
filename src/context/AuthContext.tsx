import React, { useEffect, useState, createContext, useContext } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User
} from 'firebase/auth';
import firebase from '../firebase/config';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

const auth = getAuth(firebase);

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => useContext(AuthContext);


export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
