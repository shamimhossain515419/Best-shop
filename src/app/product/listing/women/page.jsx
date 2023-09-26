import CommonListing from '@/Component/CommonListing';
import { productByCategory } from '@/services/product';
import React from 'react';

const WomanPage = async() => {
     const getAllProducts = await productByCategory("women");

     return <CommonListing data={getAllProducts && getAllProducts.data} />;
};

export default WomanPage;