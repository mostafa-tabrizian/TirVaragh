'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getSortedRowModel,
   SortingState,
   useReactTable,
   getPaginationRowModel,
} from '@tanstack/react-table'
import { IBlog } from '@/models/blog'
import { useMemo, useState } from 'react'

const BlogsTable = ({ blogs }: { blogs: IBlog[] }) => {
   const [sorting, setSorting] = useState<SortingState>([])

   const columns = useMemo<ColumnDef<unknown>[]>(
      () => [
         {
            accessorKey: '_id',
            header: 'آی‌دی',
            cell: (info) => {
               const value = info.getValue() as string
               return <span className='text-sm text-slate-300 underline'>{value.slice(-4)}</span>
            },
         },
         {
            accessorKey: 'thumbnail',
            header: 'تامبنیل',
            cell: (info) => {
               const value = info.getValue()
               return (
                  <Link
                     target='_blank'
                     href={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${value}`}
                  >
                     {value ? (
                        <Image
                           className='rounded-md object-cover'
                           src={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${value}`}
                           alt={String(value)}
                           height={50}
                           width={50}
                        />
                     ) : (
                        ''
                     )}
                  </Link>
               )
            },
         },
         {
            accessorKey: 'active',
            header: 'فعال',
            cell: (info) => {
               const value = info.getValue()
               return (
                  <>
                     {value ? (
                        <svg
                           className='h-5 w-5 text-green-700'
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
                           <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                           <path d='M9 12l2 2l4 -4' />
                        </svg>
                     ) : (
                        <svg
                           className='h-5 w-5 text-rose-700'
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
                           <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                           <path d='M10 10l4 4m0 -4l-4 4' />
                        </svg>
                     )}
                  </>
               )
            },
         },
         {
            accessorKey: 'slug',
            header: 'اسلاگ',
            cell: (info) => {
               const value = info.getValue() as string
               return (
                  <Link href={`/--admin--/blogs/${value}`}>
                     <span className='text-sm text-slate-500'>{value}</span>
                  </Link>
               )
            },
         },
         {
            accessorKey: 'title',
            header: 'عنوان',
            cell: (info) => {
               const value = info.getValue() as string
               return <span className='text-sm text-slate-500'>{value}</span>
            },
         },
         {
            accessorKey: 'createdAt',
            header: 'تاریخ ایجاد',
         },
      ],
      [],
   )

   const table = useReactTable({
      data: blogs,
      columns,
      state: {
         sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: false,
   })

   return (
      <div className='relative overflow-x-auto'>
         <table className='w-full table-auto text-left text-sm text-slate-500'>
            <thead className='bg-slate-50 text-xs uppercase text-slate-300'>
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <th key={header.id} colSpan={header.colSpan} className='px-6 py-3'>
                              {header.isPlaceholder ? null : (
                                 <div
                                    {...{
                                       className: header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : '',
                                       onClick: header.column.getToggleSortingHandler(),
                                    }}
                                 >
                                    {flexRender(
                                       header.column.columnDef.header,
                                       header.getContext(),
                                    )}
                                    {{
                                       asc: ' 🔼',
                                       desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                 </div>
                              )}
                           </th>
                        )
                     })}
                  </tr>
               ))}
            </thead>
            <tbody className=''>
               {table.getRowModel().rows.map((row) => {
                  return (
                     <tr key={row.id} className='border-b border-slate-300 bg-white'>
                        {row.getVisibleCells().map((cell) => {
                           return (
                              <td key={cell.id} className='px-6 py-4'>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                           )
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </table>

         <div className='mt-5 flex items-center gap-5'>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.setPageIndex(0)}
               disabled={!table.getCanPreviousPage()}
            >
               اولین صفحه
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               صفحه قبل
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               صفحه بعد
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               disabled={!table.getCanNextPage()}
            >
               آخرین صفحه
            </button>
            <span className='flex items-center gap-1'>
               <div>صفحه</div>
               <strong>
                  {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
               </strong>
            </span>
            برو به:
            <span className='flex items-center gap-1 bg-white text-sm'>
               <input
                  type='number'
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                     const page = e.target.value ? Number(e.target.value) - 1 : 0
                     table.setPageIndex(page)
                  }}
                  className='w-16 rounded bg-white p-1 text-sm'
               />
            </span>
            نمایش:
            <select
               className='bg-white text-sm'
               value={table.getState().pagination.pageSize}
               onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
               }}
            >
               {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

export default BlogsTable
