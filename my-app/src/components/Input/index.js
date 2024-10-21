import React from 'react'

const Input = ({
    name='',
    label='',
    type='',
    placeholder='',
    value='',
    onChange = ()=> null,
    isRequired = false
}) => {
  return (
    <div className='mb-4'>
      {
        label &&
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
        {label}
      </label>
      }
      <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full' id={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={isRequired}/>
    </div>
  )
}

export default Input
