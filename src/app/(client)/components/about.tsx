import Image from 'next/image'

const About = () => {
   return (
      <div className='mx-4 mt-14 md:mx-auto'>
         <div className='relative h-48 w-full'>
            <Image
               className='rounded-2xl'
               fill
               src='/aboutHero.jpg'
               alt='درباره شرکت تیرورق'
               objectFit='cover'
            />
         </div>

         <div>
            <div className='mt-7 flex items-center gap-1'>
               <span className='w-8 border-b-2 border-red-700'></span>
               <span className='text-sm font-bold text-red-700'>خرید سریع و مطمئن</span>
            </div>
            <div>
               <h2 className='yekanExtraBold mt-2 text-3xl'>
                  تیرورق، تخصصی ترین مجموعه در حوزه تامین و توزیع ورق کشور
               </h2>
            </div>
         </div>

         <p className='mt-5'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
            است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط
            فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
            طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص.
         </p>
      </div>
   )
}

export default About
