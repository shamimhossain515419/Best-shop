
import CommonDetails from '@/Component/CommonListing/CommonDetails';
import { productById } from '@/services/product';
import React from 'react';

const DetailsPage = async ({ params }) => {

     const prama = params.datails;
    
     const productDetailsData = await productById(params.datails);
 return (
          <CommonDetails item={productDetailsData && productDetailsData.data} />
         
     );

}
export default DetailsPage;