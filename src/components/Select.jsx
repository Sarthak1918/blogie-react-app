import React,{useId} from 'react'

function Select({
    options =[],
    label,
    className ='',
    ...props
},ref) {

    const id = useId()


  return (
    <div className='w-full'>
        {label && <label htmlFor={id}>{label}</label>}
        <select 
        id={id} 
        ref={ref}
        {...props}
        className = {`px—3 py—2 rounded—lg
        bg—blue-100 text-black outline-none w-full duration-200 border border-gray-300  ${className}`}
        >
         {
            options && options.map((option)=>{
               return <option key={option} value={option} className='font-semibold'>
                    {option}
                </option>
            })
         }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)