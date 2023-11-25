const LoadingHome = () => {
   return (
      <div className='mx-6 my-16 max-w-screen-lg animate-pulse md:mx-auto'>
         <div className='aspect-video w-[80%] rounded bg-gray-200'></div>

         <div className='mt-10 flex gap-5'>
            <div className='h-20 w-full rounded bg-gray-200'></div>
            <div className='h-20 w-full rounded bg-gray-200'></div>
            <div className='h-20 w-full rounded bg-gray-200'></div>
            <div className='h-20 w-full rounded bg-gray-200'></div>
         </div>
      </div>
   )
}

export default LoadingHome
