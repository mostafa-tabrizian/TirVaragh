'use client'

// import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { memo, useMemo } from 'react'
import Link from 'next/link'
import ImageDelete from './imageDelete'
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

const ThumbnailInput = memo(
   ({
      blogId,
      thumbnail,
      setThumbnail,
      thumbnailPreview,
      setThumbnailPreview,
      loading,
   }: {
      blogId: string
      thumbnail: string | File | null
      setThumbnail: React.Dispatch<React.SetStateAction<string | File | null>>
      thumbnailPreview: FileList | null
      setThumbnailPreview: React.Dispatch<React.SetStateAction<FileList | null>>
      loading: boolean
   }) => {
      const thumbnailPrevMemo = useMemo(() => {
         return thumbnailPreview && Object.values(thumbnailPreview)
      }, [thumbnailPreview])

      const onFileSelected = async (files: FileList | null) => {
         if (!files) return

         const filesList: File[] = Object.values(files)

         const filesTypeValidation = await import('@/lib/filesTypeValidation').then(
            (mod) => mod.default,
         )
         const typeCheckRes = filesTypeValidation(filesList)
         if (!typeCheckRes) return

         const filesSizeValidation = await import('@/lib/filesSizeValidation').then(
            (mod) => mod.default,
         )
         const sizeCheckRes = filesSizeValidation(filesList)
         if (!sizeCheckRes) return

         setThumbnailPreview(files)
         setThumbnail(files[0])
      }

      const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

      const dropHandlerDesign = async (event: React.DragEvent<HTMLDivElement>) => {
         event.preventDefault()
         const files = event.dataTransfer.files
         const toast = await import('react-toastify').then((mod) => mod.toast)

         if (!files) return toast.warning('در دریافت تصویر، خطایی رخ داد')
         else if (files.length !== 1) {
            return toast.warning('بیش از ۱ تصویر انتخاب شده')
         }

         onFileSelected(files)
      }

      return (
         <div >
            {thumbnail && typeof thumbnail == 'string' ? (
               <div>
                  <span className='yekan1 text-base text-slate-700'>تامبنیل</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${thumbnail}`}
                     >
                        <div className='mx-auto flex justify-center'>
                           <Image
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${thumbnail}`}
                              alt='blog thumbnail'
                              width={600}
                              height={900}
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete blogId={blogId} imageKey={thumbnail} setThumbnail={setThumbnail} />
                  </div>
               </div>
            ) : (
               <>
                  {thumbnailPrevMemo?.length ? (
                     <div className='mb-3'>
                        <span className='verdana mb-3 text-slate-700'>تامبنیل (پیش نمایش)</span>

                        {thumbnailPrevMemo.map((imageData: File) => {
                           return (
                              <Image
                                 key={imageData.name}
                                 className='rounded-xl object-contain'
                                 src={URL.createObjectURL(imageData)}
                                 alt={imageData.name}
                                 width='250'
                                 height='250'
                                 quality={100}
                                 loading='lazy'
                              />
                           )
                        })}
                     </div>
                  ) : (
                     <span className='yekan1 text-base text-slate-700'>تامبنیل:</span>
                  )}

                  <div
                     onDrop={(e) => dropHandlerDesign(e)}
                     onDragOver={dragOverHandler}
                     className='w-full rounded-lg border bg-white text-base'
                  >
                     <Button
                        type='button'
                        // @ts-ignore
                        component='label'
                        sx={{ width: '100%', aspectRatio: '16/9' }}
                     >
                        <svg
                           className='h-8 w-8 text-slate-700'
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
                           <line x1='12' y1='5' x2='12' y2='19' />{' '}
                           <line x1='5' y1='12' x2='19' y2='12' />
                        </svg>

                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='thumbnail'
                           onChange={(e) => onFileSelected(e?.target?.files)}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </>
            )}
         </div>
      )
   },
)

ThumbnailInput.displayName = 'ThumbnailInput'

export default ThumbnailInput
