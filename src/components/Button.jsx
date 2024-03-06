import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-700',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <div className='w-full flex justify-center items-center p-4'>
      <button
        type={type}
        className={`px-4 py-2  ${className} ${bgColor} ${textColor} font-semibold rounded-full hover:bg-blue-600 transition-all text-sm`} {...props}>
        {children}
      </button>
    </div>
  )
}

export default Button