'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);
export default function GlobalState({ children }) {
     const [showNavModal, setShowNavModal] = useState(false);
     const [isAuthUser, setIsAuthUser] = useState(null);
     const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
     const [pageLevelLoader, setPageLevelLoader] = useState(false);
     const [componentLevelLoader, setComponentLevelLoader] = useState({
          loading: false,
          id: "",
     });
     const [user, setUser] = useState(null);

     useEffect(() => {
          if (Cookies.get("token") !== undefined) {
               setIsAuthUser(true);
               const userData = JSON.parse(localStorage.getItem("user")) || {};
               setUser(userData);
          } else {
               setIsAuthUser(false);
               setUser({}); //unauthenticated user
          }
     }, [Cookies]);


     return (<GlobalContext.Provider
          value={{
               showNavModal,
               setShowNavModal,
               isAuthUser,
               setIsAuthUser,
               user, setUser,
               pageLevelLoader,
               setPageLevelLoader,
               componentLevelLoader,
               setComponentLevelLoader,
               currentUpdatedProduct,
                setCurrentUpdatedProduct
          }}


     >  {children} </GlobalContext.Provider>)

}


