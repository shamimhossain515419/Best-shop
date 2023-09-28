'use client'

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);
export const initialCheckoutFormData = {
     shippingAddress: {},
     paymentMethod: "",
     totalPrice: 0,
     isPaid: false,
     paidAt: new Date(),
     isProcessing: true,
};

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
     "/admin-view",
     "/admin-view/add-product",
     "/admin-view/all-products",
];

export default function GlobalState({ children }) {
     const [showNavModal, setShowNavModal] = useState(false);
     const [isAuthUser, setIsAuthUser] = useState(null);
     const [showCartModal, setShowCartModal] = useState(false);
     const [cartItems, setCartItems] = useState([]);
     const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
     const [pageLevelLoader, setPageLevelLoader] = useState(false);
     const [componentLevelLoader, setComponentLevelLoader] = useState({
          loading: false,
          id: "",
     });
     const [checkoutFormData, setCheckoutFormData] = useState(
          initialCheckoutFormData
     );
     const router = useRouter();
     const pathName = usePathname()
     const [addresses, setAddresses] = useState([]);
     const [addressFormData, setAddressFormData] = useState({
          fullName: "",
          city: "",
          country: "",
          postalCode: "",
          address: "",
     });




     const [allOrdersForUser, setAllOrdersForUser] = useState([]);
     const [orderDetails, setOrderDetails] = useState(null);
     const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

     const [user, setUser] = useState(null);

     useEffect(() => {
          if (Cookies.get("token") !== undefined) {
               setIsAuthUser(true);
               const userData = JSON.parse(localStorage.getItem("user")) || {};
               const CartData = JSON.parse(localStorage.getItem("cartItems")) || {};

               setCartItems(CartData)
               setUser(userData);
          } else {
               setIsAuthUser(false);
               setUser({}); //unauthenticated user
          }
     }, [Cookies]);


     useEffect(() => {
          if (
               pathName !== "/register" &&
               !pathName.includes("product") &&
               pathName !== "/" &&
               user &&
               Object.keys(user).length === 0 &&
               protectedRoutes.includes(pathName) > -1
          )
               router.push("/login");
     }, [user, pathName]);

     useEffect(() => {
          if (
               user !== null &&
               user &&
               Object.keys(user).length > 0 &&
               user?.role !== "admin" &&
               protectedAdminRoutes.indexOf(pathName) > -1
          )
               router.push("/unauthorized-page");
     }, [user, pathName]);

     return (<GlobalContext.Provider
          value={{
               showNavModal,
               setShowNavModal,
               isAuthUser,
               setIsAuthUser,
               user, setUser,
               pageLevelLoader,
               checkoutFormData,
               setCheckoutFormData,
               setPageLevelLoader,
               componentLevelLoader,
               setComponentLevelLoader,
               currentUpdatedProduct,
               setCurrentUpdatedProduct,
               showCartModal,
               setShowCartModal,
               cartItems, setCartItems,
               addresses, setAddresses,
               addressFormData,
               setAddressFormData,
               allOrdersForAllUsers, setAllOrdersForAllUsers,
               orderDetails, setOrderDetails,
               allOrdersForUser, setAllOrdersForUser
          }}


     >  {children} </GlobalContext.Provider>)

}


