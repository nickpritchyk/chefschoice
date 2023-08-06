'use client';

import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const [bookSection, setBookSection] = useState(false)
    const [successIcon, setSuccessIcon] = useState(null)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function getRecipes() {
            await fetch('http://localhost:3000/api/addrecipe', {cache: "no-store"})
                .then(data => {
                    if (data.ok) {
                        return data.json();
                      }
                      throw new Error('Recipes not fetched, error');
                    })
                    .then((data) => {
                        setRecipes(data)
                    })
                .then()
        }
        getRecipes()
    })

    const contextValue = { bookSection, setBookSection, successIcon, setSuccessIcon, recipes, setRecipes }

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => useContext(StoreContext); //import this context for state variable access