'use client'

import { IBlog } from '@/models/blog'
import { useState } from 'react'
import DateFormat from '@/lib/dateFormat'
import { useRouter } from 'next/navigation'

const Comments = ({ blogs }: { blogs: IBlog[] }) => {
   const [filter, setFilter] = useState<string | null>('pending')

   const router = useRouter()

   const approvalChangeHandle = async (
      commentId: string,
      replyId: string | null,
      type: string,
      approval: string,
   ) => {
      const toast = await import('react-toastify').then((mod) => mod.toast)

      try {
         const res = await fetch('/api/--admin--/blog/comment', {
            method: 'PATCH',
            body: JSON.stringify({
               commentId,
               replyId,
               type,
               approval,
            }),
         })

         if (!res.ok) throw new Error()

         toast.success('وضعیت تایید تغییر یافت.')
         router.refresh()
      } catch (err) {
         toast.error('حین تغییر وضعیت، خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <div className='grid w-full justify-center'>
            <div className='flex gap-2'>
               <button
                  onClick={() => setFilter(null)}
                  className={`${
                     filter == null ? 'border-2 border-sky-600' : 'border-2 border-none'
                  } rounded-full px-4 py-1 text-base`}
               >
                  همه
               </button>
               <button
                  onClick={() => setFilter('pending')}
                  className={`${
                     filter == 'pending' ? 'border-2 border-sky-600' : 'border-2 border-none'
                  } rounded-full px-4 py-1 text-base`}
               >
                  در حال بررسی
               </button>
               <button
                  onClick={() => setFilter('approved')}
                  className={`${
                     filter == 'approved' ? 'border-2 border-sky-600' : 'border-2 border-none'
                  } rounded-full px-4 py-1 text-base`}
               >
                  تایید شده
               </button>
               <button
                  onClick={() => setFilter('disapproved')}
                  className={`${
                     filter == 'disapproved' ? 'border-2 border-sky-600' : 'border-2 border-none'
                  } rounded-full px-4 py-1 text-base`}
               >
                  رد شده
               </button>
            </div>
         </div>

         {blogs
            .sort((a, b) => new Date(b.modifiedAt).getDate() - new Date(a.modifiedAt).getDate())
            .map((blog) => {
               return (
                  <>
                     <p className='yekanBold rtl pt-5 text-center text-lg text-slate-700 underline'>
                        {blog.title}
                     </p>
                     {blog.comments
                        .sort(
                           (a, b) =>
                              new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate(),
                        )
                        .map((comment) => {
                           let commentIncludeNotFilteredReply, commentNotFiltered

                           if (filter) {
                              commentIncludeNotFilteredReply = comment.replys.some(
                                 (reply) => reply.approval == filter,
                              )
                              commentNotFiltered = comment.approval == filter
                           }

                           if (!filter || commentNotFiltered || commentIncludeNotFilteredReply) {
                              return (
                                 <div key={comment._id}>
                                    <div className='items-top flex gap-3'>
                                       <div className='rtl mx-6 w-full rounded-lg bg-slate-200 p-4'>
                                          <div className='mb-3 flex items-center justify-between'>
                                             <div className='flex items-center gap-3'>
                                                <div className='aspect-square h-7 w-7 rounded-full bg-slate-400 text-center'>
                                                   {comment.username.slice(0, 1)}
                                                </div>
                                                <div className='flex w-full flex-wrap items-center gap-x-5'>
                                                   <span className='yekanBold text-base font-bold text-slate-800'>
                                                      {comment.username}
                                                   </span>
                                                   <span className='yekan1 text-sm text-slate-700'>
                                                      {DateFormat(comment.createdAt)}
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                          <p className='yekan1 text-base font-normal leading-loose text-gray-800 lg:text-base lg:leading-8'>
                                             {comment.body}
                                          </p>
                                       </div>
                                       <div>
                                          <select
                                             className='yekan1 rounded-lg bg-slate-200 px-4 py-1 text-base'
                                             value={comment.approval}
                                             onChange={(e) => {
                                                approvalChangeHandle(
                                                   comment._id.toString(),
                                                   null,
                                                   'comment',
                                                   e.target.value,
                                                )
                                             }}
                                          >
                                             <option value='pending'>⏳</option>
                                             <option value='approved'>✔️</option>
                                             <option value='disapproved'>❌</option>
                                          </select>
                                       </div>
                                    </div>
                                    {comment.replys.map((reply, idx) => {
                                       if (filter && reply.approval !== filter) return

                                       return (
                                          <div key={reply._id}>
                                             <div className='my-2 mr-7 flex'>
                                                <div className=' min-w-[1rem]'>
                                                   {idx == 0 ? (
                                                      <svg
                                                         className='h-5 w-5 text-gray-500'
                                                         viewBox='0 0 24 24'
                                                         fill='none'
                                                         stroke='currentColor'
                                                         strokeWidth='2'
                                                         strokeLinecap='round'
                                                         strokeLinejoin='round'
                                                      >
                                                         {' '}
                                                         <polyline points='9 10 4 15 9 20' />{' '}
                                                         <path d='M20 4v7a4 4 0 0 1-4 4H4' />
                                                      </svg>
                                                   ) : (
                                                      ''
                                                   )}
                                                </div>
                                                <div className='items-top flex w-full gap-3'>
                                                   <div className='mx-6 w-full rounded-lg bg-slate-200 p-4'>
                                                      <div>
                                                         <div className='mb-3 flex  items-center gap-3'>
                                                            <div className='aspect-square h-7 w-7 rounded-full bg-slate-400 text-center'>
                                                               {reply.username.slice(0, 1)}
                                                            </div>
                                                            <div className='flex w-full items-center gap-5'>
                                                               <span className='yekanBold text-base font-bold text-slate-800'>
                                                                  {reply.username}
                                                               </span>
                                                               <span className='yekan1 text-sm text-slate-700'>
                                                                  {DateFormat(reply.createdAt)}
                                                               </span>
                                                            </div>
                                                         </div>
                                                         <p className='yekan1 text-base font-normal leading-loose text-slate-800 lg:text-base lg:leading-8'>
                                                            {reply.body}
                                                         </p>
                                                      </div>
                                                   </div>
                                                   <div>
                                                      <select
                                                         className='yekan1 rounded-lg bg-slate-200 px-4 py-1 text-base'
                                                         value={reply.approval}
                                                         onChange={(e) => {
                                                            approvalChangeHandle(
                                                               comment._id.toString(),
                                                               reply._id.toString(),
                                                               'reply',
                                                               e.target.value,
                                                            )
                                                         }}
                                                      >
                                                         <option value='pending'>⏳</option>
                                                         <option value='approved'>✔️</option>
                                                         <option value='disapproved'>❌</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )
                                    })}
                                 </div>
                              )
                           }
                        })}
                  </>
               )
            })}
      </>
   )
}

export default Comments
