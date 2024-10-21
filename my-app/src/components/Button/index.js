import React from 'react'

const Button = ({
    label = '',
    className = '',
    onclick = ()=> console.log('button clicked'),
    type='submit'
}) => {
  return (
    <button type={type} className={`bg-blue-500 hover:bg-blue-700
     text-white font-bold py-2 px-2 rounded ${className}`} onclick={onclick}>
        {label}
    </button>
  )
}

export default Button
