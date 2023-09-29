import CommonListing from '@/Component/CommonListing';
import { getAllAdminProducts } from '@/services/product';
import React from 'react';

const AllProductPage = async () => {
     const allAdminProducts = await getAllAdminProducts()
     
     return (
          <div>
               <CommonListing data={allAdminProducts && allAdminProducts.data} />
          </div>
     );
};

export default AllProductPage;