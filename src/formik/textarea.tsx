import { useField } from 'formik'

// @ts-ignore
const FormikTextarea = ({ label, ...props }) => {
   // @ts-ignore
   const [field, meta] = useField(props)

   return (
      <div className='text-right'>
         <label>
            <h6 className='yekanBold mb-3 text-base text-slate-100'>{label}</h6>
         </label>
         <textarea
            {...field}
            {...props}
            rows={3}
            className={`${
               meta.error && meta.touched ? 'invalidInput' : ''
            } rtl yekan1 w-full whitespace-pre border-slate-600 bg-slate-100 px-4 py-2 font-normal text-slate-700 outline-none placeholder:font-normal`}
         />
         {meta.error && meta.touched ? (
            <p className='yekan1 text-sm text-red-500'>{meta.error}</p>
         ) : (
            ''
         )}
      </div>
   )
}

export default FormikTextarea
