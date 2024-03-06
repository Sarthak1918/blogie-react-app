import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        className = '',
        ...props
    }, ref) {
        const id = useId()
    return (
        <div className='w-full mb-4'>
            {label && <label className='inline-block' htmlFor={id}>{label}</label>}
            <input type={type} className={`mt-1 block w-full rounded-md p-2 outline-none bg-blue-100 text-black font-semibold text-sm ${className}`} {...props} ref={ref} id={id}/>
        </div>
    )
})


export default Input