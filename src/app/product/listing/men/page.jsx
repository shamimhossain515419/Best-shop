import CommonListing from '@/Component/CommonListing';
import { productByCategory } from '@/services/product';
import React from 'react';

const ManPage = async () => {
     const getAllProducts = await productByCategory("men");

     return <CommonListing data={getAllProducts && getAllProducts.data} />;
};

export default ManPage;