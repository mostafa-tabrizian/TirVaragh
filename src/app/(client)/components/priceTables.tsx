'use client'

import { IFactory } from '@/models/factory'
import { IProduct } from '@/models/product'
import useSWR from 'swr'
import Image from 'next/image'

const PriceTables = () => {
   // @ts-ignore
   const fetcher = (...args) => fetch(...args).then((res) => res.json())

   const {
      data: products,
      isLoading: isLoadingProducts,
      error: errorProducts,
   }: {
      data: IProduct[]
      isLoading: boolean
      error: unknown
   } = useSWR('/api/client/products', fetcher)

   const {
      data: factories,
      isLoading: isLoadingFactories,
      error: errorFactories,
   }: {
      data: IFactory[]
      isLoading: boolean
      error: unknown
   } = useSWR('/api/client/factories', fetcher)

   return (
      <div className='mx-4 md:mx-auto'>
         <div>
            <div className='flex items-center gap-1'>
               <span className='w-8 border-b-2 border-red-700'></span>
               <span className='text-sm font-bold text-red-700'>به روز و رقابتی</span>
            </div>
            <div>
               <h2 className='yekanExtraBold mt-2 text-4xl'>جدول قیمت ورق</h2>
            </div>
         </div>
         <div className='mt-11 grid grid-cols-2 gap-3'>
            <div className='flex items-center justify-between rounded-lg bg-white px-4 py-2'>
               <span className='text-base'>مرتب سازی</span>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='10'
                  viewBox='0 0 14 8'
                  fill='none'
               >
                  <path
                     d='M1 1L7.20296 7.5L13.4059 1'
                     stroke='#061730'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  />
               </svg>
            </div>
            <div className='flex items-center justify-between rounded-lg bg-white px-4 py-2'>
               <span className='text-base'>انتخاب کارخانه</span>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='10'
                  viewBox='0 0 14 8'
                  fill='none'
               >
                  <path
                     d='M1 1L7.20296 7.5L13.4059 1'
                     stroke='#061730'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  />
               </svg>
            </div>
         </div>

         {isLoadingProducts || isLoadingFactories ? (
            <h4>loading</h4>
         ) : (
            <>
               {factories.map((factory, idx) => {
                  return (
                     <div key={idx} className='mt-3'>
                        <div>
                           <div className='flex items-center gap-10 rounded-xl bg-white px-2 py-4'>
                              <Image
                                 src={`https://tabrizian.storage.iran.liara.space/tir-varagh/factories/${factory.logo}`}
                                 alt={factory.name}
                                 width={49}
                                 height={49}
                                 className='object-cover'
                              />
                              <div>
                                 <h3 className='text-red-900'>قیمت ورق سیاه {factory.name}</h3>
                                 <div className='mt-1 flex items-center gap-1'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='13'
                                       height='12'
                                       viewBox='0 0 10 9'
                                       fill='none'
                                    >
                                       <path
                                          d='M5 2.41412V4.53534H7.4'
                                          stroke='#747474'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                       />
                                       <path
                                          d='M5 8.07071C7.20912 8.07071 9 6.48786 9 4.53535C9 2.58283 7.20912 1 5 1C2.79086 1 1 2.58283 1 4.53535C1 6.48786 2.79086 8.07071 5 8.07071Z'
                                          stroke='#747474'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                       />
                                    </svg>
                                    <span className='text-slate-500'>آخرین بروزرسانی :</span>
                                    <span className='text-red-700'>
                                       {new Date(factory.updatedAt)
                                          .toLocaleDateString('fa', {
                                             year: 'numeric',
                                             month: 'numeric',
                                             day: 'numeric',
                                             hour: 'numeric',
                                             minute: 'numeric',
                                             second: 'numeric',
                                             hour12: false,
                                             calendar: 'persian',
                                          })
                                          .replace(',', ' - ')}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className='mt-3 rounded-xl bg-white'>
                              <table className='w-full border-separate px-2'>
                                 <tr className=''>
                                    <th className='yekan p-2 font-bold'>
                                       عنوان{' '}
                                       <span className='text-xs'>
                                          (برای جزئیات بیشتر کلیک کنید)
                                       </span>
                                    </th>
                                    <th className='yekan p-2 font-bold'>
                                       قیمت <span className='text-xs'>(تومان)</span>
                                    </th>
                                    <th className='yekan p-2 font-bold'>نوسان</th>
                                    <th className='yekan p-2 font-bold'>نمودار</th>
                                 </tr>

                                 {products.map((product, idx) => {
                                    if (product.factory !== factory._id) return

                                    const price = product.price[product.price.length - 1]
                                    const previousPrice = product.price[product.price.length - 2]
                                    let fluctuation

                                    if (previousPrice) {
                                       fluctuation = price.value - previousPrice.value
                                    }

                                    return (
                                       <tr key={idx}>
                                          <td className='yekan p-2 font-bold'>{product.title}</td>
                                          <td className='yekan p-2 text-center font-bold'>
                                             {/* @ts-ignore */}
                                             {parseInt(price.value).toLocaleString('fa')}
                                          </td>
                                          <td className='yekan m-auto p-2 text-center font-bold'>
                                             {fluctuation && fluctuation > 0 ? (
                                                <div className='flex items-center gap-x-1 text-green-600'>
                                                   {/* @ts-ignore */}
                                                   {parseInt(fluctuation).toLocaleString('fa')}
                                                   <svg
                                                      className='h-6 w-6'
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
                                                      <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                                      <path d='M18 15l-6-6l-6 6h12' />
                                                   </svg>
                                                </div>
                                             ) : (
                                                ''
                                             )}

                                             {fluctuation && fluctuation < 0 ? (
                                                <div className='flex items-center gap-x-1 text-red-500'>
                                                   {/* @ts-ignore */}
                                                   {parseInt(fluctuation).toLocaleString('fa')}
                                                   <svg
                                                      className='h-6 w-6'
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
                                                      <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                                      <path
                                                         d='M18 15l-6-6l-6 6h12'
                                                         transform='rotate(180 12 12)'
                                                      />
                                                   </svg>
                                                </div>
                                             ) : (
                                                ''
                                             )}

                                             {!fluctuation ? (
                                                <span className='h-5 w-6 text-slate-600'>---</span>
                                             ) : (
                                                ''
                                             )}
                                          </td>
                                          <td className=''>
                                             <svg
                                                className='mx-auto h-6 w-6 text-black'
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
                                                <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                                <line x1='4' y1='19' x2='20' y2='19' />{' '}
                                                <polyline points='4 15 8 9 12 11 16 6 20 10' />
                                             </svg>
                                          </td>
                                       </tr>
                                    )
                                 })}
                              </table>
                           </div>
                        </div>
                     </div>
                  )
               })}
            </>
         )}
      </div>
   )
}

export default PriceTables
