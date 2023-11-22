import { useField } from 'formik'

// @ts-ignore
const FormikInput = ({ label, ...props }) => {
   // @ts-ignore
   const [field, meta] = useField(props)

   return (
      <div className='text-right'>
         <label>
            <h6 className='yekanBold mb-3 text-base text-slate-700'>{label}</h6>
         </label>
         <input
            {...field}
            {...props}
            className={`${
               meta.error && meta.touched ? 'invalidInput' : ''
            } rtl yekan1 w-full rounded-lg bg-slate-100 px-4 py-2 font-normal text-slate-700 outline-none placeholder:font-normal`}
         />
         {meta.error && meta.touched ? (
            <p className='yekan1 text-sm text-red-500'>{meta.error}</p>
         ) : (
            ''
         )}
      </div>
   )
}

export default FormikInput
