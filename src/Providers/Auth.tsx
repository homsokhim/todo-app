import React , {createContext, useState, FC, ReactNode} from 'react'
import {User} from 'firebase/auth';

type AuthContextType = {
    user: User | null,
    setUser: ((user: User) => void) | null,
    signOut: (() => void) | null;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: null,
    signOut: null,
});

type props = {
    children: ReactNode;
};

export const AuthProvider: FC<props> = ({children}) => {

    const getFromStorage = () => {
        const userFormStorage = sessionStorage.getItem('user');
        if(userFormStorage)
        {
            return JSON.parse(userFormStorage);
        }
        return null;
    };

    const [user, setUser] = useState<User | null> (getFromStorage());

    const setToStorage = (user: User) => {
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    const RemveFromStorage = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        setUser: setToStorage,
        signOut: RemveFromStorage,

    };

    return(
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )

}