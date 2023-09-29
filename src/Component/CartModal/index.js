'use client'

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/contaxt";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import ComponentLevelLoader from "../Loader/componentlevel";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";


const CartModal = () => {

     const { showCartModal, setShowCartModal, setComponentLevelLoader, user, cartItems, setCartItems,
          componentLevelLoader
     } = useContext(GlobalContext);
     const router = useRouter();

     async function extractAllCartItems() {
          const res = await getAllCartItems(user?._id);
      
          if (res.success) {

               const updatedData = res.data && res.data.length
                    ? res.data.map((item) => ({


                         ...item, productID: {
                              ...item.productID,
                              price:
                                   item.productID.onSale === "yes"
                                        ? parseInt(
                                             (item.productID.price -
                                                  item.productID.price * (item.productID.priceDrop / 100)
                                             ).toFixed(2)
                                        )
                                        : item.productID.price,
                         },
                    }))
                    : [];


               setCartItems(updatedData);
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


     return (
          <div>
               <CommonModal
                    showButtons={true}
                    show={showCartModal}
                    setShow={setShowCartModal}
                    mainContent={
                         cartItems && cartItems.length ? (
                              <ul role="list" className="-my-6 divide-y divide-gray-300">
                                   {cartItems.map((cartItem, index) => (
                                        <li key={index} className="flex py-6">
                                             <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                  <Image
                                                       width={200}
                                                       height={200}
                                                       src={
                                                            cartItem &&
                                                            cartItem.productID &&
                                                            cartItem.productID.imageUrl
                                                       }
                                                       alt="Cart Item"
                                                       className="h-full w-full object-cover object-center"
                                                  />
                                             </div>
                                             <div className="ml-4 flex flex-1 flex-col">
                                                  <div>
                                                       <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                 <a>
                                                                      {cartItem &&
                                                                           cartItem.productID &&
                                                                           cartItem.productID.name.slice(0, 40)}
                                                                 </a>
                                                            </h3>
                                                       </div>
                                                       <p className="mt-1 text-sm text-gray-600">
                                                            $
                                                            {cartItem &&
                                                                 cartItem.productID &&
                                                                 cartItem.productID.price}
                                                       </p>
                                                  </div>
                                                  <div className="flex flex-1 items-end justify-between text-sm">
                                                       <button
                                                            type="button"
                                                            className="font-medium text-yellow-600 sm:order-2"
                                                            onClick={() => handleDeleteCartItem(cartItem._id)}
                                                       >
                                                            {componentLevelLoader &&
                                                                 componentLevelLoader.loading &&
                                                                 componentLevelLoader.id === cartItem._id ? (
                                                                 <ComponentLevelLoader
                                                                      text={"Removing"}
                                                                      color={"#000000"}
                                                                      loading={
                                                                           componentLevelLoader && componentLevelLoader.loading
                                                                      }
                                                                 />
                                                            ) : (
                                                                 "Remove"
                                                            )}
                                                       </button>
                                                  </div>
                                             </div>
                                        </li>
                                   ))}
                              </ul>
                         ) : null
                    }
                    buttonComponent={
                         <Fragment>
                              <button
                                   type="button"
                                   onClick={() => {
                                        router.push("/cart");
                                        setShowCartModal(false);
                                   }}
                                   className="mt-1.5 w-full inline-block bg-[#27895C] text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                              >
                                   Go To Cart
                              </button>
                              <button
                                   disabled={cartItems && cartItems.length === 0}
                                   type="button"
                                   onClick={() => {
                                        router.push("/checkout");
                                        setShowCartModal(false);
                                   }}
                                   className="mt-1.5 w-full inline-block bg-[#27895C] text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
                              >
                                   Checkout
                              </button>
                              <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                                   <button type="button" className="font-medium text-grey">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                   </button>
                              </div>
                         </Fragment>
                    }
               ></CommonModal>
          </div>
     );
};

export default CartModal;