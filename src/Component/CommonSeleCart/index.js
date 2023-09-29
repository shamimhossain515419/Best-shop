import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CommonSaleCart = ({ image1, image2, image3 }) => {
     return (
          <div className=' grid md:grid-cols-3 gap-0 '>
               <Link href={'/product/listing/all-products'} className=' h-[600px]'>
                    <Image height={500} src={image1} alt='banner'></Image>

               </Link>
               <Link href={'/product/listing/all-products'} className=' h-[600px]'>
                    <Image height={500} src={image2} alt='banner'></Image>

               </Link>
               <Link href={'/product/listing/all-products'} className=' h-[600px]'>
                    <Image height={500} src={image3} alt='banner'></Image>

               </Link>

          </div>
     );
};

export default CommonSaleCart;