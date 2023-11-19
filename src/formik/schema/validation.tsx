import * as yup from 'yup'
import * as rule from './rules'

export const ProductEditForm = yup.object().shape({
   barcode: yup.string().required('کد محصول را وارد کنید'),
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام محصول باشد' }),
   slug: yup
      .string()
      .min(3, 'اسلاگ حداقل باید ۳ کارکتر باشد')
      .required('اسلاگ محصول را وارد کنید')
      .matches(rule.englishCharNumSpaceWithoutSpecial, {
         message: 'اسلاگ می‌بایست انگلیسی و بدون حروف خاص باشد',
      }),
   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات محصول را وارد کنید'),
   category: yup.object().required('دسته را وارد کنید'),
   brand: yup.object().required('برند را وارد کنید'),
   model: yup.object().required('مدل را وارد کنید'),
   price: yup.number().required('قیمت را وارد کنید'),
   discount: yup.number().required('تخفیف را وارد کنید'),
   detail: yup
      .string()
      .required('جزئیات را وارد کنید')
      .matches(rule.object, { message: 'جزئیات شما آبجکت نمی‌باشد و اشتباه می‌باشد' }),
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
