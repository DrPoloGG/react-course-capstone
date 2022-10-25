import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// provider -> component wrapper for the context
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsuscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsuscribe;
    },[])

    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}