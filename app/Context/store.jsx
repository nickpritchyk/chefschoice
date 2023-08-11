'use client';

import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const router = useRouter()
    const path = usePathname()
    const [bookSection, setBookSection] = useState(false)
    const [successIcon, setSuccessIcon] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [singleRecipe, setSingleRecipe] = useState([])

    useEffect(() => {
            fetch('http://localhost:3000/api/addrecipe', {cache: "no-store"})
                .then(data => {
                    if (data.ok) {
                        return data.json();
                      }
                      throw new Error('Recipes not fetched, error');
                    })
                    .then((data) => {
                        setRecipes(data)
                    })
    }, [])

    const contextValue = { bookSection, setBookSection, successIcon, setSuccessIcon, recipes, setRecipes, singleRecipe, setSingleRecipe }

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => useContext(StoreContext); //import this context for state variable access