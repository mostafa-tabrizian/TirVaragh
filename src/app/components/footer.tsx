import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
   return (
      <footer className='rtl mt-10 rounded-t-3xl border-t-2 border-t-gray-200 bg-gray-200 px-4 py-3 text-slate-600 md:py-8'>
         <div className='grid-row-2 container mx-auto grid max-w-screen-lg grid-cols-5 gap-10'>
            <div className='col-span-5 flex flex-col justify-start'>
               <div className='text-center'>
                  <Link
                     aria-label='صفحه اصلی'
                     href='/'
                     className='relative mb-10 flex aspect-video h-32 w-full justify-center gap-3 md:col-span-1'
                  >
                     <Image
                        className='object-contain'
                        alt='لوگو تیرورق'
                        priority
                        src='/logo-color.svg'
                        fill
                     />
                  </Link>

                  <div className='mb-5 flex items-center justify-around'>
                     <ul className='flex items-center gap-10'>
                        <li className='block'>
                           <a
                              aria-label='اینستاگرام'
                              id='instagram'
                              rel='noreferrer'
                              href='https://www.instagram.com/sgpsteelco'
                              target='_blank'
                           >
                              <svg
                                 stroke='currentColor'
                                 fill='currentColor'
                                 strokeWidth='0'
                                 role='img'
                                 viewBox='0 0 24 24'
                                 className='h-6 w-6 transition hover:text-red-600'
                                 height='1em'
                                 width='1em'
                                 xmlns='http://www.w3.org/2000/svg'
                              >
                                 <title></title>
                                 <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'></path>
                              </svg>
                           </a>
                        </li>
                        <li className='block'>
                           <a
                              aria-label='تلگرام'
                              id='telegram'
                              rel='noreferrer'
                              href='https://t.me/sgpsteel'
                              target='_blank'
                           >
                              <svg
                                 className='h-6 w-6 transition hover:text-red-600'
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
                                 <path d='M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4' />
                              </svg>
                           </a>
                        </li>
                        <li className='block'>
                           <a
                              aria-label='تماس تلفنی'
                              id='phone_call_1'
                              href='tel:+2191692222'
                              className='flex items-center'
                           >
                              <svg
                                 className='h-6 w-6 transition hover:text-red-600'
                                 viewBox='0 0 24 24'
                                 fill='none'
                                 stroke='currentColor'
                                 strokeWidth='2'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              >
                                 {' '}
                                 <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                              </svg>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <p className='yekan1 mb-6 text-center text-sm font-bold text-slate-500'>
                     تامین کننده ورق کلیه کارخانه ها
                  </p>
                  <div id='about-us' className='space-y-5'>
                     <p className='text-justify text-sm leading-7 text-slate-500 md:text-center'>
                        <strong>آدرس: </strong>بزرگراه آزادگان مجتمع آهن مکان فاز ده مرکزی پلاک 2255{' '}
                        <br />
                        <strong>آدرس انبار :</strong> خیابان شهید رجایی جنوب بعد از بیمارستان هفتم
                        تیر خیابان تراسفو کوچه سوم پلاک 15
                     </p>

                     {/* <iframe
                        className='w-full border-3 border-red-300 rounded-lg'
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.0863620420655!2d50.849071699999996!3d34.627257799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f93bbdb1b3fd48b%3A0x14fde53739892525!2z2YXYrNiq2YXYuSDYqtis2KfYsduMINmB2LHYr9mI2LM!5e0!3m2!1sen!2s!4v1695068764877!5m2!1sen!2s'
                        width='300'
                        height='350'
                        allowFullScreen={false}
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                     ></iframe> */}

                     <p className='text-center text-sm leading-7 text-slate-500'>
                        <a
                           id='instagram_2'
                           rel='noreferrer'
                           className='text-sm font-semibold text-red-600'
                           href='https://www.instagram.com/sgpsteelco'
                           target='_blank'
                        >
                           اینستاگرام
                        </a>
                        ،{' '}
                        <a
                           id='telegram'
                           rel='noreferrer'
                           className='text-sm font-semibold text-red-600'
                           href='https://t.me/sgpsteel'
                           target='_blank'
                        >
                           تلگرام
                        </a>{' '}
                        و یا از طریق شماره های{' '}
                        <a
                           id='phone_call_2'
                           rel='noreferrer'
                           className='text-sm font-semibold tracking-widest text-red-600'
                           href='tel:+2191692222'
                        >
                           02191692222{' '}
                        </a>
                        ،{' '}
                        <a
                           id='phone_call_3'
                           rel='noreferrer'
                           className='text-sm font-semibold tracking-widest text-red-600'
                           href='tel:+2155445868'
                        >
                           02155445868{' '}
                        </a>
                        و{' '}
                        <a
                           id='phone_call_4'
                           rel='noreferrer'
                           className='text-sm font-semibold tracking-widest text-red-600'
                           href='tel:+2155445660'
                        >
                           02155445868{' '}
                        </a>
                        با ما در ارتباط باشید
                     </p>
                  </div>
               </div>
            </div>
            <div className='col-span-5'>
               <p className='mb-3 text-center text-xs text-slate-700'>
                  © تمامی حقوق برای شرکت صنعت ورق الغدیر پارس محفوظ است
               </p>
               <a href='https://mostafatabrizian.ir/fa'>
                  <p className='text-center text-xs text-slate-700'>
                     طراحی و توسعه : <span className='text-xs text-indigo-600'>تبریزیان</span>
                  </p>
               </a>
            </div>
         </div>
      </footer>
   )
}

export default Footer
