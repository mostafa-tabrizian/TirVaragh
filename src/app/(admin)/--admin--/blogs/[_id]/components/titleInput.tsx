import { memo } from 'react'

const TitleInput = memo(
   ({
      title,
      setTitle
   }: {
      title: string
      setTitle: React.Dispatch<React.SetStateAction<string>>
   }) => {
      return (
         <div className='flex flex-col space-y-1'>
            <label htmlFor='title'>
               <span className='text-slate-700 yekan1 text-base'>عنوان:</span>
            </label>
            <input
               name='title'
               onChange={(e) => setTitle(e.target.value)}
               value={title}
               className='yekan1 w-full rounded-lg border bg-white p-2 text-base rtl'
               type='text'
            />
         </div>
      )
   },
)

TitleInput.displayName = 'titleInput'

export default TitleInput
