"use client"
import InputComponent from '@/Component/FormElements/InputComponent';
import SelectComponent from '@/Component/FormElements/SelectComponent';
import TileComponent from '@/Component/FormElements/TileComponent';
import ComponentLevelLoader from '@/Component/Loader/componentlevel';
import Notification from '@/Component/Notification';
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from '@/utils';
import React, { useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
const initialFormData = {
     name: "",
     price: 0,
     description: "",
     category: "men",
     sizes: [],
     deliveryInfo: "",
     onSale: "no",
     imageUrl: "",
     priceDrop: 0,
};

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addNewProduct, updateAProduct } from '@/services/product';
import { toast } from 'react-toastify';
import { GlobalContext } from '@/contaxt';
import { useRouter } from 'next/navigation';
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
     const timeStamp = Date.now();
     const randomStringValue = Math.random().toString(36).substring(2, 12);

     return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
     const getFileName = createUniqueFileName(file);
     const storageReference = ref(storage, `bestshop/${getFileName}`);
     const uploadImage = uploadBytesResumable(storageReference, file);

     return new Promise((resolve, reject) => {
          uploadImage.on(
               "state_changed",
               (snapshot) => { },
               (error) => {
                    console.log(error);
                    reject(error);
               },
               () => {
                    getDownloadURL(uploadImage.snapshot.ref)
                         .then((downloadUrl) => resolve(downloadUrl))
                         .catch((error) => reject(error));
               }
          );
     });
}

const AddNewProduct = () => {
     const router = useRouter();

     const { componentLevelLoader,
          setComponentLevelLoader, currentUpdatedProduct,
          setCurrentUpdatedProduct } = useContext(GlobalContext)
     const [formData, setFormData] = useState(initialFormData);


     useEffect(() => {
          if (currentUpdatedProduct !== null) {
               setFormData(currentUpdatedProduct)
          }
     }, [currentUpdatedProduct])

     const handleImage = async (event) => {
          const extractImageUrl = await helperForUPloadingImageToFirebase(
               event.target.files[0]
          );

          if (extractImageUrl !== "") {
               setFormData({
                    ...formData,
                    imageUrl: extractImageUrl,
               });
          }

     }
     const handleTileClick = (getCurrentItem) => {
          let cpySizes = [...formData.sizes];
          const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

          if (index === -1) {
               cpySizes.push(getCurrentItem);
          } else {
               cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
          }

          setFormData({
               ...formData,
               sizes: cpySizes,
          });
     }

     const handleAddProduct = async () => {
          setComponentLevelLoader({
               loading: true,
               id: "",
          })
          const res =
               currentUpdatedProduct !== null
                    ? await updateAProduct(formData)
                    : await addNewProduct(formData);

          if (res?.success) {
               setComponentLevelLoader({
                    loading: false,
                    id: "",
               })
               toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
               setTimeout(() => {
                    router.push("/admin-view/all-products");
               }, 1000);
          } else {
               setComponentLevelLoader({
                    loading: true,
                    id: "",
               })
          }
     }


     return (
          <div>
               <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
                    <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                         <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                              <input
                                   accept="image/*"
                                   max="1000000"
                                   type="file"
                                   onChange={handleImage}
                              />

                              <div className="flex gap-2 flex-col">
                                   <label>Available sizes</label>
                                   <TileComponent
                                        selected={formData.sizes}
                                        onClick={handleTileClick}
                                        data={AvailableSizes}
                                   />
                              </div>
                              {adminAddProductformControls.map((controlItem) =>
                                   controlItem.componentType === "input" ? (
                                        <InputComponent
                                             type={controlItem.type}
                                             key={controlItem.id}
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
                                   ) : controlItem.componentType === "select" ? (
                                        <SelectComponent
                                             label={controlItem.label}
                                             options={controlItem.options}
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
                                   onClick={handleAddProduct}
                                   className="inline-flex w-full items-center justify-center bg-[#27895C] px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                              >
                                   {componentLevelLoader && componentLevelLoader.loading ? (
                                        <ComponentLevelLoader
                                             text={currentUpdatedProduct !== null ? 'Updating Product' : "Adding Product"}
                                             color={"#ffffff"}
                                             loading={componentLevelLoader && componentLevelLoader.loading}
                                        />
                                   ) : currentUpdatedProduct !== null ? (
                                        "Update Product"
                                   ) : (
                                        "Add Product"
                                   )}
                              </button>
                         </div>
                    </div>
                    <Notification />
               </div>
          </div>
     );
};

export default AddNewProduct;