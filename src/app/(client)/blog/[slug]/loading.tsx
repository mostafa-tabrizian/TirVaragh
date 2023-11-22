const LoadingBlog = () => {
   return (
      <div className='max-w-screen-md animate-pulse gap-7 space-y-4 py-32 md:mx-auto xl:gap-0'>
         <div className='order-2 mx-5 mt-20 space-y-5 lg:order-1 lg:mx-0 lg:mt-0'>
            <div className='mx-auto h-10 rounded bg-gray-200'></div>
            <div className='mx-auto h-[432px] rounded bg-gray-200'></div>
            <div className='flex items-center justify-between'>
               <div className='h-5 w-20 rounded bg-gray-200'></div>
               <div className='h-5 w-28 rounded bg-gray-200'></div>
            </div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
         </div>
      </div>
   )
}

export default LoadingBlog
