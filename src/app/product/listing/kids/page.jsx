import CommonListing from '@/Component/CommonListing';
import { productByCategory } from '@/services/product';
import React from 'react';

const KidsPage =async () => {
     const getAllProducts = await productByCategory("kids");

     return <CommonListing data={getAllProducts && getAllProducts.data} />;
}

export default KidsPage;