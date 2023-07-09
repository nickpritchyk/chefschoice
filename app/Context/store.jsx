'use client';

import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
    const [bookSection, setBookSection] = useState(false)

    const contextValue = { bookSection }

    return(
        <StoreContext.Provider value={contextValue}></StoreContext.Provider>
    )

}