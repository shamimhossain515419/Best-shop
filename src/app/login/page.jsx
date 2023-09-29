"use client"
import InputComponent from '@/Component/FormElements/InputComponent';
import ComponentLevelLoader from '@/Component/Loader/componentlevel';
import Notification from '@/Component/Notification';
import { GlobalContext } from '@/contaxt';
import { login } from '@/services/login';
import { loginFormControls } from '@/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const initialFormdata = {
     email: "",
     password: "",
};

const LoginPage = () => {
     const [formData, setFormData] = useState(initialFormdata);


     const { isAuthUser,
          setIsAuthUser, componentLevelLoader,
          setComponentLevelLoader, user, setUser } = useContext(GlobalContext)

     const isFormValid = () => {
          return formData && formData.email &&
               formData.email.trim() !== "" &&
               formData.password &&
               formData.password.trim() !== ""
               ? true
               : false;
     }

     const handleLogin = async () => {
          setComponentLevelLoader({
               loading: true,
               id: "",
          })
          const res = await login(formData);
          if (res.success == true) {
               toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });

               setComponentLevelLoader({
                    loading: false,
                    id: "",
               })
               setIsAuthUser(true);
               setUser(res?.finalData?.user);
               Cookies.set("token", res?.finalData?.token);
               localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
          } else {
               toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
               setIsAuthUser(false);
               setComponentLevelLoader({
                    loading: false,
                    id: "",
               })
          }


     }

     const router = useRouter();

     useEffect(() => {
          if (isAuthUser) router.push("/");
     }, [isAuthUser]);

     return (
          <div className="bg-white  text-black relative">
               <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                    <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                         <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                                   <p className="w-full text-4xl font-medium text-center font-serif">
                                        Login
                                   </p>
                                   <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        {loginFormControls.map((controlItem) =>
                                             controlItem.componentType === "input" ? (
                                                  <InputComponent
                                                       key={controlItem.id}
                                                       type={controlItem.type}
                                                       placeholder={controlItem.placeholder}
                                                       label={controlItem.label}
                                                       value={formData[controlItem.id]}
                                                       onChange={(event) => {
                                                            setFormData({
                                                                 ...formData,
                                                                 [controlItem.id]: event.target.value,
                                                            });
                                                       }}
                                                  />
                                             ) : null
                                        )}
                                        <button
                                             className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-[#27895C] px-6 py-4 text-lg 
                         text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                         "
                                             disabled={!isFormValid()}
                                             onClick={handleLogin}
                                        >
                                             {componentLevelLoader && componentLevelLoader.loading ? (
                                                  <ComponentLevelLoader
                                                       text={"Logging In"}
                                                       color={"#ffffff"}
                                                       loading={
                                                            componentLevelLoader && componentLevelLoader.loading
                                                       }
                                                  />
                                             ) : (
                                                  "Login"
                                             )}
                                        </button>
                                        <div className="flex flex-col gap-2">
                                             <p>New to website ?</p>
                                             <button
                                                  className="inline-flex w-full items-center justify-center bg-[#27895C] px-6 py-4 text-lg 
                         text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                         "
                                                  onClick={() => router.push("/register")}
                                             >
                                                  Register
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <Notification></Notification>
          </div>

     );
};

export default LoginPage; <h1> Login pae </h1>