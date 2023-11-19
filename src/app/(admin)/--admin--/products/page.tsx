import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import ProductsTable from './components/productsTable'

const getProducts = async () => {
   dbConnect()
   return await Product.find()
}

export const metadata = {
   title: 'تیرورق | پنل ادمین | محصولات',
}

const AdminProducts = async () => {
   const products = (await getProducts()).reverse()

   return (
      <div className='md:mx-auto mx-6 max-w-screen-lg space-y-10 my-16 relative'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  فروشگاه
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='font-semibold'>محصولات</h5>
            </Breadcrumbs>

            <Link href='/--admin--/products/new'>
               <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
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
