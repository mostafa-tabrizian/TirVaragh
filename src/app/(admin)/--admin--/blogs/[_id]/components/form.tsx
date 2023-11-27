'use client'

import { IBlog } from '@/models/blog'
import Switch from '@mui/material/Switch'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import SlugInput from './slugInput'
import ThumbnailInput from './thumbnailInput'
import TitleInput from './titleInput'

const Form = ({
   data: { authorId, _idQuery, blogData },
}: {
   data: { authorId: string; _idQuery: string; blogData: IBlog }
}) => {
   const newBlog = _idQuery == 'new'
   const blog = blogData

   const [loading, setLoading] = useState(false)
   const [uploadingProgress, setUploadingProgress] = useState(0)
   const [thumbnail, setThumbnail] = useState<string | File | null>(newBlog ? null : blog.thumbnail)
   const [active, setActive] = useState(newBlog ? false : blog.active)
   const [title, setTitle] = useState(newBlog ? '' : blog.title)
   const [slug, setSlug] = useState(newBlog ? '' : blog.slug)
   const [thumbnailPreview, setThumbnailPreview] = useState<FileList | null>(null)
   const [readTime, setReadTime] = useState(newBlog ? 0 : blog.readTime)

   const router = useRouter()

   const quillRef = useRef(null)

   const imageHandler = () => {
      try {
         const input = document.createElement('input')

         input.setAttribute('type', 'file')
         input.setAttribute('accept', 'image/*')
         input.click()

         input.onchange = async () => {
            // @ts-ignore
            const file = input.files[0]
            const fileName = file.name

            const formData = new FormData()
            formData.append('image', file)

            const imageKey = await uploadFiles(file, fileName, 'content')
            insertInEditor(imageKey)
         }
      } catch (err) {
         return toast.error('در آپلود تصویر ضمیمه بلاگ خطایی رخ داد! لطفا حذف و مجددا تلاش کنید.')
      }
   }

   const uploadFiles = async (image: File, filename: string, type: string) => {
      const imageName = filename.replace(' ', '-')

      const data = new FormData()
      data.append('image', image)
      data.append('folder', `blogs/${type}`)
      data.append('imageName', imageName)

      const res = await axios.request({
         method: 'post',
         url: '/api/--admin--/image/s3',
         data,
         onUploadProgress: (p) => {
            const progressPercent = (p.loaded * 100) / (p.total as number)
            setUploadingProgress(progressPercent)
         },
      })

      setUploadingProgress(0)

      return res.data['imageKey']
   }

   const insertInEditor = (imageKey: string) => {
      // @ts-ignore
      const editor = quillRef.current?.getEditor()
      editor.insertEmbed(
         editor.getSelection(),
         'image',
         `https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/content/${imageKey}`,
      )
   }

   const handlePublish = async () => {
      if (
         !title.length ||
         !slug.length ||
         // @ts-ignore
         !quillRef.current.value.length ||
         thumbnail == null
      ) {
         return toast.warn('لطفا تمامی ورودی های فرم را کامل کنید.')
      }

      try {
         toast.info('در حال انتشار بلاگ...')

         setLoading(true)

         const fileName = (thumbnail as File).name

         const imageKey = await uploadFiles(thumbnail as File, fileName, 'thumbnail')

         const slugReady = slug.trim().replaceAll(' ', '-').toLocaleLowerCase()

         const payload = {
            active,
            title,
            slug: slugReady,
            thumbnail: imageKey,
            readTime,
            authorId,
            // @ts-ignore
            text: quillRef.current.value,
         }

         const res = await fetch('/api/--admin--/blog', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         } else if (resData.message == 'notUnique') {
            return toast.warning('اسلاگ انتخاب شده تکراری می‌باشد')
         }

         toast.success('بلاگ با موفقیت منتشر شد')

         fetch('/api/--admin--/revalidate?path=/')
         fetch('/api/--admin--/revalidate?path=/blog/' + slugReady)

         if (newBlog) {
            router.push(`/--admin--/blogs/${slugReady}`)
         }
      } catch (err) {
         toast.error('در حین انتشار بلاگ، خطلایی رخ داد!')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   const handleSaveEdit = async () => {
      if (
         !title.length ||
         // @ts-ignore
         !quillRef.current.value.length ||
         thumbnail == null
      ) {
         return toast.warn('لطفا تمامی ورودی های فرم را کامل کنید.')
      }

      try {
         setLoading(true)

         const payload = {
            slug,
            active,
            title,
            // @ts-ignore
            text: quillRef.current.value,
            thumbnail: null,
            readTime,
         }

         let imageKey

         if (typeof thumbnail == 'object') {
            const fileName = (thumbnail as File).name
            imageKey = await uploadFiles(thumbnail as File, fileName, 'thumbnail')
            // @ts-ignore
            payload.thumbnail = imageKey
         }

         const res = await fetch('/api/--admin--/blog', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('در برقراری ارتباط خطایی رخ داد!')
         }

         toast.success('تغییرات بلاگ با موفقیت ثبت گردید')
         setThumbnailPreview(null)

         if (typeof thumbnail == 'object') {
            setThumbnail(imageKey)
         }

         const slugReady = slug.trim().replaceAll(' ', '-').toLocaleLowerCase()

         fetch('/api/--admin--/revalidate?path=/')
         fetch('/api/--admin--/revalidate?path=/blog/' + slugReady)

         router.refresh()
      } catch (err) {
         toast.error('حین ذخیره تغییراتی، خطایی رخ داد!')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   const quillModules = useMemo(() => {
      return {
         toolbar: {
            container: [
               [{ header: [1, 2, 3, false] }],
               ['bold', 'italic', 'underline', 'strike'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               [{ align: [] }],
               ['link', 'image'],
               ['clean'],
               [{ color: [] }],
            ],
            handlers: {
               image: imageHandler,
            },
         },
      }
   }, [])

   const quillEditor = useMemo(() => {
      return (
         <ReactQuill
            ref={quillRef}
            theme='snow'
            value={newBlog ? '' : blog.text}
            style={{ height: '650px' }}
            placeholder='بلاگ خود را بنویسید...'
            modules={quillModules}
         />
      )
   }, [])

   const deleteHandle = async () => {
      try {
         setLoading(true)

         if (blog.thumbnail) {
            return toast.warning(
               // eslint-disable-next-line quotes
               'برا حذف بلاگ, ابتدا می‌بایسست تصویر تامبنیل حذف شود',
            )
         }

         toast.info('در حال حذف بلاگ...')

         const res = await fetch('/api/--admin--/blog', {
            method: 'DELETE',
            body: JSON.stringify({ slug }),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط!')
         }

         toast.success('بلاگ با موفقیت حذف گردید.')

         fetch('/api/--admin--/revalidate?path=/')

         router.push('/--admin--/blogs')
      } catch (err) {
         toast.error('خطا در برقراری ارتباط. لطفا مجددا تلاش کنید.')
         return console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='grid grid-cols-4 gap-5'>
         <div className='col-span-3'>{quillEditor}</div>

         <div className='space-y-5'>
            <TitleInput title={title} setTitle={setTitle} />
            <SlugInput slug={slug} setSlug={setSlug} newBlog={newBlog} />
            <ThumbnailInput
               loading={loading}
               blogId={blog._id}
               thumbnail={thumbnail}
               setThumbnail={setThumbnail}
               thumbnailPreview={thumbnailPreview}
               setThumbnailPreview={setThumbnailPreview}
            />
            {uploadingProgress ? `${uploadingProgress}%` : ''}
            <div className='flex items-center justify-between'>
               <span className='yekan1 text-base text-slate-700'>زمان مطالعه (دقیقه):</span>
               <input
                  type='number'
                  name='readTime'
                  value={readTime}
                  onChange={(e) => setReadTime(parseInt(e.target.value))}
                  id='readTime'
                  className='w-16 rounded bg-white pl-5 pr-2'
               />
            </div>
            <div className='flex items-center justify-between'>
               <span className='yekan1 text-base text-slate-700'>فعال:</span>

               <Switch
                  disabled={loading}
                  checked={active}
                  name='active'
                  color='success'
                  onChange={() => setActive((prev) => !prev)}
               />
            </div>
            <button
               disabled={loading}
               onClick={newBlog ? handlePublish : handleSaveEdit}
               className='w-full rounded-lg border-2 border-green-700 bg-white py-1 text-base transition-colors hover:border-green-600 hover:bg-green-700/10'
            >
               {loading ? (
                  <svg
                     className='mx-auto h-6 w-6 animate-spin text-white'
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
                     <path d='M9.828 9.172a4 4 0 1 0 0 5.656 a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828 a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828' />
                  </svg>
               ) : (
                  <>{newBlog ? 'انتشار' : 'ذخیره تغییرات'}</>
               )}
            </button>
            {newBlog ? (
               ''
            ) : (
               <button
                  disabled={loading}
                  onClick={deleteHandle}
                  className='w-full rounded-lg border-2 border-rose-900 py-1 text-base transition-colors hover:border-rose-600 hover:bg-rose-900/10'
               >
                  {loading ? (
                     <svg
                        className='mx-auto h-6 w-6 animate-spin text-white'
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
                        <path d='M9.828 9.172a4 4 0 1 0 0 5.656 a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828 a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828' />
                     </svg>
                  ) : (
                     'حذف'
                  )}
               </button>
            )}
         </div>
      </div>
   )
}

export default Form
