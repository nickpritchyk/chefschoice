'use client';

import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {

    const [bookSection, setBookSection] = useState(false)
    const [successIcon, setSuccessIcon] = useState(null)
    const [recipes, setRecipes] = useState(null)

    const contextValue = { bookSection, setBookSection, successIcon, setSuccessIcon, recipes, setRecipes }

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => useContext(StoreContext); //import this context for state variable access