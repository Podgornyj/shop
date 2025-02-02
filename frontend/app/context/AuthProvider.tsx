'use client'
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {


    const checkAuth = async () => {
        const res = await fetch('http://localhost:3001/api/auth/me', { credentials: 'include' });
        if (res.status !== 200) {
            return null;
        }
        return res.json();
    }

    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: checkAuth,
        retry: false,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    return <AuthContext.Provider value={{ data, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}