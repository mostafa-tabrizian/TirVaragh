'use client'

import Link from 'next/link'
import Image from 'next/image'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IProduct } from '@/models/product'

const ProductsTable = ({ products }: { products: IProduct[] }) => {
   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'ردیف',
         width: 30,
         valueGetter: ({ value }) => {
            if (!value) value
            return value.toLocaleString('fa')
         },
      },
      {
         field: 'thumbnail',
         headerName: 'تصویر',
         width: 80,
         renderCell: ({ value }) => (
            <Link
               target='_blank'
               href={`https://tabrizian.storage.iran.liara.space/tirvaragh/products/${
                  value as string
               }`}
            >
               {value ? (
                  <Image
                     className='rounded-xl'
                     src={`https://tabrizian.storage.iran.liara.space/tirvaragh/products/${
                        value as string
                     }`}
                     alt={String(value)}
                     height={50}
                     width={50}
                     objectFit='cover'
                  />
               ) : (
                  ''
               )}
            </Link>
         ),
      },
      {
         field: 'active',
         headerName: 'فعال',
         width: 75,
         renderCell: ({ value }) =>
            value ? (
               <svg
                  className='h-5 w-5 text-green-700'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M9 12l2 2l4 -4' />
               </svg>
            ) : (
               <svg
                  className='h-5 w-5 text-rose-700'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M10 10l4 4m0 -4l-4 4' />
               </svg>
            ),
      },
      {
         field: 'inStock',
         headerName: 'موجود',
         width: 75,
         renderCell: ({ value }) =>
            value ? (
               <svg
                  className='h-5 w-5 text-green-700'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M9 12l2 2l4 -4' />
               </svg>
            ) : (
               <svg
                  className='h-5 w-5 text-rose-700'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M10 10l4 4m0 -4l-4 4' />
               </svg>
            ),
      },
      {
         field: 'name',
         headerName: 'عنوان',
         width: 300,
         renderCell: ({ value }) => (
            <Link href={`/--admin--/products/${(value as string).replaceAll(' ', '-')}`}>
               <span>{value}</span>
            </Link>
         ),
      },
      {
         field: 'price',
         headerName: 'قیمت',
         width: 100,
         valueGetter: ({ value }) => {
            if (!value) value
            return value.toLocaleString('fa')
         },
      },
      {
         field: 'discount',
         headerName: 'تخفیف',
         width: 100,
         valueGetter: ({ value }) => {
            if (!value) value
            return value.toLocaleString('fa')
         },
      },

      {
         field: 'createdAt',
         headerName: 'تاریخ ایجاد',
         width: 200,
      },
   ]

   const rows = products?.map((product, index) => {
      return {
         id: index,
         ...product,
      }
   })

   return (
      <div style={{ width: '100%' }} className='rtl'>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
               },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            density='comfortable'
         />
      </div>
   )
}

export default ProductsTable
