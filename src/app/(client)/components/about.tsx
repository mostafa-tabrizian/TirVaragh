import Image from 'next/image'

const About = () => {
   return (
      <div className='mx-4 mt-14 grid-cols-2 md:mx-auto md:mt-24 md:grid md:gap-10' id='about-us'>
         <div className='relative aspect-video w-full'>
            <Image
               className='rounded-2xl object-cover'
               fill
               src='/aboutHero.jpg'
               alt='درباره شرکت تیرورق'
            />
         </div>

         <div>
            <div>
               <div className='mt-7 flex items-center gap-1 md:mt-0'>
                  <span className='w-8 border-b-2 border-red-700'></span>
                  <span className='text-sm font-bold text-red-700'>خرید سریع و مطمئن</span>
               </div>
               <div>
                  <h2 className='yekanExtraBold mt-2 text-3xl'>
                     تیرورق، تخصصی ترین مجموعه در حوزه تامین و توزیع ورق کشور
                  </h2>
               </div>
            </div>

            <p className='mt-5 md:mt-12'>
               شرکت “صنعت‌ورق الغدیرپارس” که فعالیت خود را از ابتدای سال ۹۷ آغاز نموده قادر است به
               صورت تخصصی اقدام به فرآوری انواع ورق‌های نرم، روغنی و فول‌هارد نماید، این شرکت بعد از
               فرآیند تخصصی نورد مجدد آنها را بر اساس سفارش مشتری برش داده و به صورت شیت در اختیار
               مصرف‌کنندگان قرار می‌دهد. این شرکت درواقع فرآوری ضایعات شرکت‌های انواع تولیدکننده
               رول‌های سیاه و ورق‌های سرد می‌باشد به‌گونه‌ای که آنها را دریافت و سپس به انواع شیت
               تبدیل و آنگاه بر اساس ضخامت با عنوان ورق درجه دو و سه در اختیار مصرف‌کنندگان قرار
               می‌دهد. این کار در کشور حدود ۱۰ سال قدمت دارد و قبل از آن آنها را به صورت ضایعات
               مستعمل ذوب می‌نمودند، این نوع ورق‌ها هم فول‌هارد و هم روغنی دارد که ورق روغنی جهت
               استفاده در تولید اقلامی مانند اگزوز (منبع و لوله اگزوز)، درب ضد سرقت، قفسه‌سازی و…
               کاربرد فراوان دارد. هم‌چنین ورق‌های فول‌هارد نیز برای استفاده در ادوات کشاورزی مانند
               بیل، فرغون، استانبولی، یراق‌آلات، واشر و نظایر آن مورد استفاده قرار می‌گیرد. این شرکت
               قادر است به غیر از فرآوری ورق‌های یاد شده چه به صورت اسپیره و چه به صورت ورق کالاهای
               درجه دو و سه، گالوانیزه، روغنی، ورق رنگی و… را ضمن افزایش کیفیت و راندمان، به‌صورت
               شیت درآورده و سپس در اختیار مصرف‌کنندگان قرار دهد اختلاف نرخ حاصل‌ از افزایش قیمت‌ها
               زمینه ایجاد انگیزه در مصرف اینگونه ورق‌ها را برای مصرف‌کنندگان بطور چشم‌گیری افزایش
               داده است. این شرکت اسپیره‌های مورد نیاز خود را از شرکت‌های فولادغرب آسیا، هفت‌الماس،
               امیر‌کبیر کاشان، ورق‌خودرو، تاراز و… تأمین می‌کند، این شرکت از معدود مراکزی است که
               انواع ورق‌های اسپیره و ورق‌های روغنی از ضخامت۲دهم تا ۵ میلی‌متر را برش داده و به صورت
               محصولی با کیفیت بالاتر در حد درجه یک، دو و یا سه در اختیار مصرف‌کنندگان قرار می‌دهد.
            </p>
         </div>
      </div>
   )
}

export default About
