import React from "react";
import {fakeAuthProvider} from "./Auth.Services";
import {AuthContextType} from "./types";

export const AuthContext = React.createContext<AuthContextType>({
    user: fakeAuthProvider.user(),
    signIn: (newUsername: string, newPassword: string, callback: VoidFunction) => {
        return fakeAuthProvider.signIn(newUsername, newPassword, () => {
            callback()
        })
    },
    signOut: (callback: VoidFunction) => {
        return fakeAuthProvider.signOut(() => {
            callback()
        })
    },
    isLogged: () => {
        return fakeAuthProvider.isLogged()
    }
})