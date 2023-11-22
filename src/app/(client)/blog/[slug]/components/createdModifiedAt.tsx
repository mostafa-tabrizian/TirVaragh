import DateFormat from '@/lib/dateFormat'

const CreatedModifiedAt = ({ createdAt, modifiedAt }: { createdAt: Date; modifiedAt: Date }) => {
   const formattedCreatedAt = DateFormat(createdAt)
   const formattedModifiedAt = DateFormat(modifiedAt)

   return (
      <div>
         <h5 className='yekan1 text-sm'>انتشار : {formattedCreatedAt}</h5>
         {formattedModifiedAt && formattedCreatedAt !== formattedModifiedAt ? (
            <h5 className='yekan1 text-sm'>بازنگری : {formattedModifiedAt}</h5>
         ) : (
            ''
         )}
      </div>
   )
}

export default CreatedModifiedAt
