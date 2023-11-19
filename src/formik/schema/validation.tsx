import * as yup from 'yup'
import * as rule from './rules'

export const ProductForm = yup.object().shape({
   title: yup.string().required('عنوان محصول را وارد کنید'),
   category: yup.string().required('دسته بندی محصول را وارد کنید'),
   price: yup.number().min(1, 'قیمت محصول را وارد کنید').required('قیمت محصول را وارد کنید'),
   length: yup.number().min(1, 'طول محصول را وارد کنید').required('طول محصول را وارد کنید'),
   width: yup.number().min(1, 'عرض محصول را وارد کنید').required('عرض محصول را وارد کنید'),
   thickness: yup.number().min(1, 'ضخامت محصول را وارد کنید').required('ضخامت محصول را وارد کنید'),
})

export const NameSlugValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'حداقل ۳ کارکتر')
      .required('عنوان را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام محصول باشد' }),
   slug: yup
      .string()
      .min(3, 'حداقل ۳ کارکتر')
      .required('اسلاگ را وارد کنید')
      .matches(rule.englishCharNumSpaceWithoutSpecial, {
         message: 'اسلاگ می‌بایست انگلیسی و بدون حروف خاص باشد',
      }),
})

export const SlideValidation = yup.object().shape({
   alt: yup.string().min(3, 'حداقل ۳ کارکتر').required('عنوان جایگزین را وارد کنید'),
   link: yup.string().required('لینک را وارد کنید'),
})
