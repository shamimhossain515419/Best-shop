

import CommonListing from '@/Component/CommonListing';
import { getAllAdminProducts } from '@/services/product';
import Image from 'next/image';
import React from 'react';

const AllProduct = async () => {
const allAdminProducts = await getAllAdminProducts()
  
return (
          <div>

               <CommonListing data={allAdminProducts && allAdminProducts.data} />
          </div>
     );
};

export default AllProduct;