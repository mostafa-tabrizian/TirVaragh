import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import Link from 'next/link'

import ProductsTable from './components/productsTable'

const getProducts = async () => {
   dbConnect()
   return await Product.find()
}

export const revalidate = 0

export const metadata = {
   title: 'پارس شیت | پنل ادمین | محصولات',
   robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
         index: false,
         follow: false,
      },
   },
}

const AdminProducts = async () => {
   const products = (await getProducts()).reverse()

   return (
      <>
         <Link href='/--admin--/products/new'>
            <button className='fixed bottom-24 z-10 right-5 rounded-full bg-[#eb6b56] p-3'>
               <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='1'
                     d='M12 4v16m8-8H4'
                  />
               </svg>
            </button>
         </Link>
         <ProductsTable products={JSON.parse(JSON.stringify(products))} />
      </>
   )
}

export default AdminProducts
