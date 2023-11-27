import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import ProductsTable from './components/productsTable'

const getProducts = async () => {
   dbConnect()
   return await Product.find()
}

export const revalidate = 0

export const metadata = {
   title: 'تیرورق | پنل ادمین | محصولات',
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
      <div className='relative mx-6 my-16 max-w-screen-lg space-y-10 md:mx-auto'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  تیرورق
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='font-semibold'>محصولات</h5>
            </Breadcrumbs>

            <Link href='/--admin--/products/new'>
               <button className='fixed bottom-24 right-5 rounded-full bg-red-400 p-3'>
                  <svg
                     className='h-6 w-6 text-white'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 4v16m8-8H4'
                     />
                  </svg>
               </button>
            </Link>

            <ProductsTable products={JSON.parse(JSON.stringify(products))} />
         </>
      </div>
   )
}

export default AdminProducts
