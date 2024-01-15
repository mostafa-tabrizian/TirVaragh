import * as yup from 'yup'
// import * as rule from './rules'

export const ProductForm = yup.object().shape({
   title: yup.string().required('عنوان محصول را وارد کنید'),
   category: yup.string().required('دسته بندی محصول را وارد کنید'),
   factory: yup.string().required('کارخانه محصول را وارد کنید'),
   price: yup.number().min(1, 'قیمت محصول را وارد کنید').required('قیمت محصول را وارد کنید'),
   length: yup.number().min(0.1, 'مقدار طول صحیح نمی‌باشد').required('طول محصول را وارد کنید'),
   width: yup.number().min(0.1, 'مقدار عرض صحیح نمی‌باشد').required('عرض محصول را وارد کنید'),
   thickness: yup.number().min(0.1, 'مقدار ضخامت صحیح نمی‌باشد').required('ضخامت محصول را وارد کنید'),
})

export const CategoryValidation = yup.object().shape({
   name: yup.string().required('عنوان را وارد کنید'),
})

export const comment = yup.object().shape({
   username: yup
      .string()
      .min(3, 'حداقل باید ۳ کارکتر باشد')
      .required('لطفا نام و نام خانوادگیتون رو وارد کنید'),
   body: yup.string().min(3, 'حداقل باید ۳ کارکتر باشد').required('لطفا دیدگاهتون رو وارد کنید'),
})
