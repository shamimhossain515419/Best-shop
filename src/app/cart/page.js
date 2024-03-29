"use client";



import CommonCart from "@/Component/CommonCart";
import { GlobalContext } from "@/contaxt";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

import { toast } from "react-toastify";

export default function Cart() {
     const {
          user,
          setCartItems,
          cartItems,
          pageLevelLoader,
          setPageLevelLoader,
          setComponentLevelLoader,
          componentLevelLoader,
     } = useContext(GlobalContext);

     async function extractAllCartItems() {
          setPageLevelLoader(true);
          
          const res = await getAllCartItems("650c777a29fb81fcf6804ef7");
       
          if (res.success) {
               const updatedData =
                    res.data && res.data.length
                         ? res.data.map((item) => ({
                              ...item,
                              productID: {
                                   ...item.productID,
                                   price:
                                        item.productID.onSale === "yes"
                                             ? parseInt(
                                                  (
                                                       item.productID.price -
                                                       item.productID.price * (item.productID.priceDrop / 100)
                                                  ).toFixed(2)
                                             )
                                             : item.productID.price,
                              },
                         }))
                         : [];
               setCartItems(updatedData);
               setPageLevelLoader(false);
               localStorage.setItem("cartItems", JSON.stringify(updatedData));
          }

         
     }

     useEffect(() => {
          if (user !== null) extractAllCartItems();
     }, [user]);

     async function handleDeleteCartItem(getCartItemID) {
          setComponentLevelLoader({ loading: true, id: getCartItemID });
          const res = await deleteFromCart(getCartItemID);

          if (res.success) {
               setComponentLevelLoader({ loading: false, id: "" });
               toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });

               extractAllCartItems();
          } else {
               toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
               setComponentLevelLoader({ loading: false, id: getCartItemID });
          }
     }

     if (pageLevelLoader) {
          return (
               <div className="w-full min-h-screen flex justify-center items-center">
                    <PulseLoader
                         color={"#000000"}
                         loading={pageLevelLoader}
                         size={30}
                         data-testid="loader"
                    />
                    <h1> loading...</h1>
               </div>
          );
     }

     return (
          <CommonCart
               componentLevelLoader={componentLevelLoader}
               handleDeleteCartItem={handleDeleteCartItem}
               cartItems={cartItems}
          />
     );
}
