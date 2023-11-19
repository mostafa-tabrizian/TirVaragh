'use client'

import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'

import { ICategory } from '@/models/category'

const Category = ({
   params: { modelId, categories, currentCat },
}: {
   params: { modelId: string; categories: ICategory[]; currentCat: ICategory }
}) => {
   const [selectedCategory, selectCategory] = useState(currentCat)

   const handleCategoryChange = async (categoryId: string) => {
      const payload = {
         modelId: modelId,
         category: categoryId,
      }

      try {
         const res = await fetch('/api/--admin--/model', {
            method: 'PUT',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('دسته بندی با موفقیت تغییر کرد')
      } catch (err) {
         toast.error('در تغییر دسته بندی خطایی رخ داد')
         console.error(err)
      }
   }

   return (
      <div className='col-span-2'>
         <Autocomplete
            size='small'
            className='rtl'
            id='category'
            options={categories}
            value={selectedCategory}
            isOptionEqualToValue={(option, value) => option === value || option._id === value._id}
            getOptionLabel={(option) => option.name}
            onChange={(_e, value) => {
               if (value) {
                  selectCategory(value)
                  handleCategoryChange(value._id)
               }
            }}
            renderInput={(params) => <TextField {...params} label='دسته بندی' />}
            sx={{ width: '100%' }}
         />
      </div>
   )
}

export default Category
