'use client'

import { IProduct } from '@/models/product'
import useSWR from 'swr'

const PriceTables = () => {
   // @ts-ignore
   const fetcher = (...args) => fetch(...args).then((res) => res.json())

   const {
      data: products,
      isLoading,
      error,
   }: { data: [IProduct]; isLoading: boolean; error: unknown } = useSWR(
      '/api/client/products',
      fetcher,
   )

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

         <div className='mt-3'>
            <div>
               <div className='flex items-center gap-10 rounded-xl bg-white px-2 py-4'>
                  <div>
                     <svg
                        width='49'
                        height='50'
                        viewBox='0 0 49 50'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <rect y='0.202026' width='49' height='49' fill='url(#pattern0)' />
                        <defs>
                           <pattern
                              id='pattern0'
                              patternContentUnits='objectBoundingBox'
                              width='1'
                              height='1'
                           >
                              <use xlinkHref='#image0_28_668' transform='scale(0.01)' />
                           </pattern>
                           <image
                              id='image0_28_668'
                              width='100'
                              height='100'
                              xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwOTYxMDM1RjUxRTExRUM4MTk2QTMxMkNCNDZGRjVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwOTYxMDM2RjUxRTExRUM4MTk2QTMxMkNCNDZGRjVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzA5NjEwMzNGNTFFMTFFQzgxOTZBMzEyQ0I0NkZGNUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzA5NjEwMzRGNTFFMTFFQzgxOTZBMzEyQ0I0NkZGNUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Mw4tZAAAWY0lEQVR42uyd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'
                           />
                        </defs>
                     </svg>
                  </div>
                  <div>
                     <h3 className='text-red-900'>قیمت ورق سیاه فولاد مبارکه اصفهان</h3>
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
                        <span className='text-red-700'>۱۲:۲۹ - ۱۴۰۲/۰۸/۲۴</span>
                     </div>
                  </div>
               </div>
               <div className='mt-3 rounded-xl bg-white'>
                  <table className='w-full border-separate px-2'>
                     <tr className=''>
                        <th className='yekan p-2 font-bold'>
                           عنوان <span className='text-xs'>(برای جزئیات بیشتر کلیک کنید)</span>
                        </th>
                        <th className='yekan p-2 font-bold'>
                           قیمت <span className='text-xs'>(تومان)</span>
                        </th>
                        <th className='yekan p-2 font-bold'>نوسان</th>
                        <th className='yekan p-2 font-bold'>نمودار</th>
                     </tr>

                     {isLoading ? (
                        <h4>loading</h4>
                     ) : (
                        <>
                           {products.map((product, idx) => {
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

                                       {fluctuation && fluctuation == 0 ? (
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
                        </>
                     )}

                     {/* <tr className='bg-rose-100/50'>
                        <td className='yekan p-2 font-bold'>ورق گالوانیزه ۰.۷ عرض ۱۲۵۰ اصفهان</td>
                        <td className='yekan p-2 text-center font-bold'>۲۸,۰۰۰</td>
                        <td className='yekan m-auto p-2 text-center font-bold'>
                           <div className='flex items-center gap-x-1 text-green-600'>
                              ۴۰۰
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

                     <tr>
                        <td className='yekan p-2 font-bold'>ورق گالوانیزه ۰.۷ عرض ۱۲۵۰ اصفهان</td>
                        <td className='yekan p-2 text-center font-bold'>۲۸,۰۰۰</td>
                        <td className='yekan m-auto p-2 text-center font-bold'>
                           <span className='h-5 w-6 text-slate-600'>---</span>
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
                     </tr> */}
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PriceTables
