import { memo } from 'react'

const SlugInput = memo(
   ({
      slug,
      setSlug,
      newBlog,
   }: {
      slug: string
      setSlug: React.Dispatch<React.SetStateAction<string>>
      newBlog: boolean
   }) => {
      return (
         <div className='flex flex-col space-y-1'>
            <label htmlFor='slug'>
               <span className='yekan1 text-base text-slate-700'>اسلاگ:</span>
            </label>
            <input
               disabled={!newBlog}
               name='slug'
               onChange={(e) => setSlug(e.target.value)}
               value={slug}
               className='yekan1 ltr w-full rounded-lg border bg-white p-2 text-base placeholder:font-normal placeholder:text-slate-300'
               type='text'
               placeholder='slug-for-this-blog'
            />
            <div className='rounded-lg border-2 border-yellow-400 p-2 text-right'>
               <span className='text-xs text-yellow-800'>
                  ⚠️ اسلاگ پس از ثبت قابل تغییر نمی‌باشد
               </span>
            </div>
            {slug.length ? (
               <span className='yekan1 text-xs text-slate-500'>
                  پیش نمایش اسلاگ در لینک: <br /> {encodeURI(slug.trim().replaceAll(' ', '-'))}/
               </span>
            ) : (
               ''
            )}
         </div>
      )
   },
)

SlugInput.displayName = 'SlugInput'

export default SlugInput
